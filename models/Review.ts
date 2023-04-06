//@ts-nocheck
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Define the schema
const ReviewSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      unique: true,
      required: true,
    },
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
      required: true,
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
  },
  // virtuals
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Reverse populate with virtuals
ReviewSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  // referencing the review model foreign field
  foreignField: "user",
  justOne: false,
});

// Create and export the model
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
