const Book = require('../models/Book');

/* GET ALL BOOKS */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error("GET BOOKS ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

/* GET BOOK BY ID */
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });

  } catch (error) {
    console.error("GET BOOK BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

/* CREATE BOOK */
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book
    });

  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* UPDATE BOOK */
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
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });

  } catch (error) {
    console.error("UPDATE BOOK ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

/* DELETE BOOK */
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully'
    });

  } catch (error) {
    console.error("DELETE BOOK ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
