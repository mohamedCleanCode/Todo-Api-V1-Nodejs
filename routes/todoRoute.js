const express = require("express");

const {
  createTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../service/todoService");
const {
  createUserValidator,
  updateUserValidator,
  updateUserPasswordValidator,
} = require("../utils/validator/userValidator");

const router = express.Router();

router.route("/").post(createTodo).get(getTodos);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
