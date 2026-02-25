const Book = require('../models/Book');

/* =========================
   GET ALL BOOKS
   GET /api/books
========================= */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ bookId: 1 });

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

    // Convert id to Number
    const bookId = Number(req.params.id);

    const book = await Book.findOne({ bookId });

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

    let { title, author, genre, price, inStock } = req.body;

    // validation
    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title, author and price are required"
      });
    }

    // ensure price is number
    price = Number(price);

    const book = await Book.create({
      title,
      author,
      genre,
      price,
      inStock
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

    const bookId = Number(req.params.id);

    // Prevent changing bookId
    if (req.body.bookId) {
      delete req.body.bookId;
    }

    const book = await Book.findOneAndUpdate(
      { bookId },
      req.body,
      { new: true, runValidators: true }
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

    const bookId = Number(req.params.id);

    const book = await Book.findOneAndDelete({ bookId });

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
