const Review = require("../models/Review.js") ;
const User = require("../models/User.js") ;
const Book = require("../models/Book.js") ;
const ErrorResponse = require("../utils/errorResponse.js") ;
const asyncHandler = require("../middleware/async.js") ;

// @desc get all reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/review/:reviewId/books
// @access Public
const getReviews = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc get review by ID
// @route GET /api/v1/reviews/:reviewId
// @access Public
const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params._id);

  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params._id}`, 404));
  }
  res.status(200).json({ success: true, data: review });
});

// @desc Add reviews
// @route ADD /api/v1/books/:bookId/reviews
// @access Private
const createReview = asyncHandler(async (req, res, next) => {
  // book id
  req.body.book = req.params.bookId;
  // user id
  req.body.user = req.user._id;

  const book = await Book.findById(req.params.bookId);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.bookId}`, 404));
  }

  const review = await Review.create(req.body);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        reviews: {
          reviewId: review._id,
          bookId: review.bookId,
        },
      },
    },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, data: review, msg: `${user.username} thanks for the review!` });
});

// @desc update review
// @route Put /api/v1/reviews/:reviewId
// @access Private
const updateReview = asyncHandler(async (req, res, next) => {
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
const deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`Review not found with id of ${req.params.id}`, 404));
  }

  await review.deleteOne();

  res.status(200).json({});
});

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};