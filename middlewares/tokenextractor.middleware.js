const JWT = require("jsonwebtoken");
const config = require("../config/default.config").config
exports.extractJwtFromHeader = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    JWT.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        const err = new Error(NOT_FOUND);
        err.status = 404;
        next(err);
      } else {
        res.locals.verificationToken = decoded;
        next();
      }
    });
  } else {
    const err = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    next(err);
  }
};
