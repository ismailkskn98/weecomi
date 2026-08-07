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
  const category = params.category && appConfig.newsCategories[params.category] ? params.category : "";
  const search = cleanText(params.search, 120);

  return { page, pageSize, status, category, search };
}

function normalizeStatus(status) {
  return Object.values(appConfig.statuses).includes(status) ? status : appConfig.statuses.draft;
}

function normalizeCategory(category) {
  if (!appConfig.newsCategories[category]) {
    throw httpError(400, "Invalid news category.");
  }
  return category;
}

function normalizeBoolean(value) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function normalizeLocalizedFields(input = {}) {
  const titles = {};
  const summaries = {};
  const highlights = {};
  const contents = {};

  for (const locale of appConfig.locales) {
    titles[locale] = cleanText(input[`title_${locale}`] ?? input.titles?.[locale], 220);
    summaries[locale] = toNullableText(input[`summary_${locale}`] ?? input.summaries?.[locale], 1000);
    highlights[locale] = toNullableText(input[`highlight_${locale}`] ?? input.highlights?.[locale], 2000);
    contents[locale] = toNullableText(input[`content_${locale}`] ?? input.contents?.[locale], 50000);
  }

  if (!titles.tr && !titles.en) {
    throw httpError(400, "Title is required (tr or en).");
  }

  const fallback = titles.tr || titles.en;
  for (const locale of appConfig.locales) {
    if (!titles[locale]) titles[locale] = fallback;
  }

  return { titles, summaries, highlights, contents };
}

function formatNewsRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    status: row.status,
    isFeatured: Boolean(row.is_featured),
    author: row.author || "",
    coverImage: row.cover_image_id
      ? { id: row.cover_image_id, url: row.cover_url }
      : null,
    authorImage: row.author_image_id
      ? { id: row.author_image_id, url: row.author_url }
      : null,
    titles: {
      tr: row.title_tr,
      en: row.title_en,
      ru: row.title_ru,
      az: row.title_az,
      ka: row.title_ka,
    },
    summaries: {
      tr: row.summary_tr || "",
      en: row.summary_en || "",
      ru: row.summary_ru || "",
      az: row.summary_az || "",
      ka: row.summary_ka || "",
    },
    highlights: {
      tr: row.highlight_tr || "",
      en: row.highlight_en || "",
      ru: row.highlight_ru || "",
      az: row.highlight_az || "",
      ka: row.highlight_ka || "",
    },
    contents: {
      tr: row.content_tr || "",
      en: row.content_en || "",
      ru: row.content_ru || "",
      az: row.content_az || "",
      ka: row.content_ka || "",
    },
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function findBySlug(slug, excludeId) {
  const params = [slug];
  let query = "SELECT id FROM news_articles WHERE slug = ? AND deleted_at IS NULL";
  if (excludeId) {
    query += " AND id <> ?";
    params.push(excludeId);
  }
  const [[row]] = await pool.query(query, params);
  return row || null;
}

async function ensureUniqueSlug(baseSlug, excludeId) {
  const fallback = `news-${Date.now()}`;
  const base = slugify(baseSlug) || fallback;
  let candidate = base;
  let index = 2;

  while (await findBySlug(candidate, excludeId)) {
    candidate = `${base}-${index}`;
    index += 1;
  }

  return candidate;
}

async function getNewsRow(id) {
  const [rows] = await pool.query(
    `SELECT n.*,
            m.public_url AS cover_url,
            ma.public_url AS author_url
     FROM news_articles n
     LEFT JOIN media_assets m ON m.id = n.cover_image_id
     LEFT JOIN media_assets ma ON ma.id = n.author_image_id
     WHERE n.id = ? AND n.deleted_at IS NULL
     LIMIT 1`,
    [id],
  );
  return rows[0] || null;
}

