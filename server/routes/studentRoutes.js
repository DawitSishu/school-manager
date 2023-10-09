import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import {
  studentProfile,
  updatePass,
  inputProfile,
  addReview,
  myTeachers,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

//view stud info
studentRouter.get("/profile", userAuthChecker, studentProfile);

// update password
studentRouter.put("/profile/update", userAuthChecker, updatePass);

// input profile info
studentRouter.post("/profile/input", userAuthChecker, inputProfile);

// add review to teacher
studentRouter.post("/review/teacher", userAuthChecker, addReview);

//get all teachers
studentRouter.get("/myteachers", userAuthChecker, myTeachers);

export default studentRouter;
