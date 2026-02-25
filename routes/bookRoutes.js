const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");
const { bookValidationRules, validate } = require("../middleware/validateBook");

/* PUBLIC ROUTES */
router.get("/", getBooks);
router.get("/:id", getBookById);

/* PROTECTED ROUTES */
router.post("/", protect, bookValidationRules, validate, createBook);
router.put("/:id", protect, bookValidationRules, validate, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
