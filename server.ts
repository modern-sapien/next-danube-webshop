//@ts-nocheck
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import errorHandler from "./middleware/error";
import connectDB from "./config/db";

//using colors package
colors;

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
import books from "./routes/books";
import reviews from "./routes/reviews";
import auth from "./routes/auth";

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/books", books);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/auth", auth);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Hanlde unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold.inverse);
  // close server & exit process
  server.close(() => process.exit());
});
