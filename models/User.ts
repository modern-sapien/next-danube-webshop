//@ts-nocheck
import mongoose from "mongoose";
const { v4: uuidv4 } = require("uuid");
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: [true],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minLength: 7,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  username: { type: String, required: [true, "please add a userName"] },
  image: { type: String },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

// encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
