//@ts-nocheck
import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: [true],
  },
  email: { type: String, required: true, unique: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'please add a valid email' ]},
  password: { type: String, required: [true, 'please add a password'], minLength: 7, select: false },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  firstName: { type: String, required: [true, 'please add a first name'] },
  lastName: { type: String, required: [true, 'please add a last name'] },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
