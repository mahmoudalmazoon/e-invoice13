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
exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.body).then((data) => {
      if (data) {
        return res.status(200).json({ message: "deleteDone" });
      }
    });
  } catch (error) {
    next(error);
  }
};
exports.updateuser = async (req, res, next) => {
  try {
    await userService.updateUser(req.body).then((data) => {
      if (data) {
        const { password, ...other } = data._doc;
        console.log(other);
        return res.status(200).json({ message: "update done", user: other });
      }
    });
  } catch (error) {
    next(error);
  }
};
