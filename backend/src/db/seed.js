const bcrypt = require("bcryptjs");
const pool = require("./pool");
const env = require("../config/env");

const users = [
  { name: "WeeComi Admin", email: "admin@weecomi.com", role: "ADMIN", passwordKey: "adminPassword" },
  { name: "WeeComi Editor", email: "editor@weecomi.com", role: "EDITOR", passwordKey: "editorPassword" },
];

async function upsertUsers(connection) {
  for (const user of users) {
    const password = env.seed[user.passwordKey];
    const passwordHash = await bcrypt.hash(password, 12);

    await connection.query(
      `INSERT INTO users (name, email, password_hash, role, status)
       VALUES (?, ?, ?, ?, 'ACTIVE')
       ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), status = 'ACTIVE', password_hash = VALUES(password_hash)`,
      [user.name, user.email, passwordHash, user.role],
    );
  }
}

async function seed() {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await upsertUsers(connection);
    await connection.commit();
    console.log("Database seed completed.");
    console.log("Default admin: admin@weecomi.com / Admin123!");
    console.log("Default editor: editor@weecomi.com / Editor123!");
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

if (require.main === module) {
  seed().catch((error) => {
    console.error("Database seed failed.");
    console.error(error);
    process.exit(1);
  });
}

module.exports = seed;
