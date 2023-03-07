const userService = require("../services/user.service");
exports.create = async (req, res, next) => {
  await userService
    .create(req.body)
    .then(async (data) => {
      return res.status(201).json({ message: "create done" });
    })
    .catch((error) => {
      next(error);
    });
};
exports.getAllUser = async (req, res, next) => {
  try {
    await userService.getAlluser().then(async (data) => {
      return res.status(200).json({ Users: data });
    });
  } catch (error) {
    next(error);
  }
};

