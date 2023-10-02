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
