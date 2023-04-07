//@ts-nocheck
const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotenv = require("dotenv")

// Load env vars
require('dotenv').config({ path: "./config/config.env" });

// Load models 
const Book = require("./models/Book.ts")
const Review = require("./models/Review.ts")
const User = require("./models/User.ts")

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});  

// Read JSON files
const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8"));

// import into db
const importData = async () => {
  try {
    await Book.create(books);
    await User.create(users);
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
    await User.deleteMany();
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
