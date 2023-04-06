//@ts-nocheck
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/async";
import User from "../models/User.ts";

// @desc REGISTER USER
// @route POST /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body
  res.status(200).json({ success: true });
});
