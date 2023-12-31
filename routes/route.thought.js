const express = require("express");
const {
  create_thought,
  get_all_thoughts,
  get_thought,
  delete_thought,
  update_thought,
  add_reaction,
  remove_reaction,
} = require("../controllers/controller.thoughts");
const router = express.Router();
router.post("/create", create_thought);
router.get("/", get_all_thoughts);
router.get("/:id", get_thought);
router.delete("/delete/:id", delete_thought);
router.put("/update/:id", update_thought);
router.post("/:thoughtId/reactions", add_reaction);
router.delete("/:thoughtId/reactions/:reactionId", remove_reaction);

module.exports = router;
