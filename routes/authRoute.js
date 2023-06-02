const express = require("express");

const { signup } = require("../service/authService");
const { signupValidator } = require("../utils/validator/authValidator");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);

module.exports = router;
