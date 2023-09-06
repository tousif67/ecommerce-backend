const userService = require("../Services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService= require("../Services/cart.service.js")

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = await jwtProvider.generateToken(user._id);

    await cartService.createCart(user);

    return res.status(200).json({ jwt, message: "register success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
    const {username,password}=req.body
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid Password .." });
    }

    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register };
