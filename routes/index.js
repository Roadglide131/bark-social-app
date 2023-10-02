module.exports = (app) => {
  app.use("/api/users", require("./route.user"));
  app.use("/api/thoughts", require("./route.thought"));
};
