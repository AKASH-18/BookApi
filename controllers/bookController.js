const Book = require('../models/Book'); 
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    const formattedBooks = books.map(book => ({
      id: book.bookId,
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      inStock: book.inStock
    }));

    res.status(200).json({
      success: true,
      count: formattedBooks.length,
      data: formattedBooks
    });

  } catch (error) {
    console.error("GET BOOKS ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ bookId: req.params.id });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
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
        inStock: book.inStock
      }
    });

  } catch (error) {
    console.error("GET BOOK BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: {
        id: book.bookId,
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
        inStock: book.inStock
      }
    });

  } catch (error) {
    console.error("CREATE BOOK ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { bookId: req.params.id },
      req.body,
      { returnDocument: 'after' }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
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
        inStock: book.inStock
      }
    });

  } catch (error) {
    console.error("UPDATE BOOK ERROR:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ bookId: req.params.id });

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