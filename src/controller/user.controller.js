const userService = require("../Services/user.service.js");

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];

    if (!jwt) {
      return res.status(404).json({ message: "toekn not found" });
    }
    const user = await userService.getUserProfileByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllUser,
  getUserProfile,
};
