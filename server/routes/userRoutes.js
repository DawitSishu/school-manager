import express from "express";
import { loginUser, createUser } from "../controllers/userController.js";

const userRouter = express.Router();

//login
userRouter.post("/login", loginUser);

//create
userRouter.post("/signup", createUser);
//update-prof?

export default userRouter;