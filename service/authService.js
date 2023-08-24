const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const ApiError = require("../utils/ApiError");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

// @desc   Post signup
// @route  POST /api/v1/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1) Create user
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2) Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

// @desc   Post login
// @route  POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  // check if email & password in the body
  // check if user exist & password is correct
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  // generate token
  const token = createToken(user._id);
  // send response to client side
  res.status(200).json({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // 1) check if token exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        "You are not loggedin, please login to access this route",
        401
      )
    );
  }
  // 2) verify token (check if token changed or expired)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) check if user exist
  const currentUser = await UserModel.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError("The user does'nt exsit..!", 401));
  }
  // 4) check if user change password after token created
  if (currentUser.passwordChangeAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangeAt.getTime() / 1000,
      10
    );
    // Password changed after created token
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed password. Please login again...",
          401
        )
      );
    }
  }
  req.user = currentUser;
  next();
});
