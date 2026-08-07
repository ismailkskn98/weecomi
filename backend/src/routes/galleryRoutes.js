const express = require("express");
const appConfig = require("../config/appConfig");
const {
  listGallery,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");
const { requireAuth, requireRole } = require("../middlewares/authMiddleware");
const { coverImageUpload } = require("../middlewares/uploadMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);

router.get("/", asyncHandler(listGallery));
router.get("/:id", asyncHandler(getGallery));
router.post("/", coverImageUpload, asyncHandler(createGallery));
router.patch("/:id", coverImageUpload, asyncHandler(updateGallery));
router.delete("/:id", requireRole([appConfig.roles.admin]), asyncHandler(deleteGallery));

module.exports = router;
