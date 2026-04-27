import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import architectureRouter from "./routes/architecture.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const VERCEL_PROJECT_NAME = process.env.VERCEL_PROJECT_NAME || "";

function buildAllowedOrigins() {
  return CLIENT_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedOrigin(origin) {
  const allowedOrigins = buildAllowedOrigins();

  if (!origin) {
    return true;
  }

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  if (VERCEL_PROJECT_NAME) {
    const escapedName = VERCEL_PROJECT_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const previewPattern = new RegExp(`^https://${escapedName}(-[a-z0-9-]+)?\\.vercel\\.app$`, "i");

    if (previewPattern.test(origin)) {
      return true;
    }
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (_request, response) => {
  response.json({
    success: true,
    message: "ArchGen AI backend is live.",
    endpoints: {
      health: "/api/health",
      generateArchitecture: "/api/architecture/generate"
    }
  });
});

app.get("/api/health", (_request, response) => {
  response.json({
    success: true,
    message: "ArchGen AI backend is running."
  });
});

app.use("/api/architecture", architectureRouter);

app.use((error, _request, response, _next) => {
  const statusCode = error.statusCode || 500;

  response.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error."
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
