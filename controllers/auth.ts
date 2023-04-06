//@ts-nocheck
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middleware/async";
import User from "../models/User.ts";

// @desc REGISTER USER
// @route POST /api/v1/auth/register
// @access Public
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  // Create token
  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token });

  sendTokenResponse(user, 200, res)

});

// @desc Login User
// @route POST /api/v1/auth/register
// @access Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("please provide and email and password", 400));
  }

  // check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("invalid credentials", 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("invalid credentials", 401));
  }

  // Create token
  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token });
  sendTokenResponse(user, 200, res)
});

// Get token from model, create cookie & send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({ success: true, token });
};
