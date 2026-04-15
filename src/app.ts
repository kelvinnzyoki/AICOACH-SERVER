import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import aiRoutes from "./routes/ai.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001", // frontend URL
  credentials: true
}));

app.use(cookieParser());

// Routes
app.use("/ai", aiRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/", (_, res) => {
  res.send("API running...");
});

// Error handler
app.use(errorHandler);

export default app;
