import express from "express";
import { getUser, loginUser, registerUser } from "../controllers/userController.js";
import protect from "../middleware/auth.js"

const userRouter=express.Router();

//register
userRouter.post('/register',registerUser);
//login
userRouter.post('/login',loginUser);
//get user
userRouter.get('/data',protect , getUser);

export default userRouter;