async function listNews(req, res) {
  const params = normalizeListParams(req.query);
  const offset = (params.page - 1) * params.pageSize;
  const where = ["n.deleted_at IS NULL"];
  const values = [];

  if (params.status) {
    where.push("n.status = ?");
    values.push(params.status);
  }

  if (params.category) {
    where.push("n.category = ?");
    values.push(params.category);
  }

  if (params.search) {
    where.push(
      "(n.title_tr LIKE ? OR n.title_en LIKE ? OR n.title_ru LIKE ? OR n.title_az LIKE ? OR n.title_ka LIKE ? OR n.slug LIKE ?)",
    );
    const like = `%${params.search}%`;
    values.push(like, like, like, like, like, like);
  }

  const whereSql = where.join(" AND ");

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM news_articles n WHERE ${whereSql}`,
    values,
  );

  const [rows] = await pool.query(
    `SELECT n.*,
            m.public_url AS cover_url,
            ma.public_url AS author_url
     FROM news_articles n
     LEFT JOIN media_assets m ON m.id = n.cover_image_id
     LEFT JOIN media_assets ma ON ma.id = n.author_image_id
     WHERE ${whereSql}
     ORDER BY n.is_featured DESC, COALESCE(n.published_at, n.created_at) DESC, n.id DESC
     LIMIT ${params.pageSize} OFFSET ${offset}`,
    values,
  );

  res.json({
    items: rows.map(formatNewsRow),
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages: Math.ceil(total / params.pageSize) || 1,
    },
  });
}

async function getNews(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  if (!id) throw httpError(400, "Invalid id.");

  const row = await getNewsRow(id);
  if (!row) throw httpError(404, "News article not found.");

  res.json({ item: formatNewsRow(row) });
}

async function createNews(req, res) {
  const payload = parsePayload(req);
  const { titles, summaries, highlights, contents } = normalizeLocalizedFields(payload);
  const category = normalizeCategory(payload.category || "announcement");
  const status = normalizeStatus(payload.status);
  const isFeatured = normalizeBoolean(payload.isFeatured);
  const author = cleanText(payload.author, 120) || null;
  const slug = await ensureUniqueSlug(payload.slug || titles.en || titles.tr);
  const publishedAt = status === appConfig.statuses.published ? new Date() : null;

  const coverFile = req.files?.coverImage?.[0] || null;
  const authorFile = req.files?.authorImage?.[0] || null;
  let coverImageId = null;
  let authorImageId = null;

  if (coverFile) {
    coverImageId = await saveImageAsset(coverFile, req.user.id);
  }
  if (authorFile) {
    authorImageId = await saveImageAsset(authorFile, req.user.id);
  }

  const [result] = await pool.query(
    `INSERT INTO news_articles
      (slug, category, status, is_featured, author, cover_image_id, author_image_id, published_at,
       title_tr, title_en, title_ru, title_az, title_ka,
       summary_tr, summary_en, summary_ru, summary_az, summary_ka,
       highlight_tr, highlight_en, highlight_ru, highlight_az, highlight_ka,
       content_tr, content_en, content_ru, content_az, content_ka,
       created_by, updated_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      slug,
      category,
      status,
      isFeatured ? 1 : 0,
      author,
      coverImageId,
      authorImageId,
      publishedAt,
      titles.tr,
      titles.en,
      titles.ru,
      titles.az,
      titles.ka,
      summaries.tr,
      summaries.en,
      summaries.ru,
      summaries.az,
      summaries.ka,
      highlights.tr,
      highlights.en,
      highlights.ru,
      highlights.az,
      highlights.ka,
      contents.tr,
      contents.en,
      contents.ru,
      contents.az,
      contents.ka,
      req.user.id,
      req.user.id,
    ],
  );

  const row = await getNewsRow(result.insertId);
  res.status(201).json({ item: formatNewsRow(row) });
}

