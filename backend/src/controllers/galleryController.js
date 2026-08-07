const appConfig = require("../config/appConfig");
const pool = require("../db/pool");
const { saveImageAsset, deleteImageAsset } = require("./mediaController");
const { cleanText, toNullableText, parseSafeInteger, slugify } = require("../utils/clean");
const { httpError } = require("../utils/httpError");

function parsePayload(req) {
  if (typeof req.body.payload === "string") {
    try {
      return JSON.parse(req.body.payload);
    } catch {
      throw httpError(400, "Invalid payload JSON.");
    }
  }

  return req.body || {};
}

function normalizeListParams(params) {
  const page = parseSafeInteger(params.page, 1, 1, 100000);
  const pageSize = parseSafeInteger(params.pageSize, 12, 1, 100);
  const status = params.status && Object.values(appConfig.statuses).includes(params.status) ? params.status : "";
  const category = params.category && appConfig.galleryCategories[params.category] ? params.category : "";
  const search = cleanText(params.search, 120);

  return { page, pageSize, status, category, search };
}

function normalizeStatus(status) {
  return Object.values(appConfig.statuses).includes(status) ? status : appConfig.statuses.draft;
}

function normalizeCategory(category) {
  if (!appConfig.galleryCategories[category]) {
    throw httpError(400, "Invalid gallery category.");
  }
  return category;
}

function normalizeLocalizedFields(input = {}, requiredPrimary = "tr") {
  const titles = {};
  const descriptions = {};

  for (const locale of appConfig.locales) {
    titles[locale] = cleanText(input[`title_${locale}`] ?? input.titles?.[locale], 200);
    descriptions[locale] = toNullableText(input[`description_${locale}`] ?? input.descriptions?.[locale], 2000);
  }

  if (!titles[requiredPrimary] && !titles.en) {
    throw httpError(400, "Title is required (tr or en).");
  }

  const fallback = titles[requiredPrimary] || titles.en;
  for (const locale of appConfig.locales) {
    if (!titles[locale]) titles[locale] = fallback;
  }

  return { titles, descriptions };
}

function formatGalleryRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    status: row.status,
    sortOrder: row.sort_order,
    coverImage: row.cover_image_id
      ? { id: row.cover_image_id, url: row.cover_url }
      : null,
    titles: {
      tr: row.title_tr,
      en: row.title_en,
      ru: row.title_ru,
      az: row.title_az,
      ka: row.title_ka,
    },
    descriptions: {
      tr: row.description_tr || "",
      en: row.description_en || "",
      ru: row.description_ru || "",
      az: row.description_az || "",
      ka: row.description_ka || "",
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function findBySlug(slug, excludeId) {
  const params = [slug];
  let query = "SELECT id FROM gallery_items WHERE slug = ? AND deleted_at IS NULL";
  if (excludeId) {
    query += " AND id <> ?";
    params.push(excludeId);
  }
  const [[row]] = await pool.query(query, params);
  return row || null;
}

async function ensureUniqueSlug(baseSlug, excludeId) {
  const fallback = `gallery-${Date.now()}`;
  const base = slugify(baseSlug) || fallback;
  let candidate = base;
  let index = 2;

  while (await findBySlug(candidate, excludeId)) {
    candidate = `${base}-${index}`;
    index += 1;
  }

  return candidate;
}

async function getGalleryRow(id) {
  const [rows] = await pool.query(
    `SELECT g.*, m.public_url AS cover_url
     FROM gallery_items g
     LEFT JOIN media_assets m ON m.id = g.cover_image_id
     WHERE g.id = ? AND g.deleted_at IS NULL
     LIMIT 1`,
    [id],
  );
  return rows[0] || null;
}

async function listGallery(req, res) {
  const params = normalizeListParams(req.query);
  const offset = (params.page - 1) * params.pageSize;
  const where = ["g.deleted_at IS NULL"];
  const values = [];

  if (params.status) {
    where.push("g.status = ?");
    values.push(params.status);
  }

  if (params.category) {
    where.push("g.category = ?");
    values.push(params.category);
  }

  if (params.search) {
    where.push(
      "(g.title_tr LIKE ? OR g.title_en LIKE ? OR g.title_ru LIKE ? OR g.title_az LIKE ? OR g.title_ka LIKE ? OR g.slug LIKE ?)",
    );
    const like = `%${params.search}%`;
    values.push(like, like, like, like, like, like);
  }

  const whereSql = where.join(" AND ");

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM gallery_items g WHERE ${whereSql}`,
    values,
  );

  const [rows] = await pool.query(
    `SELECT g.*, m.public_url AS cover_url
     FROM gallery_items g
     LEFT JOIN media_assets m ON m.id = g.cover_image_id
     WHERE ${whereSql}
     ORDER BY g.sort_order ASC, g.id DESC
     LIMIT ${params.pageSize} OFFSET ${offset}`,
    values,
  );

  res.json({
    items: rows.map(formatGalleryRow),
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages: Math.ceil(total / params.pageSize) || 1,
    },
  });
}

async function getGallery(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  if (!id) throw httpError(400, "Invalid id.");

  const row = await getGalleryRow(id);
  if (!row) throw httpError(404, "Gallery item not found.");

  res.json({ item: formatGalleryRow(row) });
}

async function createGallery(req, res) {
  const payload = parsePayload(req);
  const { titles, descriptions } = normalizeLocalizedFields(payload);
  const category = normalizeCategory(payload.category || "other");
  const status = normalizeStatus(payload.status);
  const sortOrder = parseSafeInteger(payload.sortOrder, 0, 0, 100000);
  const slug = await ensureUniqueSlug(payload.slug || titles.en || titles.tr);

  const coverFile = req.files?.coverImage?.[0] || null;
  let coverImageId = null;

  if (coverFile) {
    coverImageId = await saveImageAsset(coverFile, req.user.id);
  }

  const [result] = await pool.query(
    `INSERT INTO gallery_items
      (slug, category, status, sort_order, cover_image_id,
       title_tr, title_en, title_ru, title_az, title_ka,
       description_tr, description_en, description_ru, description_az, description_ka,
       created_by, updated_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      slug,
      category,
      status,
      sortOrder,
      coverImageId,
      titles.tr,
      titles.en,
      titles.ru,
      titles.az,
      titles.ka,
      descriptions.tr,
      descriptions.en,
      descriptions.ru,
      descriptions.az,
      descriptions.ka,
      req.user.id,
      req.user.id,
    ],
  );

  const row = await getGalleryRow(result.insertId);
  res.status(201).json({ item: formatGalleryRow(row) });
}

