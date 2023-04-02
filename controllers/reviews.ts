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

  console.log(req.params.bookId, "req.params.bookId")

  if(req.params.bookId) {
    console.log(req.params.bookId)
    query = Review.find({ book: req.params.bookId });
  } else {
    query = Review.find();
  }

  const reviews = await query;

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});
