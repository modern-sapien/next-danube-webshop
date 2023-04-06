//@ts-nocheck
import express from "express";
import Book from "../models/Book.ts";
import { getBook, getBooks, createBook, updateBook, deleteBook } from "../controllers/books";
import advancedResults from "../middleware/advancedResults.ts";

// Include other resource routers
const reviewRouter = require("./reviews.ts");

const router = express.Router();

// Re-route into other resource routers
router.use("/:bookId/reviews", reviewRouter);

router
  .route("/")
  .get(advancedResults(Book, { path: "reviews", select: "title recommend review stars" }), getBooks)
  .post(createBook);

router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;
