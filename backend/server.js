require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

const app = express();

// CORS & JSON
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());

// DB
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Static files from uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// --- Production Specific Configuration ---
if (process.env.NODE_ENV === "production") {
  // Construct the absolute path to your frontend's 'dist' directory.
  // We use '..' to go up one directory from '__dirname' (which is 'backend'),
  // then navigate into 'frontend/prepvora-ai/dist'.
  const staticPath = path.join(__dirname, "..", "frontend", "prepvora-ai", "dist");
  console.log("✅ Serving static from:", staticPath);

  // 3. Serve static assets from the 'dist' folder
  // This middleware is crucial and must come BEFORE the catch-all route for index.html.
  // It tells Express to look for files like 'main.js', 'style.css', etc., directly in 'staticPath'.
  app.use(express.static(staticPath));

  // 4. Catch-all route for client-side routing (SPA)
  // For any GET request that hasn't been handled by previous middleware (like static files or API routes),
  // serve the 'index.html'. This allows your frontend's client-side router to take over.
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  // --- Development Specific Configuration ---
  // In development, simply indicate that the API is running
  // This route should also be carefully placed relative to other dev-specific routes.
  app.get("/", (req, res) => res.send("🌐 API is running..."));
}


// --- Error Handling Middleware (Optional, but recommended) ---
// This should be the last middleware in your chain.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🔌 Server running on port ${PORT}`));
