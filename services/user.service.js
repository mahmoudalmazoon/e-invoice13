const User = require("../models/user.model");
const { ErrorHandler } = require("../lib/errorhandler.lib");

exports.create = async (payload) => {
  try {
    const user = new User(payload);
    return await user.save();
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.getAlluser = async (payload) => {
  try {
    const Users = await User.find();
    return Users;
  } catch (error) {
    await ErrorHandler(error);
  }
};
