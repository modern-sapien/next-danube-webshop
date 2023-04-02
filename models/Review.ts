//@ts-nocheck
import mongoose from "mongoose"
// import { v4 as uuidv4 } from 'uuid';

// Define the schema
const ReviewSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  //   default: uuidv4,
  // },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: false,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String, 
    required: true,
  },
  recommend: {
    type: Boolean,
    required: true
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
export default model('Review', ReviewSchema);