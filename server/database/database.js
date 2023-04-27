import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("userDatabase.db");

db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)"
);

db.serialize(() => {
  const password = bcrypt.hashSync("password123", 10);
  db.run(
    `INSERT OR IGNORE INTO users (email, password) VALUES ("user@example.com", "${password}")`
  );
});

export default db;
