const authService =  require("../services/auth.service");
exports.signIn = async (req, res, next) => {
  await authService
    .signIn(req.body)
    .then(async (data) => {
      const accessToken = await authService.generateAccessToken(data);
      const { password, ...other } = { ...data._doc };
      return res.status(200).json({
        token: accessToken,
        user: other,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
 
 