const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const companyRoutes = require("./routes/company.route")
const { config } = require("./config/default.config");
const { NOT_FOUND }  = require('./utils/namespace.util');
const bodyParser = require("body-parser");

// HANLDE CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", config.server.cors.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    return res.status(200).json({});
  }

  next();
});
// EXPRESS FEATURES AND SETTINGS
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({extended:true}))
// ROUTES
app.use("/v1/auth", authRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/companys", companyRoutes);

// HANDLE 404
app.use((req, res, next) => {
    const error = new Error(NOT_FOUND)
    error.status = 404
    next(error)
})
// HANDLE GLOBAL ERROR

app.use((error, req, res, next) => {
  return res.status(error.status || 500).send({
    error: {
      message: error.message,
    },
  }); 
});
module.exports = app