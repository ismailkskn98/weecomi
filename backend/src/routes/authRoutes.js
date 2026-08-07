const express = require("express");
const { forgotPassword, login, logout, me, resetPassword } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");
const {
  authForgotPasswordLimiter,
  authLoginLimiter,
  authResetPasswordLimiter,
} = require("../middlewares/rateLimiters");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/login", authLoginLimiter, asyncHandler(login));
router.post("/logout", requireAuth, asyncHandler(logout));
router.get("/me", requireAuth, me);
router.post("/forgot-password", authForgotPasswordLimiter, asyncHandler(forgotPassword));
router.post("/reset-password", authResetPasswordLimiter, asyncHandler(resetPassword));

module.exports = router;
