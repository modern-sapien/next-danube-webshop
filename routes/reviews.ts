//@ts-nocheck
import express from "express";
import Review from "../models/Review.ts";
import advancedResults from "../middleware/advancedResults.ts";


import {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews";

const router = express.Router({ mergeParams: true });

import { protect } from "../middleware/auth.ts"

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "book",
      select: "title author",
    }),
    getReviews
  )
  .post(protect, createReview);
router.route("/:id").get(getReview).put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
