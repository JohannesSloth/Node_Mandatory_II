import { Router } from "express";
import apiLimiter from "../utils/rateLimiter.js";
import { sendThankYouMail } from "../utils/nodeMailer.js";

const router = Router();

router.post("/api/send-email", apiLimiter, async (req, res) => {
  try {
    await sendThankYouMail(req.body.email);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
