const express = require("express");
const appConfig = require("../config/appConfig");
const {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const { requireAuth, requireRole } = require("../middlewares/authMiddleware");
const { coverImageUpload } = require("../middlewares/uploadMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);

router.get("/", asyncHandler(listNews));
router.get("/:id", asyncHandler(getNews));
router.post("/", coverImageUpload, asyncHandler(createNews));
router.patch("/:id", coverImageUpload, asyncHandler(updateNews));
router.delete("/:id", requireRole([appConfig.roles.admin]), asyncHandler(deleteNews));

module.exports = router;
