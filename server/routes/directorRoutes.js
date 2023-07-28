import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import {
  createClass,
  teacherToClass,
  studentToClass,
  getTeachers,
  getOneTeacher,
} from "../controllers/directorController.js";

const directorRouter = express.Router();

//create a class
directorRouter.post("/classes", createClass);
//assign teacher to class
directorRouter.post("/classes/teacher", teacherToClass);

// asiign students to class
directorRouter.post("/classes/student", studentToClass);

// return all teachers
directorRouter.get("/teacher", getTeachers);

// return detail of specific teacher
directorRouter.get("/teacher/:id", getOneTeacher);

// admin panel ?

// teacher performance

export default directorRouter;
