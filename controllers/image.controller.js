const { ErrorHandler } = require("../lib/errorhandler.lib");
const images = require("../services/image.service");

exports.uploadImage = async (req, res, next) => {
  try {
    images.upload.single("file");
    return res.status(200).json("upload done");
  } catch (error) {
    await ErrorHandler(error);
  }
};
