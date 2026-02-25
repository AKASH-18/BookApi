const mongoose = require("mongoose");
const Counter = require("./Counter");

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: String,
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/* AUTO INCREMENT BOOK ID */
bookSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) return next();

    const counter = await Counter.findOneAndUpdate(
      { name: "bookId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.bookId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

/* IMPORTANT PART — THIS FIXES YOUR PROBLEM */
bookSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret.bookId || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Book", bookSchema);