import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import generateToken from "../config/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    res.send("Please enter all the details");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    res.send("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.send("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.send("User not found");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const searchWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const searchedUser = await User.find(searchWord).find({
    _id: { $ne: req.user._id },
  });
  res.send(searchedUser);
  // console.log(searchWord);
});

export { registerUser, authUser, allUsers };
