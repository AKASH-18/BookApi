const Book = require('../models/Book');

/* =========================
   GET ALL BOOKS
   GET /api/books
========================= */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    // Format response to show bookId as id
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


/* =========================
   GET BOOK BY ID
   GET /api/books/:id
========================= */
exports.getBookById = async (req, res) => {
  try {

    // IMPORTANT: search using bookId NOT _id
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


/* =========================
   CREATE BOOK
   POST /api/books
========================= */
exports.createBook = async (req, res) => {
  try {

    const { title, author, genre, price, inStock } = req.body;

    // basic validation
    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, author and price"
      });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      price,
      inStock
    });

    // return bookId
    res.status(201).json({
      success: true,
      message: "Book created successfully",
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
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================
   UPDATE BOOK
   PUT /api/books/:id
========================= */
exports.updateBook = async (req, res) => {
  try {

    // update using bookId
    const book = await Book.findOneAndUpdate(
      { bookId: req.params.id },
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
      message: "Book updated successfully",
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


/* =========================
   DELETE BOOK
   DELETE /api/books/:id
========================= */
exports.deleteBook = async (req, res) => {
  try {

    // delete using bookId
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
