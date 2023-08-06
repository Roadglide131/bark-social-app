const express = require("express");
const { get_users } = require("../controllers/controller.users");
const router = express.Router();
router.get("/users", get_users);
