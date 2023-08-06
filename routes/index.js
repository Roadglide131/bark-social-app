module.exports = (app) => {
  app.use("/api/users", require("./route.user"));
};
