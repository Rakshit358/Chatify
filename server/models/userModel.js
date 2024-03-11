import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

userSchema.pre("save", async function next() {
  if (!this.isModified) {
    next();
  }

  this.password = bcrypt.hash(this.password, saltRounds);
});

export const User = mongoose.model("User", userSchema);
