//@ts-nocheck
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

// @desc get all users
// @route GET /api/v1/users
// @access Public
const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc get user by ID
// @route GET /api/v1/users/:id
// @access Private
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: user });
});
// @desc update a book
// @route UPDATE /api/v1/books
// @access Private
const updateUser = asyncHandler(async (req, res, next) => {
  // ################################################################
  // #### NEED TO MATCH USER TO USER MAKING THE REQUEST or ADMIN ####
  // ################################################################

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: user });
});

// @desc get all books
// @route DELETE /api/v1/books
// @access Private
const deleteUser = asyncHandler(async (req, res, next) => {
  // ################################################################
  // #### NEED TO MATCH USER TO USER MAKING THE REQUEST or ADMIN ####
  // ################################################################

  const user = await User.findOne({ _id: req.params.id });

  console.log(user, "user");

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  console.log(await user.deleteOne, "user.deleteOne"); //log the remove method

  await user.deleteOne();

  res.status(200).json({});
});

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
