const FileType = require("file-type");
const appConfig = require("../config/appConfig");
const { httpError } = require("./httpError");

const allowedMimeTypes = new Set(appConfig.upload.allowedImageTypes);

function hasJpegSignature(buffer) {
  return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
}

function hasPngSignature(buffer) {
  return (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  );
}

function hasWebpSignature(buffer) {
  return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
}

function hasAvifSignature(buffer) {
  if (buffer.length < 12) return false;
  const brand = buffer.toString("ascii", 8, 12);
  return brand === "avif" || brand === "avis" || brand === "mif1" || brand === "miaf";
}

function detectMimeFromSignature(buffer) {
  if (hasJpegSignature(buffer)) return "image/jpeg";
  if (hasPngSignature(buffer)) return "image/png";
  if (hasWebpSignature(buffer)) return "image/webp";
  if (hasAvifSignature(buffer)) return "image/avif";
  return null;
}

async function validateImageFile(file) {
  if (!file?.buffer?.length) {
    throw httpError(400, "Uploaded file is empty.");
  }

  if (!allowedMimeTypes.has(file.mimetype)) {
    throw httpError(400, "Only jpeg, png, webp and avif images are allowed.");
  }

  const detected = await FileType.fromBuffer(file.buffer).catch(() => null);
  const detectedMime = detected?.mime || detectMimeFromSignature(file.buffer);

  if (!detectedMime || !allowedMimeTypes.has(detectedMime)) {
    throw httpError(400, "Uploaded file is not a valid image.");
  }

  if (detectedMime !== file.mimetype) {
    file.mimetype = detectedMime;
  }
}

module.exports = {
  validateImageFile,
};
