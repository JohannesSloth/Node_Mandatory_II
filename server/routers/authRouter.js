import { Router } from "express";
import session from "express-session";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import apiLimiter from "../utils/rateLimiter.js";
import db from "../database/database.js";

dotenv.config();

const router = Router();
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

router.post("/api/auth/login", apiLimiter, (req, res) => {
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

router.post("/api/auth/logout", (req, res) => {
  console.log("Session before logging out:", req.session);
  req.session.destroy((err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });
    }

    res.json({ message: "Logged out" });
  });
});

router.get("/api/auth/user", (req, res) => {
  console.log("Session when requesting user:", req.session);
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({ user: req.session.user });
});

export default router;
