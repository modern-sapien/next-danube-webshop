//@ts-nocheck
import express from "express";
import Book from "../models/Book"

import { getBook, getBooks, createBooks, updateBook, deleteBook } from "../controllers/books";

const router = express.Router();

router.route("/").get(getBooks).post(createBooks);

router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

export default router;
