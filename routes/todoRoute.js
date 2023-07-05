const express = require("express");

const {
  createTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  setUserIdToBody,
  setFilterObj,
} = require("../service/todoService");
const {
  createUserValidator,
  updateUserValidator,
  updateUserPasswordValidator,
} = require("../utils/validator/userValidator");

const router = express.Router({ mergeParams: true });

router.route("/").post(setUserIdToBody, createTodo).get(setFilterObj, getTodos);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
