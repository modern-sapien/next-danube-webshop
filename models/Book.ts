import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  id: {
    type: String, 
    // default: uuidv4,
    required: false,
    unique: true,
  },
  title: {
    type: String,
    required: [true, "please add a title"],
    unique: true,
    trim: true
  },
  slug: String,
  genre: {
    type: [String],
    required: false,
    enum: ["fiction", "horror", "romance", "old", "witchcraft"],
  },
  image: {
    type: String,
    default: "no-photo.jpg",
  },
  author: {
    type: String,
    required: true,
    maxlength: [100, "author names cannot be more than 100 characters"],
  },
  publisher: {
    type: String,
    required: true,
    maxlength: [100, "name cannot be more than 100 characters"],
  },
  review: {
    type: String,
    default: null,
    maxlength: [500, "name cannot be more than 500 characters"],
  },
  rating: {
    type: Number,
    default: null,
    min: [1, "cannot rate lower than 1"],
    max: [5, "cannot rate higher than 5"],
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
