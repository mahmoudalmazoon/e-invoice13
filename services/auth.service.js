const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const companyModel = require("../models/company.model");
const config = require("../config/default.config").config;
const { INVALID_CREDENTIALS, CompanyUndefined, employerNotAllowed } =
  require("../utils/namespace.util").namespace;

exports.signIn = async (payload) => {
  let data = [];
  try {
    const user = await User.findOne({
      $or: [{ username: payload.username }, { usermail: payload.username }],
    });
    if (!user) {
      const err = new Error(INVALID_CREDENTIALS);
      err.status = 409;
      throw err;
    }
    data.push(user);
    const isPasswordMatch = await user.comparePassword(payload.password);
    if (!isPasswordMatch) {
      const err = new Error(INVALID_CREDENTIALS);
      err.status = 409;
      throw err;
    }
    let company;
    if (user.postion === "admin") {
      company = await companyModel.find();
    } else {
      company = await companyModel.findById(payload.companyId);
    }
    if (!company) {
      throw new Error(CompanyUndefined);
    }
    if (
      !user.companys.includes(payload.companyId) ||
      !company.employers.includes(user._id)
    ) {
      throw new Error(employerNotAllowed);
    }
    data.push(company);
    return data;
  } catch (error) {
    throw error;
  }
};
exports.generateAccessToken = async (user) => {
  try {
    return jwt.sign(
      {
        _id: user._id,
      },
      config.server.token.secret,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );
  } catch (error) {
    throw error;
  }
};
