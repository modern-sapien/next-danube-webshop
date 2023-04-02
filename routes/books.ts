//@ts-nocheck
import express from "express";
import Book from "../models/Book.ts";

import { getBook, getBooks, createBook, updateBook, deleteBook } from "../controllers/books";

// Include other resource routers
const reviewRouter = require("./reviews.ts")

const router = express.Router();

// Re-route into other resource routers
router.use("/:bookId/reviews", reviewRouter)

router.route("/").get(getBooks).post(createBook);

router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;
