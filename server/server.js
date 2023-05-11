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

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://next-danube-webshop.vercel.app",
      "https://next-danube-webshop-staging.vercel.app",
      "https://next-danube-webshop-nqycdzdfn-modern-sapien.vercel.app/",
      /^https:\/\/next-danube-webshop(-[a-zA-Z0-9]+)?\.vercel\.app$/
    ];
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

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
