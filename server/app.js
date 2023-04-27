import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import emailRouter from "./routers/emailRouter.js";

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

app.use(authRouter);
app.use(emailRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
