import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// POST route to add a new book
router.post("/add", async (req, res) => {
  try {
    const { title, author, genre, publishedDate } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      publishedDate,
    });

    await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding book",
      error: error.message,
    });
  }
});

export default router;
