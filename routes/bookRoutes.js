import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// ✅ GET route with pagination
router.get("/", async (req, res) => {
  try {
    // Query params se page aur limit lo (default: page=1, limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Skip calculate karo
    const skip = (page - 1) * limit;

    // Books fetch with pagination
    const books = await Book.find().skip(skip).limit(limit);

    // Total books count
    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      books,
      pagination: {
        currentPage: page,
        totalPages,
        totalBooks,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
});

export default router;
