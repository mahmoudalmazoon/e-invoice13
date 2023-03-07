const express = require("express");
const companyController = require("../controllers/company.controller");
const {
  RequestValidator,
  Schemas,
} = require("../middlewares/requestvalidator.middleware");
const {
  extractJwtFromHeader,
} = require("../middlewares/tokenextractor.middleware");
const router = express.Router();
router.post(
  "/create",
  // extractJwtFromHeader,
  RequestValidator(Schemas.company.create),
  companyController.create
);
router.delete(
  "/delete",
  extractJwtFromHeader,
  RequestValidator(Schemas.company.delete),
  companyController.delete
);
router.put(
  "/addEmployer",
  // extractJwtFromHeader,
  RequestValidator(Schemas.company.addEmployer),
  companyController.addEmployer
);
router.put(
  "/deleteEmployer",
  extractJwtFromHeader,
  RequestValidator(Schemas.company.deleteEmployer),
  companyController.deleteEmployer
);
router.post(
  "/getEmployerCompany",
  RequestValidator(Schemas.company.getEmployerCompany),
  companyController.getEmployerCompany
);
module.exports = router;
