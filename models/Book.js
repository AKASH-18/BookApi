const mongoose = require("mongoose");
const Counter = require("./Counter");

const bookSchema = new mongoose.Schema(
  {
    // Auto Increment Book ID
    bookId: {
      type: Number,
      unique: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },

    genre: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    // IMPORTANT: make OPTIONAL (not required)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);


/* ===============================
   AUTO-INCREMENT bookId
================================ */
bookSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "bookId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.bookId = counter.seq;
    next();

  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Book", bookSchema);
