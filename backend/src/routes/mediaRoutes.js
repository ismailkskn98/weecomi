const express = require("express");
const { listMedia } = require("../controllers/mediaController");
const { requireAuth } = require("../middlewares/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(requireAuth);
router.get("/", asyncHandler(listMedia));

module.exports = router;
