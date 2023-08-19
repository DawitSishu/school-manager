import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import {
  studentProfile,
  studentResult,
  studentHistory,
  updatePass,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

//view stud info
studentRouter.get("/profile", userAuthChecker, studentProfile);

//view report card
studentRouter.get("/result", userAuthChecker, studentResult);

//view history
studentRouter.get("/history", userAuthChecker, studentHistory);

// update password
studentRouter.put("/profile/update", userAuthChecker, updatePass);

export default studentRouter;
