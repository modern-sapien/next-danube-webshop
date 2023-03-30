//@ts-nocheck
import Book from "../models/Book";

// @desc get all books
// @route GET /api/v1/books
// @access Public
export async function getBooks(req, res, next) {
  try {
    const book = await Book.find();

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
// @desc get a book by ID
// @route GET /api/v1/books/:id
// @access Public
export async function getBook(req, res, next) {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
// @desc create books
// @route CREATE /api/v1/books
// @access Private
export async function createBooks(req, res, next) {
  try {
    console.log(req.body);
    const book = await Book.create(req.body);

    res.status(201).json({ success: true, data: book, msg: "create a book" });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
// @desc update a book
// @route UPDATE /api/v1/books
// @access Public
export async function updateBook(req, res, next) {
  console.log(req.body);
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
// @desc get all books
// @route DELETE /api/v1/books
// @access Public
export async function deleteBook(req, res, next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, msg: `Delete book ${req.params.id}` });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
