//@ts-nocheck
import express from "express";
import Review from "../models/Review.ts";

import {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews";

const router = express.Router({mergeParams: true});

router.route("/").get(getReviews).post(createReview)
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;
