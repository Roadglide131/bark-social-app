const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/bark_social_app").then(() => {
  console.log("connected");
});
app.listen(function () {
  console.log("server started");
});
