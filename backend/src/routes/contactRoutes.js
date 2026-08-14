const express = require("express");
const appConfig = require("../config/appConfig");
const {
  listContactSubmissions,
  getContactSubmission,
  updateContactSubmission,
  deleteContactSubmission,
} = require("../controllers/contactController");
const { requireAuth, requireRole } = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);

router.get("/", asyncHandler(listContactSubmissions));
router.get("/:id", asyncHandler(getContactSubmission));
router.patch("/:id", asyncHandler(updateContactSubmission));
router.delete("/:id", requireRole([appConfig.roles.admin]), asyncHandler(deleteContactSubmission));

module.exports = router;
