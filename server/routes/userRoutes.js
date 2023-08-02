import express from "express";
import {
  loginUser,
  createUser,
  checkUser,
} from "../controllers/userController.js";
import userAuthChecker from "../middlewares/userAuthCheaker.js";

const userRouter = express.Router();

//login
userRouter.post("/login", loginUser);

//create
userRouter.post("/signup", userAuthChecker, createUser);

//cheack token
userRouter.get("/", userAuthChecker, checkUser);
//update-prof?

export default userRouter;
