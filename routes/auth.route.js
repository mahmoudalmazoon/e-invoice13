const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  RequestValidator,
  Schemas,
} = require("../middlewares/requestvalidator.middleware");
const router = express.Router();
router.post(
  "/signin",
  RequestValidator(Schemas.auth.signin),
  authController.signIn
);
module.exports = router;
