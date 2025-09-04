// routes/bookRoutes.js
import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// @route   POST /api/books
// @desc    Create a new book
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, publishedDate } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      publishedDate,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
