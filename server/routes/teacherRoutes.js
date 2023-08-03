import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import {
  getStudents,
  updateStudentValue,
  getMyClasses,
  getStudent,
  getMydetails,
} from "../controllers/teacherController.js";

const teacherRouter = express.Router();

//return the teacher's detail
teacherRouter.get("/teacher/me",userAuthChecker, getMydetails);

// my calsses (the classes he teaches)
teacherRouter.get("/teacher/class", getMyClasses);

// students (the students he studeies in class (2a- students))
teacherRouter.get("/classes/:id", getStudents);
// update the value of the students (test ena final masgebat)
teacherRouter.put("/students/:id", updateStudentValue); // ? if all no id

//get the specific student;
teacherRouter.get("/students/:id", getStudent);
// get report card (homeroom teacher khone ? kelelew not avilable)

export default teacherRouter;
