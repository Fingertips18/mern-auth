import cookieParser from "cookie-parser";
import favicon from "serve-favicon";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { Routes } from "./constants/routes.constant.js";
import rootRoutes from "./routes/root.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDb } from "./db/connect-db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.join(__dirname, "/backend/public", "favicon.ico")));
  app.use(Routes.root.path, rootRoutes);
}

app.use(Routes.auth.path, authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/*splat", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log("Server is running on port:", PORT);
});
