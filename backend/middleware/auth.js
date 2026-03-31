import jwt from "jsonwebtoken";
import user from "../models/user.js";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: "Token not provided" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_Tokens);
    const userId = decoded.id;
    const Puser = await user.findById(userId);
    if (!Puser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    req.user = Puser;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: "Not authorized, token failed",
      error: error.message 
    });
  }
};
export default protect;