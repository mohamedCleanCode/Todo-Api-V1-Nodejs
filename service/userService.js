const UserModel = require("../models/UserModel");
const {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} = require("./handlersFactory");

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

// @desc   Update specific user
// @route  PUT /api/v1/users
// @access Private
exports.updateUser = updateOne(UserModel);

// @desc   Delete specific user
// @route  DELETE /api/v1/users
// @access Private
exports.deleteUser = deleteOne(UserModel);
