const rateLimit = require("express-rate-limit");

function createLimiter({ windowMs, max, message }) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler(req, res) {
      res.status(429).json({ error: message });
    },
  });
}

const authLoginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many login attempts. Please try again later.",
});

const authForgotPasswordLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many password reset requests. Please try again later.",
});

const authResetPasswordLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many password reset attempts. Please try again later.",
});

const contactLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Too many contact requests. Please try again later.",
});

module.exports = {
  authLoginLimiter,
  authForgotPasswordLimiter,
  authResetPasswordLimiter,
  contactLimiter,
};
