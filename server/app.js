import express from "express";
import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { sendThankYouMail } from "./utils/nodeMailer.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

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

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", email, (err, user) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
      }

      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.user = { id: user.id, email: user.email };

      console.log("Session after login:", req.session);

      res.json({ user: req.session.user });
    });
  });
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });
    }

    res.json({ message: "Logged out" });
  });
});

app.get("/api/auth/user", (req, res) => {
  console.log("Session when requesting user:", req.session);
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({ user: req.session.user });
});

app.post("/api/send-email", async (req, res) => {
  try {
    await sendThankYouMail(req.body.email);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
