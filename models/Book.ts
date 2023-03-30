import { UUID } from "bson";

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: {
    type: UUID,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  slug: String,
  author: {
    type: String,
    required: true,
    maxlength: [100, "name cannot be more than 100 characters"]
  },
  publisher: {
    type: String,
    required: true,
    maxlength: [100, "name cannot be more than 100 characters"]
  },
  review: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
