const express = require("express");

const { signup, login } = require("../service/authService");
const {
  signupValidator,
  loginValidator,
} = require("../utils/validator/authValidator");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);

module.exports = router;
