const User = require("../models/User");
exports.get_users = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};
