const authService = require("../services/auth.service");
exports.signIn = async (req, res, next) => {
  await authService
    .signIn(req.body)
    .then(async (data) => {
      const accessToken = await authService.generateAccessToken(data[0]);
      const { password, ...other } = { ...data[0]._doc };
      return res.status(200).json({
        token: accessToken,
        user: other,
        company: data[1],
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
