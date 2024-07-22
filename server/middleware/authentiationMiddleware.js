import JsonWebToken from "jsonwebtoken";
import { User } from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(`Printing the req`);
  console.log(req.headers);
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Reached inside");
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = JsonWebToken.verify(token, "mySecret1234");
      console.log("HERE");
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Authorization failed");
    }
  } else {
    res.status(401);
    throw new Error("Failed no token found");
  }
});

export default protect;
