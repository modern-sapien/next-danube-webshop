//@ts-nocheck
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

// Define the schema
const ReviewSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: false,
  // },
  book: {
    type: String,
    ref: "Book",
    required: false,
  },
  slug: {
    type: String,
    required: false,
    unique: false,
  },
  title: {
    type: String, 
    trim: true,
    required: true,
  },
  recommend: {
    type: Boolean,
    required: true
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
