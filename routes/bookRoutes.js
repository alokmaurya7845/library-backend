import express from "express";
import mongoose from "mongoose";
import Book from "../models/bookModel.js";

const router = express.Router();

// ✅ Fetch a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // check if ObjectId is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching book", error: error.message });
  }
});

export default router;
