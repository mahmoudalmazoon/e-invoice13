const express = require("express");
const router = express.Router();
const {
  Schemas,
  RequestValidator,
} = require("../middlewares/requestvalidator.middleware");
const userController = require("../controllers/user.controller");
const {
  extractJwtFromHeader,
} = require("../middlewares/tokenextractor.middleware");
router.post(
  "/create",
  RequestValidator(Schemas.user.create),
  userController.create
);
router.get("/AllUsers", userController.getAllUser);
router.delete(
  "/deleteuser",
  RequestValidator(Schemas.user.delete),
  extractJwtFromHeader,
  userController.deleteUser
);
router.put(
  "/updateuser",
  RequestValidator(Schemas.user.update),
  extractJwtFromHeader,
  userController.updateuser
);
module.exports = router;
