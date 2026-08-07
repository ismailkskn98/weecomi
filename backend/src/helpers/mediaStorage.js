const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const { DeleteObjectCommand, PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const env = require("../config/env");

function extensionFromMime(mimeType) {
  const map = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
  };

  return map[mimeType] || "bin";
}

function cleanCdnUrl(url) {
  return url ? url.replace(/\/$/, "") : "";
}

function createS3Client() {
  return new S3Client({
    endpoint: env.upload.s3.endpoint,
    region: env.upload.s3.region,
    forcePathStyle: env.upload.s3.forcePathStyle,
    credentials: {
      accessKeyId: env.upload.s3.accessKeyId,
      secretAccessKey: env.upload.s3.secretAccessKey,
    },
  });
}

async function saveLocalFile(file) {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const relativeDir = path.join(String(now.getFullYear()), month);
  const fileName = `${crypto.randomUUID()}.${extensionFromMime(file.mimetype)}`;
  const relativePath = path.join(relativeDir, fileName).replace(/\\/g, "/");
  const uploadRoot = path.resolve(process.cwd(), env.upload.localDir);
  const absoluteDir = path.join(uploadRoot, relativeDir);
  const absolutePath = path.join(uploadRoot, relativePath);

  await fs.mkdir(absoluteDir, { recursive: true });
  await fs.writeFile(absolutePath, file.buffer);

  return {
    storageDriver: "local",
    path: relativePath,
    publicUrl: `${env.apiBaseUrl}/uploads/${relativePath}`,
  };
}

async function saveS3File(file) {
  const key = `media/${crypto.randomUUID()}.${extensionFromMime(file.mimetype)}`;
  const client = createS3Client();

  await client.send(
    new PutObjectCommand({
      Bucket: env.upload.s3.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    }),
  );

  return {
    storageDriver: "s3",
    path: key,
    publicUrl: `${cleanCdnUrl(env.upload.s3.cdnUrl)}/${key}`,
  };
}

async function saveUploadedFile(file) {
  if (env.upload.driver === "s3") {
    return saveS3File(file);
  }

  return saveLocalFile(file);
}

async function deleteStoredFile(media) {
  if (!media) return;

  if (media.storage_driver === "local") {
    const absolutePath = path.resolve(process.cwd(), env.upload.localDir, media.path);
    await fs.unlink(absolutePath).catch(() => {});
    return;
  }

  if (media.storage_driver === "s3") {
    const client = createS3Client();
    await client
      .send(
        new DeleteObjectCommand({
          Bucket: env.upload.s3.bucket,
          Key: media.path,
        }),
      )
      .catch(() => {});
  }
}

module.exports = {
  saveUploadedFile,
  deleteStoredFile,
};
