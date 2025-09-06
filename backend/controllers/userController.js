import jwt from "jsonwebtoken";
import user from "../models/user.js";
import bcrypt from "bcryptjs";

//JWT generate
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Tokens, {
    expiresIn: "30d",
  });
};

//ApI to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await user.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "User Already Exist" });
    }
    const nUser = await user.create({ name, email, password });
    const token = generateToken(nUser._id);
    res.json({ success: true, token, user: nUser });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//ApI to login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await user.findOne({ email }).select("password");
    if (!userExist) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (isMatch) {
      const token = generateToken(userExist._id);
      // Get user data without password for response
      const userData = await user.findById(userExist._id).select("-password");
      return res.json({ success: true, token, user: userData });
    }
    return res.json({ success: false, message: "Invalid Email or Password" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//API to get user
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
