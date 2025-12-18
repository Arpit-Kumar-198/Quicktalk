import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 10000; // fallback if PORT not set
const __dirname = path.resolve();

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL // Vercel frontend domain
    : "http://localhost:5173"; // local frontend

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// ---------- ROUTES ----------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ---------- FRONTEND SERVING (optional) ----------
if (process.env.NODE_ENV === "production") {
  // Not needed for separate Vercel frontend
  // Keep commented out
  // app.use(express.static(path.join(__dirname, "../frontend/dist")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  // });
}

// ---------- START SERVER ----------
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});