async function updateGallery(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  if (!id) throw httpError(400, "Invalid id.");

  const existing = await getGalleryRow(id);
  if (!existing) throw httpError(404, "Gallery item not found.");

  const payload = parsePayload(req);
  const { titles, descriptions } = normalizeLocalizedFields({
    titles: {
      tr: payload.title_tr ?? payload.titles?.tr ?? existing.title_tr,
      en: payload.title_en ?? payload.titles?.en ?? existing.title_en,
      ru: payload.title_ru ?? payload.titles?.ru ?? existing.title_ru,
      az: payload.title_az ?? payload.titles?.az ?? existing.title_az,
      ka: payload.title_ka ?? payload.titles?.ka ?? existing.title_ka,
    },
    descriptions: {
      tr: payload.description_tr ?? payload.descriptions?.tr ?? existing.description_tr,
      en: payload.description_en ?? payload.descriptions?.en ?? existing.description_en,
      ru: payload.description_ru ?? payload.descriptions?.ru ?? existing.description_ru,
      az: payload.description_az ?? payload.descriptions?.az ?? existing.description_az,
      ka: payload.description_ka ?? payload.descriptions?.ka ?? existing.description_ka,
    },
  });

  const category = normalizeCategory(payload.category || existing.category);
  const status = normalizeStatus(payload.status || existing.status);
  const sortOrder = parseSafeInteger(payload.sortOrder ?? existing.sort_order, 0, 0, 100000);
  const slug = await ensureUniqueSlug(payload.slug || existing.slug, id);

  let coverImageId = existing.cover_image_id;
  const coverFile = req.files?.coverImage?.[0] || null;

  if (coverFile) {
    const newId = await saveImageAsset(coverFile, req.user.id);
    if (existing.cover_image_id) {
      await deleteImageAsset(existing.cover_image_id);
    }
    coverImageId = newId;
  }

  if (payload.removeCoverImage === true || payload.removeCoverImage === "true") {
    if (coverImageId) await deleteImageAsset(coverImageId);
    coverImageId = null;
  }

  await pool.query(
    `UPDATE gallery_items SET
      slug = ?, category = ?, status = ?, sort_order = ?, cover_image_id = ?,
      title_tr = ?, title_en = ?, title_ru = ?, title_az = ?, title_ka = ?,
      description_tr = ?, description_en = ?, description_ru = ?, description_az = ?, description_ka = ?,
      updated_by = ?
     WHERE id = ? AND deleted_at IS NULL`,
    [
      slug,
      category,
      status,
      sortOrder,
      coverImageId,
      titles.tr,
      titles.en,
      titles.ru,
      titles.az,
      titles.ka,
      descriptions.tr,
      descriptions.en,
      descriptions.ru,
      descriptions.az,
      descriptions.ka,
      req.user.id,
      id,
    ],
  );

  const row = await getGalleryRow(id);
  res.json({ item: formatGalleryRow(row) });
}

async function deleteGallery(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  if (!id) throw httpError(400, "Invalid id.");

  const existing = await getGalleryRow(id);
  if (!existing) throw httpError(404, "Gallery item not found.");

  await pool.query("UPDATE gallery_items SET deleted_at = NOW(), updated_by = ? WHERE id = ?", [
    req.user.id,
    id,
  ]);

  res.json({ ok: true });
}

module.exports = {
  listGallery,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
};
