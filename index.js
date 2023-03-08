const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const config = require("./config/default.config").config;
const DB_CONNECTED = require("./utils/namespace.util").namespace.DB_CONNECTED;
mongoose
  .connect(
    `mongodb+srv://${config.db.username}:${config.db.password}@e-invoice.fbo7hn0.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(DB_CONNECTED);
    InitServer();
  })
  .catch((error) => console.log(error));
const InitServer = () => {
  http.createServer(app).listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
  });
};
