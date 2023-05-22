import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc Auth user/set token
// route POST /api/users/auth/
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.matchPasswords(password)) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});

// @desc Register a new user
// route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }
  const user = await User.create({ firstName, lastName, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc logout user
// route POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out." });
});

// @desc get user profile
// route GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  };
  res.status(200).json({ user });
});

// @desc update user profile
// route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
