const pool = require("../db/pool");
const { cleanText, parseSafeInteger } = require("../utils/clean");
const { httpError } = require("../utils/httpError");

const STATUSES = ["NEW", "READ", "ARCHIVED"];

function normalizeStatus(status) {
  return STATUSES.includes(status) ? status : "NEW";
}

function formatSubmissionRow(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    company: row.company || "",
    productInterest: row.product_interest,
    message: row.message,
    status: row.status,
    ipAddress: row.ip_address || "",
    userAgent: row.user_agent || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function createContactSubmission(req, res) {
  const fullName = cleanText(req.body.fullName, 120);
  const email = cleanText(req.body.email, 160);
  const phone = cleanText(req.body.phone, 40);
  const company = cleanText(req.body.company, 160);
  const productInterest = cleanText(req.body.productInterest, 120);
  const message = cleanText(req.body.message, 5000);

  if (!fullName || !email || !phone || !productInterest || !message || message.length < 10) {
    throw httpError(400, "Invalid contact submission payload.");
  }

  const [result] = await pool.query(
    `INSERT INTO contact_submissions
      (full_name, email, phone, company, product_interest, message, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      email,
      phone,
      company || null,
      productInterest,
      message,
      req.ip || null,
      cleanText(req.headers["user-agent"], 255) || null,
    ],
  );

  const [rows] = await pool.query("SELECT * FROM contact_submissions WHERE id = ?", [result.insertId]);
  res.status(201).json({ item: formatSubmissionRow(rows[0]) });
}

async function listContactSubmissions(req, res) {
  const page = parseSafeInteger(req.query.page, 1, 1, 100000);
  const pageSize = parseSafeInteger(req.query.pageSize, 20, 1, 100);
  const status = req.query.status && STATUSES.includes(req.query.status) ? req.query.status : "";
  const search = cleanText(req.query.search, 120);
  const offset = (page - 1) * pageSize;

  const where = ["1=1"];
  const params = [];

  if (status) {
    where.push("status = ?");
    params.push(status);
  }

  if (search) {
    where.push("(full_name LIKE ? OR email LIKE ? OR product_interest LIKE ? OR company LIKE ?)");
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  const whereSql = where.join(" AND ");

  const [countRows] = await pool.query(
    `SELECT COUNT(*) AS total FROM contact_submissions WHERE ${whereSql}`,
    params,
  );
  const total = Number(countRows[0]?.total || 0);

  const [rows] = await pool.query(
    `SELECT * FROM contact_submissions
     WHERE ${whereSql}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, pageSize, offset],
  );

  res.json({
    items: rows.map(formatSubmissionRow),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) || 1 },
  });
}

async function getContactSubmission(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  const [rows] = await pool.query("SELECT * FROM contact_submissions WHERE id = ?", [id]);

  if (!rows.length) {
    throw httpError(404, "Contact submission not found.");
  }

  res.json({ item: formatSubmissionRow(rows[0]) });
}

async function updateContactSubmission(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  const status = normalizeStatus(req.body.status);

  const [existing] = await pool.query("SELECT id FROM contact_submissions WHERE id = ?", [id]);
  if (!existing.length) {
    throw httpError(404, "Contact submission not found.");
  }

  await pool.query("UPDATE contact_submissions SET status = ? WHERE id = ?", [status, id]);

  const [rows] = await pool.query("SELECT * FROM contact_submissions WHERE id = ?", [id]);
  res.json({ item: formatSubmissionRow(rows[0]) });
}

async function deleteContactSubmission(req, res) {
  const id = parseSafeInteger(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  const [result] = await pool.query("DELETE FROM contact_submissions WHERE id = ?", [id]);

  if (!result.affectedRows) {
    throw httpError(404, "Contact submission not found.");
  }

  res.json({ ok: true });
}

module.exports = {
  createContactSubmission,
  listContactSubmissions,
  getContactSubmission,
  updateContactSubmission,
  deleteContactSubmission,
};
