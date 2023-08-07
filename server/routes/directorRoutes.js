import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import {
  createClass,
  teacherToClass,
  studentToClass,
  getTeachers,
  getOneTeacher,
  getMe,
} from "../controllers/directorController.js";

const directorRouter = express.Router();

//get my details
directorRouter.get("/director/me", userAuthChecker, getMe);

//create a class
directorRouter.post("/classes", userAuthChecker, createClass);
//assign teacher to class
directorRouter.post("/classes/teacher", userAuthChecker, teacherToClass);

// asiign students to class
directorRouter.post("/classes/student", userAuthChecker, studentToClass);

// return all teachers
directorRouter.get("/teacher", userAuthChecker, getTeachers);

// return detail of specific teacher
directorRouter.get("/teacher/:id", userAuthChecker, getOneTeacher);

// admin panel ?

// teacher performance

export default directorRouter;
