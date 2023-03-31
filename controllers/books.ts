//@ts-nocheck
import Book from "../models/Book";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/async";

// @desc get all books
// @route GET /api/v1/books
// @access Public
export const getBooks = asyncHandler(async (req, res, next) => {
  const book = await Book.find();

  res.status(200).json({ success: true, data: book });
});
// @desc get a book by ID
// @route GET /api/v1/books/:id
// @access Public
export const getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: book });
});
// @desc create books
// @route CREATE /api/v1/books
// @access Private
export const createBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);

  res.status(201).json({ success: true, data: book, msg: "create a book" });
});
// @desc update a book
// @route UPDATE /api/v1/books
// @access Public
export const updateBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: book });
});
// @desc get all books
// @route DELETE /api/v1/books
// @access Public
export const deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, msg: `Delete book ${req.params.id}` });
});
