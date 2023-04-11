//@ts-nocheck
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const slugify = require("slugify");

const BookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: false,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
      trim: true,
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
      required: [true, "Please add an author"],
      maxlength: [100, "author names cannot be more than 100 characters"],
    },
    publisher: {
      type: String,
      required: [true, "Please add a publisher"],
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
      required: [true, "Please add a price"],
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

// Create book slug from name
BookSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Cascade delete reviews when a book is deleted
BookSchema.pre('deleteOne', { document: true }, async function(next) {
  console.log(`Reviews being removed from book ${this._id}`);
  await this.model("Review").deleteMany({ book: this._id });
  next();
});

// Reverse populate with virtuals
BookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  // referencing the review model foreign field
  foreignField: "book",
  justOne: false,
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;

// export model('Book', BookSchema);
