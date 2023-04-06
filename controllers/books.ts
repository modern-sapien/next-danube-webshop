//@ts-nocheck
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/async";
import Book from "../models/Book.ts";

// @desc get all books
// @route GET /api/v1/books
// @access Public
export const getBooks = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});
// @desc get a book by ID
// @route GET /api/v1/books/:id
// @access Public
export const getBook = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);

  const book = await Book.findById(req.params.id);
  console.log(await book, "book");
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
  // const book = await Book.findById(req.params.id);
  const book = await Book.findOne({ _id: req.params.id });

  console.log(book, "book");

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  console.log(await book.deleteOne, "book.deleteOne"); //log the remove method

  await book.deleteOne();

  res.status(200).json({});
});
