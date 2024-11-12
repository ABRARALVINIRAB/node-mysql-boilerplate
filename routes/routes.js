const home = require("./home.route");

const auth = require("./auth.route");
const user = require("./user.route");

module.exports = (app) => {
  app.use("/api/v3", home);

  app.use("/api/v3/auth", auth);
  app.use("/api/v3/users", user);
};

