//@ts-nocheck
import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
import Book from "./models/Book";
import Review from "./models/Review";

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, "utf-8"));

// import into db
const importData = async () => {
  try {
    await Book.create(books);
    await Review.create(reviews);

    console.log("Data imported...".blue.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// delete data
const deleteData = async () => {
  try {
    await Book.deleteMany();
    await Review.deleteMany();

    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-v") {
  deleteData();
}
