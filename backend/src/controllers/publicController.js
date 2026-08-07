const appConfig = require("../config/appConfig");
const pool = require("../db/pool");
const { cleanText, normalizeLocale, parseSafeInteger } = require("../utils/clean");
const { httpError } = require("../utils/httpError");

function localizedField(row, field, locale) {
  const key = `${field}_${locale}`;
  return row[key] || row[`${field}_en`] || row[`${field}_tr`] || "";
}

function formatPublicGallery(row, locale) {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: localizedField(row, "title", locale),
    description: localizedField(row, "description", locale),
    coverImageUrl: row.cover_url || null,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function formatPublicNews(row, locale) {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    isFeatured: Boolean(row.is_featured),
    author: row.author || "",
    title: localizedField(row, "title", locale),
    summary: localizedField(row, "summary", locale),
    highlight: localizedField(row, "highlight", locale),
    content: localizedField(row, "content", locale),
    coverImageUrl: row.cover_url || null,
    authorImageUrl: row.author_url || null,
    publishedAt: row.published_at,
    createdAt: row.created_at,
  };
}

async function listPublicGallery(req, res) {
  const locale = normalizeLocale(req.query.locale || req.get("Accept-Language")?.slice(0, 2));
  const page = parseSafeInteger(req.query.page, 1, 1, 100000);
  const pageSize = parseSafeInteger(req.query.pageSize, 12, 1, 100);
  const offset = (page - 1) * pageSize;
  const category = req.query.category && appConfig.galleryCategories[req.query.category] ? req.query.category : "";
  const search = cleanText(req.query.search, 120);

  const where = ["g.deleted_at IS NULL", "g.status = 'PUBLISHED'"];
  const values = [];

  if (category) {
    where.push("g.category = ?");
    values.push(category);
  }

  if (search) {
    where.push(
      "(g.title_tr LIKE ? OR g.title_en LIKE ? OR g.title_ru LIKE ? OR g.title_az LIKE ? OR g.title_ka LIKE ?)",
    );
    const like = `%${search}%`;
    values.push(like, like, like, like, like);
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
     LIMIT ${pageSize} OFFSET ${offset}`,
    values,
  );

  res.json({
    items: rows.map((row) => formatPublicGallery(row, locale)),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) || 1 },
  });
}

async function getPublicGallery(req, res) {
  const locale = normalizeLocale(req.query.locale);
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  const slug = cleanText(req.params.slug || req.query.slug, 180);

  let row = null;

  if (id) {
    const [rows] = await pool.query(
      `SELECT g.*, m.public_url AS cover_url
       FROM gallery_items g
       LEFT JOIN media_assets m ON m.id = g.cover_image_id
       WHERE g.id = ? AND g.deleted_at IS NULL AND g.status = 'PUBLISHED'
       LIMIT 1`,
      [id],
    );
    row = rows[0] || null;
  } else if (slug) {
    const [rows] = await pool.query(
      `SELECT g.*, m.public_url AS cover_url
       FROM gallery_items g
       LEFT JOIN media_assets m ON m.id = g.cover_image_id
       WHERE g.slug = ? AND g.deleted_at IS NULL AND g.status = 'PUBLISHED'
       LIMIT 1`,
      [slug],
    );
    row = rows[0] || null;
  }

  if (!row) throw httpError(404, "Gallery item not found.");
  res.json({ item: formatPublicGallery(row, locale) });
}

async function listPublicNews(req, res) {
  const locale = normalizeLocale(req.query.locale || req.get("Accept-Language")?.slice(0, 2));
  const page = parseSafeInteger(req.query.page, 1, 1, 100000);
  const pageSize = parseSafeInteger(req.query.pageSize, 12, 1, 100);
  const offset = (page - 1) * pageSize;
  const category = req.query.category && appConfig.newsCategories[req.query.category] ? req.query.category : "";
  const search = cleanText(req.query.search, 120);

  const where = ["n.deleted_at IS NULL", "n.status = 'PUBLISHED'"];
  const values = [];

  if (category) {
    where.push("n.category = ?");
    values.push(category);
  }

  if (search) {
    where.push(
      "(n.title_tr LIKE ? OR n.title_en LIKE ? OR n.title_ru LIKE ? OR n.title_az LIKE ? OR n.title_ka LIKE ?)",
    );
    const like = `%${search}%`;
    values.push(like, like, like, like, like);
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
     LIMIT ${pageSize} OFFSET ${offset}`,
    values,
  );

  res.json({
    items: rows.map((row) => formatPublicNews(row, locale)),
    categories: appConfig.newsCategories,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) || 1 },
  });
}

async function getPublicNews(req, res) {
  const locale = normalizeLocale(req.query.locale);
  const id = parseSafeInteger(req.params.id, 0, 0, Number.MAX_SAFE_INTEGER);
  const slug = cleanText(req.params.slug || "", 180);

  let row = null;

  if (id) {
    const [rows] = await pool.query(
      `SELECT n.*,
              m.public_url AS cover_url,
              ma.public_url AS author_url
       FROM news_articles n
       LEFT JOIN media_assets m ON m.id = n.cover_image_id
       LEFT JOIN media_assets ma ON ma.id = n.author_image_id
       WHERE n.id = ? AND n.deleted_at IS NULL AND n.status = 'PUBLISHED'
       LIMIT 1`,
      [id],
    );
    row = rows[0] || null;
  } else if (slug) {
    const [rows] = await pool.query(
      `SELECT n.*,
              m.public_url AS cover_url,
              ma.public_url AS author_url
       FROM news_articles n
       LEFT JOIN media_assets m ON m.id = n.cover_image_id
       LEFT JOIN media_assets ma ON ma.id = n.author_image_id
       WHERE n.slug = ? AND n.deleted_at IS NULL AND n.status = 'PUBLISHED'
       LIMIT 1`,
      [slug],
    );
    row = rows[0] || null;
  }

  if (!row) throw httpError(404, "News article not found.");
  res.json({ item: formatPublicNews(row, locale) });
}

module.exports = {
  listPublicGallery,
  getPublicGallery,
  listPublicNews,
  getPublicNews,
};
