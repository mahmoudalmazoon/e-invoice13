const companyService = require("../services/company.service");
exports.create = async (req, res, next) => {
  await companyService
    .create(req.body)
    .then(async (data) => {
      return res.status(201).json({ message: "create done" });
    })
    .catch((error) => {
      next(error);
    });
};
exports.delete = async (req, res, next) => {
  await companyService
    .delete(req)
    .then(async (data) => {
      if (data) {
        return res.status(200).json({ message: "delete company done" });
      } else {
        return res
          .status(404)
          .json({ message: "company not found maybe deleted before" });
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.addEmployer = async (req, res, next) => {
  await companyService
    .addEmployer(req)
    .then(async (data) => {
      if (data) {
        return res.status(200).json({ message: "add company employer done" });
      } else {
        return res
          .status(404)
          .json({ message: "should create company before adding employer" });
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.deleteEmployer = async (req, res, next) => {
  await companyService
    .deleteEmployer(req)
    .then(async (data) => {
      if (data) {
        return res
          .status(200)
          .json({ message: "delete company employer done" });
      } else {
        return res
          .status(404)
          .json({ message: "should create company before adding employer" });
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
exports.getEmployerCompany = async (req, res, next) => {
  await companyService
    .getEmployerCompanies(req)
    .then(async (data) => {
      if (data) {
        return res.status(200).json({ companies: data });
      } else {
        return res
          .status(404)
          .json({ message: "employer don`t add to any company" });
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.updateCompany = async (req,res,next)=>{
  await companyService.updateCompany(req.body).then(data=>{
    if(data){
      return res.status(200).json({company:data})
    }else{
      res.status(404).json({message:"update failed"})
    }
  })
}