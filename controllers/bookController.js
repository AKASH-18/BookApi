const Book = require("../models/Book");

/* =========================
   GET ALL BOOKS
========================= */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* =========================
   GET BOOK BY ID
========================= */
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid book ID",
    });
  }
};


/* =========================
   CREATE BOOK
========================= */
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: book,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while creating book",
    });
  }
};


/* =========================
   UPDATE BOOK
========================= */
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
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
      data: book,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid book ID",
    });
  }
};


/* =========================
   DELETE BOOK
========================= */
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

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
    res.status(400).json({
      success: false,
      message: "Invalid book ID",
    });
  }
};