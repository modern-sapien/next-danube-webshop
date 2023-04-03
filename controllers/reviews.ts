//@ts-nocheck
import Review from "../models/Review.ts";
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
    query = Review.find();
  }

  const reviews = await query;

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});
