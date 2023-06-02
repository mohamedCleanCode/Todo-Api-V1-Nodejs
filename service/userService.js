const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./handlersFactory");
const ApiError = require("../utils/ApiError");

// @desc   Create user
// @route  POST /api/v1/users
// @access Private
exports.createUser = createOne(UserModel);

// @desc   Get specific user
// @route  POST /api/v1/users
// @access Private
exports.getUser = getOne(UserModel);

// @desc   Get users
// @route  GET /api/v1/users
// @access Private
exports.getUsers = getAll(UserModel);

// @desc   Update user password
exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    {
      new: true,
    }
  );
  if (!document) {
    next(new ApiError(`No ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc   Update specific user
// @route  PUT /api/v1/users
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
      slug: req.body.slug,
      profileImage: req.body.profileImage,
      phone: req.body.phone,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    next(new ApiError(`No ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc   Delete specific user
// @route  DELETE /api/v1/users
// @access Private
exports.deleteUser = deleteOne(UserModel);
