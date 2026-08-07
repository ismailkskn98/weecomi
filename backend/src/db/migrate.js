const mysql = require("mysql2/promise");
const env = require("../config/env");

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'EDITOR') NOT NULL DEFAULT 'EDITOR',
    status ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_users_email (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS user_sessions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    token_id VARCHAR(80) NOT NULL,
    expires_at DATETIME NOT NULL,
    revoked_at DATETIME NULL,
    ip_address VARCHAR(80) NULL,
    user_agent VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_user_sessions_token_id (token_id),
    KEY idx_user_sessions_user_id (user_id),
    CONSTRAINT fk_user_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_password_reset_token_hash (token_hash),
    KEY idx_password_reset_user_id (user_id),
    CONSTRAINT fk_password_reset_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS media_assets (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    storage_driver VARCHAR(30) NOT NULL,
    path VARCHAR(500) NOT NULL,
    public_url VARCHAR(700) NOT NULL,
    mime_type VARCHAR(120) NOT NULL,
    size_bytes BIGINT UNSIGNED NOT NULL DEFAULT 0,
    original_name VARCHAR(255) NULL,
    created_by BIGINT UNSIGNED NULL,
    deleted_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_media_assets_path (path),
    KEY idx_media_assets_created_by (created_by),
    CONSTRAINT fk_media_assets_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS gallery_items (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    slug VARCHAR(180) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'other',
    status ENUM('DRAFT', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'DRAFT',
    sort_order INT NOT NULL DEFAULT 0,
    cover_image_id BIGINT UNSIGNED NULL,
    title_tr VARCHAR(200) NOT NULL DEFAULT '',
    title_en VARCHAR(200) NOT NULL DEFAULT '',
    title_ru VARCHAR(200) NOT NULL DEFAULT '',
    title_az VARCHAR(200) NOT NULL DEFAULT '',
    title_ka VARCHAR(200) NOT NULL DEFAULT '',
    description_tr TEXT NULL,
    description_en TEXT NULL,
    description_ru TEXT NULL,
    description_az TEXT NULL,
    description_ka TEXT NULL,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    deleted_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_gallery_items_slug (slug),
    KEY idx_gallery_items_status (status),
    KEY idx_gallery_items_category (category),
    KEY idx_gallery_items_sort_order (sort_order),
    CONSTRAINT fk_gallery_cover_image FOREIGN KEY (cover_image_id) REFERENCES media_assets(id) ON DELETE SET NULL,
    CONSTRAINT fk_gallery_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_gallery_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS news_articles (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    slug VARCHAR(180) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'announcement',
    status ENUM('DRAFT', 'PUBLISHED', 'UNPUBLISHED') NOT NULL DEFAULT 'DRAFT',
    is_featured TINYINT(1) NOT NULL DEFAULT 0,
    author VARCHAR(120) NULL,
    cover_image_id BIGINT UNSIGNED NULL,
    author_image_id BIGINT UNSIGNED NULL,
    title_tr VARCHAR(220) NOT NULL DEFAULT '',
    title_en VARCHAR(220) NOT NULL DEFAULT '',
    title_ru VARCHAR(220) NOT NULL DEFAULT '',
    title_az VARCHAR(220) NOT NULL DEFAULT '',
    title_ka VARCHAR(220) NOT NULL DEFAULT '',
    summary_tr TEXT NULL,
    summary_en TEXT NULL,
    summary_ru TEXT NULL,
    summary_az TEXT NULL,
    summary_ka TEXT NULL,
    highlight_tr TEXT NULL,
    highlight_en TEXT NULL,
    highlight_ru TEXT NULL,
    highlight_az TEXT NULL,
    highlight_ka TEXT NULL,
    content_tr MEDIUMTEXT NULL,
    content_en MEDIUMTEXT NULL,
    content_ru MEDIUMTEXT NULL,
    content_az MEDIUMTEXT NULL,
    content_ka MEDIUMTEXT NULL,
    published_at DATETIME NULL,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    deleted_at DATETIME NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_news_articles_slug (slug),
    KEY idx_news_articles_status (status),
    KEY idx_news_articles_category (category),
    KEY idx_news_articles_featured (is_featured),
    KEY idx_news_articles_published_at (published_at),
    CONSTRAINT fk_news_cover_image FOREIGN KEY (cover_image_id) REFERENCES media_assets(id) ON DELETE SET NULL,
    CONSTRAINT fk_news_author_image FOREIGN KEY (author_image_id) REFERENCES media_assets(id) ON DELETE SET NULL,
    CONSTRAINT fk_news_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_news_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

async function addColumnIfMissing(connection, table, column, definition) {
  const [rows] = await connection.query(
    `SELECT COUNT(*) AS count
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [env.db.database, table, column],
  );

  if (Number(rows[0].count) === 0) {
    await connection.query(`ALTER TABLE \`${table}\` ADD COLUMN ${definition}`);
    console.log(`Added column ${table}.${column}`);
  }
}

async function migrate() {
  const connection = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${env.db.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await connection.query(`USE \`${env.db.database}\``);

    for (const statement of statements) {
      await connection.query(statement);
    }

    await addColumnIfMissing(connection, "news_articles", "is_featured", "is_featured TINYINT(1) NOT NULL DEFAULT 0 AFTER status");
    await addColumnIfMissing(connection, "news_articles", "author", "author VARCHAR(120) NULL AFTER is_featured");
    await addColumnIfMissing(
      connection,
      "news_articles",
      "author_image_id",
      "author_image_id BIGINT UNSIGNED NULL AFTER cover_image_id",
    );
    await addColumnIfMissing(connection, "news_articles", "highlight_tr", "highlight_tr TEXT NULL AFTER summary_ka");
    await addColumnIfMissing(connection, "news_articles", "highlight_en", "highlight_en TEXT NULL AFTER highlight_tr");
    await addColumnIfMissing(connection, "news_articles", "highlight_ru", "highlight_ru TEXT NULL AFTER highlight_en");
    await addColumnIfMissing(connection, "news_articles", "highlight_az", "highlight_az TEXT NULL AFTER highlight_ru");
    await addColumnIfMissing(connection, "news_articles", "highlight_ka", "highlight_ka TEXT NULL AFTER highlight_az");

    console.log("Database migration completed.");
  } finally {
    await connection.end();
  }
}

if (require.main === module) {
  migrate().catch((error) => {
    console.error("Database migration failed.");
    console.error(error);
    process.exit(1);
  });
}

module.exports = migrate;
