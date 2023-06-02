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
  updateUserPasswordValidator,
} = require("../utils/validator/userValidator");

const router = express.Router();

router
  .route("/updateUserPassword/:id")
  .put(updateUserPasswordValidator, updateUserPassword);
router.route("/").get(getUsers).post(createUserValidator, createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