async function updateNews(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  if (!id) throw httpError(400, "Invalid id.");

  const existing = await getNewsRow(id);
  if (!existing) throw httpError(404, "News article not found.");

  const payload = parsePayload(req);
  const { titles, summaries, highlights, contents } = normalizeLocalizedFields({
    titles: {
      tr: payload.title_tr ?? payload.titles?.tr ?? existing.title_tr,
      en: payload.title_en ?? payload.titles?.en ?? existing.title_en,
      ru: payload.title_ru ?? payload.titles?.ru ?? existing.title_ru,
      az: payload.title_az ?? payload.titles?.az ?? existing.title_az,
      ka: payload.title_ka ?? payload.titles?.ka ?? existing.title_ka,
    },
    summaries: {
      tr: payload.summary_tr ?? payload.summaries?.tr ?? existing.summary_tr,
      en: payload.summary_en ?? payload.summaries?.en ?? existing.summary_en,
      ru: payload.summary_ru ?? payload.summaries?.ru ?? existing.summary_ru,
      az: payload.summary_az ?? payload.summaries?.az ?? existing.summary_az,
      ka: payload.summary_ka ?? payload.summaries?.ka ?? existing.summary_ka,
    },
    highlights: {
      tr: payload.highlight_tr ?? payload.highlights?.tr ?? existing.highlight_tr,
      en: payload.highlight_en ?? payload.highlights?.en ?? existing.highlight_en,
      ru: payload.highlight_ru ?? payload.highlights?.ru ?? existing.highlight_ru,
      az: payload.highlight_az ?? payload.highlights?.az ?? existing.highlight_az,
      ka: payload.highlight_ka ?? payload.highlights?.ka ?? existing.highlight_ka,
    },
    contents: {
      tr: payload.content_tr ?? payload.contents?.tr ?? existing.content_tr,
      en: payload.content_en ?? payload.contents?.en ?? existing.content_en,
      ru: payload.content_ru ?? payload.contents?.ru ?? existing.content_ru,
      az: payload.content_az ?? payload.contents?.az ?? existing.content_az,
      ka: payload.content_ka ?? payload.contents?.ka ?? existing.content_ka,
    },
  });

  const category = normalizeCategory(payload.category || existing.category);
  const status = normalizeStatus(payload.status || existing.status);
  const isFeatured =
    payload.isFeatured !== undefined ? normalizeBoolean(payload.isFeatured) : Boolean(existing.is_featured);
  const author =
    payload.author !== undefined ? cleanText(payload.author, 120) || null : existing.author || null;
  const slug = await ensureUniqueSlug(payload.slug || existing.slug, id);

  let publishedAt = existing.published_at;
  if (status === appConfig.statuses.published && !publishedAt) {
    publishedAt = new Date();
  }
  if (status !== appConfig.statuses.published && payload.clearPublishedAt) {
    publishedAt = null;
  }

  let coverImageId = existing.cover_image_id;
  let authorImageId = existing.author_image_id;
  const coverFile = req.files?.coverImage?.[0] || null;
  const authorFile = req.files?.authorImage?.[0] || null;

  if (coverFile) {
    const newId = await saveImageAsset(coverFile, req.user.id);
    if (existing.cover_image_id) await deleteImageAsset(existing.cover_image_id);
    coverImageId = newId;
  }

  if (authorFile) {
    const newId = await saveImageAsset(authorFile, req.user.id);
    if (existing.author_image_id) await deleteImageAsset(existing.author_image_id);
    authorImageId = newId;
  }

  if (payload.removeCoverImage === true || payload.removeCoverImage === "true") {
    if (coverImageId) await deleteImageAsset(coverImageId);
    coverImageId = null;
  }

  if (payload.removeAuthorImage === true || payload.removeAuthorImage === "true") {
    if (authorImageId) await deleteImageAsset(authorImageId);
    authorImageId = null;
  }

  await pool.query(
    `UPDATE news_articles SET
      slug = ?, category = ?, status = ?, is_featured = ?, author = ?, cover_image_id = ?, author_image_id = ?, published_at = ?,
      title_tr = ?, title_en = ?, title_ru = ?, title_az = ?, title_ka = ?,
      summary_tr = ?, summary_en = ?, summary_ru = ?, summary_az = ?, summary_ka = ?,
      highlight_tr = ?, highlight_en = ?, highlight_ru = ?, highlight_az = ?, highlight_ka = ?,
      content_tr = ?, content_en = ?, content_ru = ?, content_az = ?, content_ka = ?,
      updated_by = ?
     WHERE id = ? AND deleted_at IS NULL`,
    [
      slug,
      category,
      status,
      isFeatured ? 1 : 0,
      author,
      coverImageId,
      authorImageId,
      publishedAt,
      titles.tr,
      titles.en,
      titles.ru,
      titles.az,
      titles.ka,
      summaries.tr,
      summaries.en,
      summaries.ru,
      summaries.az,
      summaries.ka,
      highlights.tr,
      highlights.en,
      highlights.ru,
      highlights.az,
      highlights.ka,
      contents.tr,
      contents.en,
      contents.ru,
      contents.az,
      contents.ka,
      req.user.id,
      id,
    ],
  );

  const row = await getNewsRow(id);
  res.json({ item: formatNewsRow(row) });
}

async function deleteNews(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  if (!id) throw httpError(400, "Invalid id.");

  const existing = await getNewsRow(id);
  if (!existing) throw httpError(404, "News article not found.");

  await pool.query("UPDATE news_articles SET deleted_at = NOW(), updated_by = ? WHERE id = ?", [
    req.user.id,
    id,
  ]);

  res.json({ ok: true });
}

module.exports = {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
};
