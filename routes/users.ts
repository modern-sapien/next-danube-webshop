//@ts-nocheck
import express from "express";
import Review from "../models/Review.ts";
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/users";
import advancedResults from "../middleware/advancedResults.ts";

const router = express.Router();

import { protect, authorize } from "../middleware/auth.ts";

router
  .route("/")
  .get(
    protect,
    authorize("user", "admin"),
    advancedResults(Review, { path: "reviews", select: "book title recommend review stars" }),
    getUsers
  );

router
  .route("/:id")
  .get(getUser)
  .put(protect, authorize("user admin"), updateUser)
  .delete(protect, authorize("user admin"), deleteUser);

module.exports = router;
