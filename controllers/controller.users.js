const User = require("../models/User");
const isEmpty = require("is-empty");
exports.get_users = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};
exports.create_user = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (isEmpty(username) || isEmpty(email))
      return res
        .status(400)
        .json({ error: "username or email fields should not be empty" });
    const user = new User({ username, email });
    await user.save();
    return res.status(200).json({ username, email });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error_user: "all fields are required" });
  }
};

exports.update_user_by_id = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (isEmpty(username) || isEmpty(email)) {
      return res
        .status(400)
        .json({ error: "username or email fields should not be empty" });
    }
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: username,
        email: email,
      }
    );
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      err_user: "Something went wrong",
    });
  }
};

exports.delete_user_id = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      success: "User deleted",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      err: "Something wrong happened ",
    });
  }
};
// GET a single user by its _id and populated thought and friend data
exports.get_specific_user = async ({ req, res }) => {
  try {
    let user_thoughts_friends = await User.findById(req.params.id).populate(
      "thougts friends"
    );
    return res.status(200).json({ user: user_thoughts_friends });
  } catch (err) {
    return res
      .status(404)
      .json({ err_user_not_found: "We couldn't find this user" });
  }
};

exports.add_friend = async ({ req, res }) => {
  try {
    let user = await User.findById(req.params.userId);
    user.friends.unshift(req.params.friendId);
    user.save();
    return res.status(200).json({ user: user_thoughts_friends });
  } catch (err) {
    return res
      .status(404)
      .json({ err_user_not_found: "We couldn't find this user" });
  }
};

exports.remove_friend = async ({ req, res }) => {
  try {
    let user = await User.findById(req.params.userId);
    user.friends.filter((i) => i.toString() !== req.params.friendId);
    user.save();
    return res.status(200).json({ user: user_thoughts_friends });
  } catch (err) {
    return res
      .status(404)
      .json({ err_user_not_found: "We couldn't find this user" });
  }
};
