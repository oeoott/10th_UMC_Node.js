import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import apiRoutes from "./routes/index";
import { prisma } from "./db.config";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "Server is running",
  });
});

// API routes
app.use("/api/v1", apiRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "Not found",
  });
});

// Error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", error);
  res.status(500).json({
    status: 500,
    message: error.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(async () => {
    console.log("HTTP server closed");
    await prisma.$disconnect();
    process.exit(0);
  });
});
