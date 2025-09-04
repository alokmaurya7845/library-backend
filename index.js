// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";  // ✅ Add this

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Use book routes
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => res.send("Welcome to MERN Backend 🚀"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/libraryDB";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    app.listen(5555, () => {
      console.log("✅ Server running on http://localhost:5555");
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
    process.exit(1);
  }
}

startServer();
