//@ts-nocheck
const mongoose = require("mongoose");

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;

  if (process.env.NODE_ENV !== 'production') {
    mongoUri = process.env.MONGO_URI_STAGING;
  }

  const conn = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`mongoDB connected ${conn.connection.host}`.green.bold.inverse);
};

module.exports = connectDB;
