const jwt = require("jsonwebtoken");
const env = require("../config/env");
const pool = require("../db/pool");
const asyncHandler = require("../utils/asyncHandler");
const { httpError } = require("../utils/httpError");

async function authenticateToken(token) {
  if (!token) {
    throw httpError(401, "Authentication required.");
  }

  let payload;

  try {
    payload = jwt.verify(token, env.jwt.secret);
  } catch {
    throw httpError(401, "Authentication required.");
  }

  const [[session]] = await pool.query(
    `SELECT *
     FROM user_sessions
     WHERE token_id = ? AND revoked_at IS NULL AND expires_at > NOW()
     LIMIT 1`,
    [payload.jti],
  );

  let user = null;

  if (session) {
    const [users] = await pool.query(
      "SELECT id, name, email, role, status FROM users WHERE id = ? AND status = 'ACTIVE' LIMIT 1",
      [payload.sub],
    );
    user = users[0] || null;
  }

  if (!session || !user) {
    throw httpError(401, "Authentication required.");
  }

  return { user, session, tokenId: payload.jti };
}

const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[env.jwt.cookieName];
  const auth = await authenticateToken(token);

  req.user = auth.user;
  req.session = auth.session;
  req.tokenId = auth.tokenId;

  next();
});

function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(httpError(403, "You do not have permission for this action."));
      return;
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  requireAuth,
  requireRole,
};
