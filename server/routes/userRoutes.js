import express from "express";
import {loginUser} from "../controllers/userController.js";

const userRouter = express.Router();


//login
userRouter.post('/login',loginUser);

//update-prof?

export default userRouter;