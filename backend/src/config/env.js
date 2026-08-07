const path = require("path");
const dotenv = require("dotenv");

const nodeEnv = process.env.NODE_ENV || "development";

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${nodeEnv}`),
  override: true,
});

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
  override: false,
});

function readNumber(key, fallback) {
  const value = Number(process.env[key]);
  return Number.isFinite(value) ? value : fallback;
}

function normalizeOrigin(value) {
  if (!value) return "";
  return value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\/$/, "");
}

function readList(key, fallback = []) {
  const value = process.env[key];
  if (!value) return fallback;
  return value
    .split(",")
    .map((item) => normalizeOrigin(item))
    .filter(Boolean);
}

function withWwwVariants(origin) {
  const variants = new Set();
  const normalized = normalizeOrigin(origin);
  if (!normalized) return variants;

  variants.add(normalized);

  try {
    const url = new URL(normalized);
    if (url.hostname.startsWith("www.")) {
      variants.add(`${url.protocol}//${url.hostname.slice(4)}`);
    } else {
      variants.add(`${url.protocol}//www.${url.hostname}`);
    }
  } catch {
    // Ignore invalid origin values.
  }

  return variants;
}

function buildCorsOrigins() {
  const origins = new Set();
  const configured = readList("CORS_ORIGINS", []);
  const frontendUrl = normalizeOrigin(process.env.FRONTEND_URL || "http://localhost:3000");
  const sourceOrigins = configured.length ? configured : [frontendUrl];

  for (const origin of sourceOrigins) {
    for (const variant of withWwwVariants(origin)) {
      origins.add(variant);
    }
  }

  for (const variant of withWwwVariants(frontendUrl)) {
    origins.add(variant);
  }

  return Array.from(origins);
}

const frontendUrl = normalizeOrigin(process.env.FRONTEND_URL || "http://localhost:3000");
const corsOrigins = buildCorsOrigins();

function parseOriginCandidates(origin) {
  if (!origin) return [];

  return origin
    .split(",")
    .map((part) => normalizeOrigin(part))
    .filter(Boolean);
}

function matchAllowedOrigin(origin) {
  if (!origin) return true;

  const candidates = parseOriginCandidates(origin);

  for (const candidate of candidates) {
    const isAllowed = corsOrigins.some((allowed) => normalizeOrigin(allowed) === candidate);
    if (isAllowed) {
      return candidate;
    }
  }

  return false;
}

module.exports = {
  nodeEnv,
  isProduction: nodeEnv === "production",
  port: readNumber("PORT", 8000),
  frontendUrl,
  corsOrigins,
  matchAllowedOrigin,
  normalizeOrigin,
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:8000",
  adminResetUrl: process.env.ADMIN_RESET_URL || "http://localhost:3000/admin/reset-password",
  jwt: {
    secret: process.env.JWT_SECRET || "development-only-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    cookieName: process.env.JWT_COOKIE_NAME || "weecomi_admin_token",
  },
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: readNumber("DB_PORT", 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "weecomi",
    connectionLimit: readNumber("DB_CONNECTION_LIMIT", 10),
  },
  upload: {
    driver: process.env.UPLOAD_DRIVER || "local",
    maxImageMb: readNumber("UPLOAD_MAX_IMAGE_MB", 10),
    localDir: process.env.LOCAL_UPLOAD_DIR || "uploads",
    s3: {
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      bucket: process.env.S3_BUCKET,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      cdnUrl: process.env.S3_CDN_URL,
      forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
    },
  },
  mail: {
    host: process.env.SMTP_HOST,
    port: readNumber("SMTP_PORT", 587),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  },
  seed: {
    adminPassword: process.env.SEED_ADMIN_PASSWORD || "Admin123!",
    editorPassword: process.env.SEED_EDITOR_PASSWORD || "Editor123!",
  },
};
