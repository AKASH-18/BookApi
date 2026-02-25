const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");


/* =========================
   BOOK ROUTES
========================= */

// Get all books
router.get("/", getBooks);

// Get single book by bookId
router.get("/:id", getBookById);

// Create new book
router.post("/", createBook);

// Update book
router.put("/:id", updateBook);

// Delete book
router.delete("/:id", deleteBook);

module.exports = router;
