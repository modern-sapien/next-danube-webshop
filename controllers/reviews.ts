//@ts-nocheck
import Review from "../models/Review.ts";
import Book from "../models/Book.ts";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/async";

// @desc get all reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/review/:reviewId/books
// @access Public
export const getReviews = asyncHandler(async (req, res, next) => {
  let query;

  console.log(req.params.bookId, "req.params.bookId");

  if (req.params.bookId) {
    console.log(req.params.bookId);

    query = await Review.find({ book: req.params.bookId });

    if (query.length === 0) {
      return next(
        new ErrorResponse(`Reviews not found for a book with id of ${req.params.bookId}`, 404)
      );
    }
  } else {
    query = Review.find().populate({
      path: "book",
      select: "title author",
    });
  }

  const reviews = await query;

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

// @desc get review by ID
// @route GET /api/v1/reviews/:reviewId
// @access Public
export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params._id);
  console.log(await review, "review");
  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params._id}`, 404));
  }
  res.status(200).json({ success: true, data: review });
});

// @desc Add reviews
// @route ADD /api/v1/books/:bookId/reviews
// @access Private
export const createReview = asyncHandler(async (req, res, next) => {
  req.body.book = req.params.bookId;

  const book = await Book.findById(req.params.bookId);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.bookId}`, 404));
  }

  console.log(req.body, "req.body");
  const review = await Review.create(req.body);

  res.status(200).json({ success: true, data: review });
});

// @desc update review
// @route Put /api/v1/reviews/:reviewId
// @access Private
export const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params.id}`, 404));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: review });
});

// @desc update review
// @route Put /api/v1/reviews/:reviewId
// @access Public
export const deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params.id}`, 404));
  }

  await review.deleteOne();

  res.status(200).json({});
});
