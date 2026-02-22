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
    genre: {
      type: String,
    },
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
  { timestamps: true },
);
bookSchema.pre("save", async function () {
  if (!this.isNew) return;
  const counter = await Counter.findOneAndUpdate(
    { name: "bookId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  this.bookId = counter.seq;
});

module.exports = mongoose.model("Book", bookSchema);
