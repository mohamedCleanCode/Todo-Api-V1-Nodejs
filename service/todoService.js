const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const TodoModel = require("../models/TodoModel");
const {
  createOne,
  getOne,
  getAll,
  deleteOne,
  updateOne,
} = require("./handlersFactory");
const ApiError = require("../utils/ApiError");

// @desc   Create todo
// @route  POST /api/v1/todos
// @access Private (user)
exports.createTodo = createOne(TodoModel);

// @desc   Get specific todo
// @route  GET /api/v1/todos
// @access Private (user)
exports.getTodo = getOne(TodoModel);

// @desc   Get todos
// @route  GET /api/v1/todos
// @access Private (user)
exports.getTodos = getAll(TodoModel);

// @desc   Update todo
// @route  PUT /api/v1/todos
// @access Private (user)
exports.updateTodo = updateOne(TodoModel);

// @desc   Delete todo
// @route  DELETE /api/v1/todos
// @access Private (user)
exports.deleteTodo = deleteOne(TodoModel);
