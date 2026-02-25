const Book = require("../models/Book");

/* =====================================
   GET ALL BOOKS
   GET /api/books
===================================== */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    const formattedBooks = books.map((book) => ({
      id: book.bookId || book._id.toString(),
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      inStock: book.inStock,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedBooks.length,
      data: formattedBooks,
    });

  } catch (error) {
    console.error("GET BOOKS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching books",
    });
  }
};


/* =====================================
   GET BOOK BY ID
   GET /api/books/:id
===================================== */
exports.getBookById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
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
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      },
    });

  } catch (error) {
    console.error("GET BOOK BY ID ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching book",
    });
  }
};


/* =====================================
   CREATE BOOK
   POST /api/books
===================================== */
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, price, inStock } = req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      price,
      inStock,
      createdBy: req.user._id, // important
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
      message: "Server error while creating book",
    });
  }
};


/* =====================================
   UPDATE BOOK
   PUT /api/books/:id
===================================== */
exports.updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findOneAndUpdate(
      { bookId: id },
      req.body,
      { new: true, runValidators: true }
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
    console.error("UPDATE BOOK ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating book",
    });
  }
};


/* =====================================
   DELETE BOOK
   DELETE /api/books/:id
===================================== */
exports.deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }

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
    console.error("DELETE BOOK ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting book",
    });
  }
};