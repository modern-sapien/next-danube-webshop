//@ts-nocheck
import express from "express";
import dotenv from "dotenv";

// Route files
import books from "./routes/books"

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use('/api/v1/books', books)


// app.get("/api/v1/books", (req, res) => {
//   res.status(200).json({ success: true, msg: "show all books" });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
