const Book = require("../models/Book");
const mongoose = require("mongoose");

/* GET ALL BOOKS */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    const formatted = books.map(book => ({
      id: book.bookId, // ← THIS FIXES YOUR PROBLEM
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      inStock: book.inStock,
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });

  } catch (error) {
    console.error("GET BOOKS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


/* GET BOOK BY ID (using bookId not _id) */
exports.getBookById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book id",
      });
    }

    const book = await Book.findOne({ bookId: id });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: book.bookId,
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
        inStock: book.inStock,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


/* CREATE BOOK */
exports.createBook = async (req, res) => {
  try {

    const book = await Book.create({
      ...req.body,
      createdBy: req.user._id, // ← REQUIRED FIELD FIX
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: {
        id: book.bookId,
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
        inStock: book.inStock,
      },
    });

  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create book",
    });
  }
};


/* UPDATE BOOK */
exports.updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const book = await Book.findOneAndUpdate(
      { bookId: id },
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


/* DELETE BOOK */
exports.deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const book = await Book.findOneAndDelete({ bookId: id });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
