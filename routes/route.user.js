const express = require("express");
const {
  get_users,
  create_user,
  update_user_by_id,
  delete_user_id,
} = require("../controllers/controller.users");
const router = express.Router();
router.get("/users", get_users);
router.post("/add", create_user);
router.post("/update/:id", update_user_by_id);
router.delete("/delete/:id", delete_user_id);
module.exports = router;
