//@ts-nocheck
import Book from "../models/Book.ts";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/async";

// @desc get all books
// @route GET /api/v1/books
// @access Public
export const getBooks = asyncHandler(async (req, res, next) => {
  let query;

  // copy req.query
  const reqQuery = { ...req.query };

  // fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields & delete from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  // finding resource
  query = Book.find(JSON.parse(queryStr));

  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    console.log(fields, "fields");

    query = query.select(fields);
  }

  // SORT
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy, "sortBy");

    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Book.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const totalPages = Math.ceil(total / limit);

  // executing query
  const books = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({ success: true, count: books.length, total, pagination, data: books });
});
// @desc get a book by ID
// @route GET /api/v1/books/:id
// @access Public
export const getBook = asyncHandler(async (req, res, next) => {
  console.log(req.params);

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.log(error)
  }

  // if (!book) {
  //   return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  // }
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
