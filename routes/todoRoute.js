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

const { protect } = require("../service/authService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, setUserIdToBody, createTodo)
  .get(setFilterObj, getTodos);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
