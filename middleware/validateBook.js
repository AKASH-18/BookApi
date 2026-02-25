const { body, validationResult } = require("express-validator");

/* BOOK VALIDATION RULES */
exports.bookValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("author")
    .notEmpty()
    .withMessage("Author is required"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
];

/* VALIDATION RESULT HANDLER */
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(e => e.msg)
    });
  }

  next();
};
