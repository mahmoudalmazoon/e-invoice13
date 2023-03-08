const express = require("express");
const router = express.Router();
const {
  RequestValidator,
  Schemas,
} = require("../middlewares/requestvalidator.middleware");
const {
  extractJwtFromHeader,
} = require("../middlewares/tokenextractor.middleware");
router.post(
  "/uploadcompanyimage",
  extractJwtFromHeader,
  RequestValidator(Schemas.images.upload)
);
module.exports = router;
