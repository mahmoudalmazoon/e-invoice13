const express = require("express");
const router = express.Router();
const {
  Schemas,
  RequestValidator,
} = require("../middlewares/requestvalidator.middleware");
const userController = require("../controllers/user.controller");
router.post(
  "/create",
  RequestValidator(Schemas.user.create),
  userController.create
);
router.get(
  "/AllUsers",
  userController.getAllUser
);
module.exports = router;
