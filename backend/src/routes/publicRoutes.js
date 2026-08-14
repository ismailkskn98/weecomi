const express = require("express");
const {
  listPublicGallery,
  getPublicGallery,
  listPublicNews,
  getPublicNews,
} = require("../controllers/publicController");
const { createContactSubmission } = require("../controllers/contactController");
const { contactLimiter } = require("../middlewares/rateLimiters");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/gallery", asyncHandler(listPublicGallery));
router.get("/gallery/:id", asyncHandler(getPublicGallery));
router.get("/news", asyncHandler(listPublicNews));
router.get("/news/slug/:slug", asyncHandler(getPublicNews));
router.get("/news/:id", asyncHandler(getPublicNews));
router.post("/contact", contactLimiter, asyncHandler(createContactSubmission));

module.exports = router;
