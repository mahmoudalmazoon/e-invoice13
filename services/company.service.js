const Company = require("../models/company.model");
const { ErrorHandler } = require("../lib/errorhandler.lib");
const userModel = require("../models/user.model");

exports.create = async (payload) => {
  try {
    const company = new Company(payload);
    return await company.save();
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.delete = async (payload) => {
  try {
    const user = await userModel.findById(payload.body.creatorId);
    if (user.postion === "admin") {
      const res = await Company.findByIdAndDelete(payload.body.companyId);
      return res;
    } else {
      throw new Error("admin only can delete");
    }
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.addEmployer = async (payload) => {
  try {
    const user = await userModel.findById(payload.body.creatorId);
    const employer = await userModel.findById(payload.body.employerId);
    if (user.postion === "admin" && employer) {
      const company = await Company.findById(payload.body.companyId);
      if (!company.employers.includes(payload.body.employerId)) {
        await company.updateOne({
          $push: { employers: payload.body.employerId },
        });
        await employer.updateOne({
          $push: { companys: payload.body.companyId },
        });
        return company;
      } else {
        if (!employer) {
          throw new Error("should signup employer");
        } else {
          throw new Error("employer already have been added");
        }
      }
    } else {
      throw new Error("admin only can add employer");
    }
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.deleteEmployer = async (payload) => {
  try {
    const user = await userModel.findById(payload.body.creatorId);
    const employer = await userModel.findById(payload.body.employerId);
    if (user.postion === "admin") {
      const company = await Company.findById(payload.body.companyId);
      if (company.employers.includes(payload.body.employerId)) {
        await company.updateOne({
          $pull: { employers: payload.body.employerId },
        });
        await employer.updateOne({
          $pull: { companys: payload.body.companyId },
        });
        return company;
      } else {
        throw new Error("employer already have been deleted maybe before");
      }
    } else {
      throw new Error("admin only can add employer");
    }
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.getEmployerCompany = async (payload) => {
  try {
    const user = await userModel.findById(payload.body.employerId);
    if(user){
      const companys = await Promise.all(
        user.companys.map((companyId) => {
          return Company.findById(companyId);
        })
      );
      return companys
    }else{
      throw new Error("user can`t be find")
    }
  } catch (error) {
    await ErrorHandler(error);
  }
};
