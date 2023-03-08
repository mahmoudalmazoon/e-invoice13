const { ErrorHandler } = require("../lib/errorhandler.lib");
const userModel = require("../models/user.model");
const { adminonly,NOT_FOUNDUSER } = require("../utils/namespace.util").namespace;
exports.create = async (payload) => {
  try {
    const user = new userModel(payload);
    return await user.save();
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.getAlluser = async (payload) => {
  try {
    const Users = await userModel.find();
    return Users;
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.deleteUser = async (payload) => {
  try {
    const creator = await userModel.findById(payload.creatorId);
    
    if (creator?.postion !== "admin" || !creator ) {
      throw new Error(adminonly);
    }
   const user = await userModel.findByIdAndDelete(payload.employerId);
   if(!user){
    throw new Error(NOT_FOUNDUSER);
   }
   return user
  
  } catch (error) {
    await ErrorHandler(error);
  }
};
exports.updateUser = async (payload)=>{
  try {
    const creator = await userModel.findById(payload.creatorId)
    if(!creator || creator?.postion !== "admin"){
      throw new Error(adminonly)
    }
    const user = await userModel.findByIdAndUpdate(payload.employerId,{
      $set:payload
    })
    return user
  } catch (error) {
    await ErrorHandler(error)
  }
}