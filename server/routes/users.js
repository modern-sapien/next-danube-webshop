//@ts-nocheck
const express = require("express");
const Review = require("../models/Review.js");
const { getUser, getUsers, updateUser, deleteUser } = require("../controllers/users.js");
const advancedResults = require("../middleware/advancedResults.js");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth.js");

router
  .route("/")
  .get(
    protect,
    authorize("user", "admin"),
    advancedResults(Review
      // , { path: "reviews", select: "book title recommend review stars" }
      ),
    getUsers
  );

router
  .route("/:id")
  .get(getUser)
  .put(protect, authorize("user", "admin"), updateUser)
  .delete(protect, authorize("user", "admin"), deleteUser);

module.exports = router;
