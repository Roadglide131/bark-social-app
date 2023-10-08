const Thought = require("../models/Thought");
const isEmpty = require("is-empty");
const User = require("../models/User");
const Reaction = require("../models/Reaction");
exports.create_thought = async (req, res) => {
  try {
    const { user, thoughtText } = req.body;
    console.log(user);
    if (isEmpty(user) || isEmpty(thoughtText)) {
      return res.status(400).json({ err_text: "Username or text are empty" });
    }
    if (thoughtText.length > 280) {
      return res.status(400).json({
        err_text: "Text should be less than or equal to 280 characters",
      });
    }
    const get_user = await User.findById(user);
    const thought = Thought({ user: get_user._id, thoughtText });
    await thought.save();
    const thought_with_user = await Thought.findById(thought._id)
      .populate("user")
      .exec();
    get_user.thoughts.unshift(thought._id);
    await get_user.save();
    return res.status(200).json({
      thoughtText: thought_with_user.thoughtText,
      userId: thought_with_user.user._id,
      username: thought_with_user.user.username,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      err_server: "Something wrong happened",
    });
  }
};

exports.get_all_thoughts = async (req, res) => {
  try {
    const get_thoughts = await Thought.find();
    return res.status(200).json({ thoughts: get_thoughts });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err_happened: "Error happened" });
  }
};

exports.get_thought = async (req, res) => {
  try {
    const get_thought_by_id = await Thought.findById(req.params.id)
      .populate("user", "username _id")
      .exec();
    return res.status(200).json({ thought: get_thought_by_id });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err_happened: "Error happened" });
  }
};

exports.delete_thought = async (req, res) => {
  try {
    await Thought.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success_deletion: "Thought has been deleted" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err_happened: "Error happened" });
  }
};

exports.update_thought = async (req, res) => {
  try {
    const { thoughtText } = req.body;
    const thought = await Thought.findById(req.params.id);
    if (isEmpty(thoughtText)) {
      return res.status(400).json({ err_text: "Thought text is empty" });
    }
    if (thoughtText.length > 280) {
      return res.status(400).json({
        err_text: "Text should be less than or equal to 280 characters",
      });
    }
    thought.thoughtText = thoughtText;
    await thought.save();
    return res.status(200).json(thought);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err_happened: "Error happened" });
  }
};
exports.add_reaction = async (req, res) => {
  try {
    const { reactionBody, username } = req.body;
    let thought = await Thought.findById(req.params.thoughtId);
    if (
      reactionBody.length > 280 ||
      reactionBody.length === 0 ||
      username.length === 0
    ) {
      return res
        .status(400)
        .json("Both reaction text and username are required");
    }
    let reaction = new Reaction({
      reactionBody,
      username,
    });
    await reaction.save();

    thought.reactions.unshift(reaction.reactionId);
    await thought.save();
    return res.status(200).json({ thought });
  } catch (err) {
    return res.status(404).json({ err_reaction: "Thought doesn't exist" });
  }
};
exports.remove_reaction = async (req, res) => {
  try {
    let thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.filter((i) => i.toString() !== req.params.reactionId);
    await thought.save();
    return res.status(200).json({ thought });
  } catch (err) {
    return res.status(404).json({ err_reaction: "Thought doesn't exist" });
  }
};
