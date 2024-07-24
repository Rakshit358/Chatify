import asyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import generateToken from "../config/generateToken.js";
import JsonWebToken from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  console.log("here\n");
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
  console.log(user);

  if (user) {
    const token = generateToken(user._id);
    console.log(token);
    return res.json({
      message: "success",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400);
    res.send("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const user = await User.findOne({ email });
  // console.log(user);
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    // console.log(token);
    return res.json({
      message: "success",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(401);
    res.send("User not found");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const decoded = JsonWebToken.verify(token, "mySecret1234");
  const userId = decoded.id;
  const users = await User.find({ _id: { $ne: userId } }).select("name _id");

  res.send(users);
});

// const allUsers = asyncHandler(async (req, res) => {
//   const searchWord = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};

//   const searchedUser = await User.find(searchWord).find({
//     _id: { $ne: req.user._id },
//   });
//   res.send(searchedUser);
//   // console.log(searchWord);
// });

export { registerUser, authUser, allUsers };
