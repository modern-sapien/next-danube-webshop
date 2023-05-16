const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const cors = require("cors");

colors;

dotenv.config({ path: "./config/config.env" });

connectDB();

const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin.includes("https://next-danube-webshop") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

const books = require("./routes/books");
const reviews = require("./routes/reviews");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use("/api/v1/books", books);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold.inverse);
  server.close(() => process.exit());
});
