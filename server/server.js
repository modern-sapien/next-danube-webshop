const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cors = require("cors");

//using colors package
colors;

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const books = require("./routes/books");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// use cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// allow origin and credentials
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "https://next-danube-webshop.vercel.app'");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/books", books);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/users", users);
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
