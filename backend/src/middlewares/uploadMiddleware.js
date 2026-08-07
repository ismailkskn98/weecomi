const multer = require("multer");
const appConfig = require("../config/appConfig");
const { httpError } = require("../utils/httpError");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: appConfig.upload.maxImageBytes,
  },
  fileFilter(req, file, cb) {
    if (!appConfig.upload.allowedImageTypes.includes(file.mimetype)) {
      cb(httpError(400, "Only jpeg, png, webp and avif images are allowed."));
      return;
    }

    cb(null, true);
  },
});

const coverImageUpload = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "authorImage", maxCount: 1 },
]);

module.exports = {
  coverImageUpload,
};
