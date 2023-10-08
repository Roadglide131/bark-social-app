const express = require("express");
const {
  get_users,
  create_user,
  update_user_by_id,
  delete_user_id,
  get_specific_user,
  add_friend,
  remove_friend,
} = require("../controllers/controller.users");
const router = express.Router();
router.get("/users", get_users);
router.post("/add", create_user);
router.post("/update/:id", update_user_by_id);
router.delete("/delete/:id", delete_user_id);
router.get("/user/:id", get_specific_user);
router.post("/:userId/friends/:friendId", add_friend);
router.delete("/:userId/friends/:friendId", remove_friend);
module.exports = router;
