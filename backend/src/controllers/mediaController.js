const pool = require("../db/pool");
const { deleteStoredFile, saveUploadedFile } = require("../helpers/mediaStorage");
const { validateImageFile } = require("../utils/validateImage");

async function saveImageAsset(file, userId) {
  if (!file) return null;

  await validateImageFile(file);
  const stored = await saveUploadedFile(file);
  const [result] = await pool.query(
    `INSERT INTO media_assets (storage_driver, path, public_url, mime_type, size_bytes, original_name, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      stored.storageDriver,
      stored.path,
      stored.publicUrl,
      file.mimetype,
      file.size,
      file.originalname,
      userId || null,
    ],
  );

  return result.insertId;
}

async function deleteImageAsset(id) {
  if (!id) return;

  const [[media]] = await pool.query("SELECT * FROM media_assets WHERE id = ? AND deleted_at IS NULL", [id]);

  if (!media) return;

  await deleteStoredFile(media);
  await pool.query("UPDATE media_assets SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL", [id]);
}

async function listMedia(req, res) {
  const { parseSafeInteger } = require("../utils/clean");
  const page = parseSafeInteger(req.query.page, 1, 1, 100000);
  const pageSize = parseSafeInteger(req.query.pageSize, 24, 1, 100);
  const offset = (page - 1) * pageSize;

  const [[{ total }]] = await pool.query(
    "SELECT COUNT(*) AS total FROM media_assets WHERE deleted_at IS NULL",
  );

  const [rows] = await pool.query(
    `SELECT id, public_url, mime_type, size_bytes, original_name, created_at
     FROM media_assets
     WHERE deleted_at IS NULL
     ORDER BY id DESC
     LIMIT ${pageSize} OFFSET ${offset}`,
  );

  res.json({
    items: rows.map((row) => ({
      id: row.id,
      url: row.public_url,
      mimeType: row.mime_type,
      sizeBytes: row.size_bytes,
      originalName: row.original_name,
      createdAt: row.created_at,
    })),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize) || 1,
    },
  });
}

module.exports = {
  saveImageAsset,
  deleteImageAsset,
  listMedia,
};
