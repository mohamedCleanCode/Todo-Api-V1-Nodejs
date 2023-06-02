const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

exports.signup = asyncHandler(async (req, res, next) => {
  // 1) Create user
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2) Generate token
  const token = await jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );

  res.status(201).json({ data: user, token });
});
