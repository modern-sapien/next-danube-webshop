//@ts-nocheck
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")  

const UserSchema = new mongoose.Schema(
  { 
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
    username: { type: String, unique: true, required: [true, "please add a userName"] },
    image: { type: String },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    createdAt: { type: Date, default: Date.now },
    reviews: [{ type: String, ref: "Review", required: false }],
  },
  // virtuals
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT & return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Match entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Define a virtual property for populating reviews
UserSchema.virtual("populatedReviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "review",
  justOne: false,
}); 

const User = mongoose.model("User", UserSchema );
module.exports = User;
