const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const env = require("../config/env");
const pool = require("../db/pool");
const { cleanText } = require("../utils/clean");
const { httpError } = require("../utils/httpError");

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function addMinutes(minutes) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

function createCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProduction,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function canSendMail() {
  return Boolean(env.mail.host && env.mail.user && env.mail.pass && env.mail.from);
}

async function sendPasswordResetEmail({ email, resetUrl }) {
  if (!canSendMail()) {
    console.warn("SMTP env is missing; password reset email was not sent.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.secure,
    auth: {
      user: env.mail.user,
      pass: env.mail.pass,
    },
  });

  await transporter.sendMail({
    from: env.mail.from,
    to: email,
    subject: "WeeComi Admin Password Reset",
    text: `Use this link to reset your password: ${resetUrl}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#3F3F41">
        <h2>WeeComi Admin Password Reset</h2>
        <p>Click the link below to reset your password.</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link expires in 30 minutes.</p>
      </div>
    `,
  });

  return true;
}

async function login(req, res) {
  const email = cleanText(req.body.email, 160).toLowerCase();
  const password = cleanText(req.body.password, 200);
  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
  const isValid = user && user.status === "ACTIVE" && (await bcrypt.compare(password, user.password_hash));

  if (!isValid) {
    throw httpError(401, "Email or password is incorrect.");
  }

  const tokenId = crypto.randomUUID();
  const expiresAt = addDays(7);

  await pool.query(
    `INSERT INTO user_sessions (user_id, token_id, expires_at, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?)`,
    [user.id, tokenId, expiresAt, req.ip || null, req.get("user-agent") || null],
  );

  const token = jwt.sign({ sub: user.id, role: user.role, jti: tokenId }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });

  res.cookie(env.jwt.cookieName, token, createCookieOptions());
  res.json({ user: publicUser(user) });
}

async function logout(req, res) {
  if (req.tokenId) {
    await pool.query("UPDATE user_sessions SET revoked_at = NOW() WHERE token_id = ? AND revoked_at IS NULL", [
      req.tokenId,
    ]);
  }

  res.clearCookie(env.jwt.cookieName, createCookieOptions());
  res.json({ ok: true });
}

function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

async function forgotPassword(req, res) {
  const email = cleanText(req.body.email, 160).toLowerCase();
  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);

  if (!user || user.status !== "ACTIVE") {
    res.json({ ok: true });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const resetUrl = `${env.adminResetUrl}?token=${token}`;

  await pool.query(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
     VALUES (?, ?, ?)`,
    [user.id, hashToken(token), addMinutes(30)],
  );

  await sendPasswordResetEmail({ email: user.email, resetUrl });

  if (!env.isProduction) {
    console.log(`Password reset link for ${email}: ${resetUrl}`);
    res.json({ ok: true, resetToken: token, resetUrl });
    return;
  }

  res.json({ ok: true });
}

async function resetPassword(req, res) {
  const token = cleanText(req.body.token, 200);
  const password = cleanText(req.body.password, 200);

  if (!token || password.length < 8) {
    res.status(400).json({ error: "Token and a minimum 8 character password are required." });
    return;
  }

  const [[resetToken]] = await pool.query(
    `SELECT *
     FROM password_reset_tokens
     WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW()
     LIMIT 1`,
    [hashToken(token)],
  );

  if (!resetToken) {
    throw httpError(400, "Reset token is invalid or expired.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [passwordHash, resetToken.user_id]);
  await pool.query("UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?", [resetToken.id]);
  await pool.query("UPDATE user_sessions SET revoked_at = NOW() WHERE user_id = ? AND revoked_at IS NULL", [
    resetToken.user_id,
  ]);

  res.json({ ok: true });
}

module.exports = {
  login,
  logout,
  me,
  forgotPassword,
  resetPassword,
};
