const express = require("express");
const Review = require("../models/Review.js");
const advancedResults = require("../middleware/advancedResults.js")

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews.js");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth.js");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "book",
      select: "title author",
    }),
    getReviews
  )
  .post(protect, authorize("admin", "user"), createReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("admin", "user"), updateReview)
  .delete(protect, deleteReview);

module.exports = router;
