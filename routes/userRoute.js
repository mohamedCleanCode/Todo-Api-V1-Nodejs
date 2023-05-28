const express = require("express");

// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brandValidator");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../service/userService");
const { createUserValidator } = require("../utils/validator/userValidator");

const router = express.Router();

router.route("/").get(getUsers).post(createUserValidator, createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
