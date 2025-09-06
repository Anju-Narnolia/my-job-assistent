import jwt from "jsonwebtoken";
import user from "../models/user.js";

 const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.JWT_Tokens);
    const userId = decoded.id;
    const Puser = await user.findOne(userId);
    if (!Puser) {
      return res.json({
        success: false,
        message: "not authorizes user Not found",
      });
    }
    req.Puser = Puser;
    next();
  } catch (error) {}
  res.status(401).json({ message: "Not authorized token Failed" });
};
export default protect;