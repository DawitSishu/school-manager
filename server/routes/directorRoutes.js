import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import {
  createClass,
  teacherToClass,
  studentToClass,
  getTeachers,
  getOneTeacher,
  getMe,
  resetTeacher,
  getSudents,
  resetStudent,
  getClasses,
  getSudentDetail,
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

//return all students
directorRouter.get("/students", userAuthChecker, getSudents);

//return all students
directorRouter.get("/students/:id", userAuthChecker, getSudentDetail);

// return detail of specific teacher
directorRouter.get("/teacher/:id", userAuthChecker, getOneTeacher);

//reset teacher password
directorRouter.post("/teacher/reset", userAuthChecker, resetTeacher);

//reset student password
directorRouter.post("/student/reset", userAuthChecker, resetStudent);

//return all classes
directorRouter.get("/classes", userAuthChecker, getClasses);

// teacher performance

export default directorRouter;
