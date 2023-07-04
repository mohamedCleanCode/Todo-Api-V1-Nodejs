const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateUserPassword,
} = require("../service/userService");
const {
  createUserValidator,
  updateUserValidator,
  updateUserPasswordValidator,
} = require("../utils/validator/userValidator");

const router = express.Router();

router.route("/").get(getUsers).post(createUserValidator, createUser);
router
  .route("/updateUserPassword/:id")
  .put(updateUserPasswordValidator, updateUserPassword);
router
  .route("/:id")
  .get(getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUser);

module.exports = router;
