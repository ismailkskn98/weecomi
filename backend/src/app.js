const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const env = require("./config/env");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const authRoutes = require("./routes/authRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const newsRoutes = require("./routes/newsRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const contactRoutes = require("./routes/contactRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      const matchedOrigin = env.matchAllowedOrigin(origin);

      if (matchedOrigin === true) {
        callback(null, true);
        return;
      }

      if (matchedOrigin === false) {
        console.warn(`Blocked CORS origin: "${origin}". Allowed: ${env.corsOrigins.join(" | ")}`);
        callback(null, false);
        return;
      }

      callback(null, matchedOrigin);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"],
  }),
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve(process.cwd(), env.upload.localDir)));

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "weecomi-backend" });
});

app.use("/api/v1/admin/auth", authRoutes);
app.use("/api/v1/admin/gallery", galleryRoutes);
app.use("/api/v1/admin/news", newsRoutes);
app.use("/api/v1/admin/media", mediaRoutes);
app.use("/api/v1/admin/contact", contactRoutes);
app.use("/api/v1/public", publicRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
