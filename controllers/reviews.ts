//@ts-nocheck
import Review from "../models/Review.ts";
import User from "../models/User.ts";
import Book from "../models/Book.ts";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/async";

// @desc get all reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/review/:reviewId/books
// @access Public
export const getReviews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  console.log(req.user, "req.user")
  // book id 
  req.body.book = req.params.bookId;
  // user id
  req.body.user = req.user._id;

  const book = await Book.findById(req.params.bookId);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.bookId}`, 404));
  }

  // I need to pass the user
  const review = await Review.create(req.body);

  console.log(req.user._id)
  // add the review to the user's array of reviews
  await User.findByIdAndUpdate(req.user._id, { $push: { reviews: review._id } });

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
