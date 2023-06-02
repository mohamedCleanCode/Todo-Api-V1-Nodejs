const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validatorLayer = require("../../middlewares/validatorLayer");
const UserModel = require("../../models/UserModel");

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: "3", max: "15" })
    .withMessage("Name must be between 3 and 15 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async (val) => {
      const email = await UserModel.findOne({ email: val }).then(
        (user) => user
      );
      if (email) {
        throw new Error("Email is alryady exist");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be > 6"),
  check("passwordConfirm").custom((val, { req }) => {
    if (val !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  check("phone").optional().isMobilePhone(["ar-Eg", "ar-Sa"]),
  check("ProfileImage").optional(),
  validatorLayer,
];

exports.updateUserPasswordValidator = [
  check("id")
    .notEmpty()
    .withMessage("id must be exist")
    .isMongoId()
    .withMessage("invalid id foramt"),
  check("currentPassword")
    .notEmpty()
    .withMessage("currentPassword must be exist")
    .custom(async (val, { req }) => {
      console.log();
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new Error("User not found");
      }
      const isCorrectPassword = await bcrypt.compare(val, user.password);
      if (!isCorrectPassword) {
        throw new Error("currentPassword is incorrect");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password must be exist")
    .isLength({ min: 6 })
    .withMessage("Password must be > 6"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm must be exist")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  validatorLayer,
];
