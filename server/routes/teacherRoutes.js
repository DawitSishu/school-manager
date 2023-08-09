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

// my calsses (the classes he owns(home-room-teacher)
teacherRouter.post("/teacher/class",userAuthChecker, getMyClasses);

// students (the students he studeies in class (2a- students))
teacherRouter.get("/classes/:id", userAuthChecker,getStudents);
// update the value of the students (test ena final masgebat)
teacherRouter.put("/students/:id", userAuthChecker,updateStudentValue); // ? if all no id

//get the specific students list from class;
teacherRouter.get("/class/students/:id",userAuthChecker, getStudent);
// get report card (homeroom teacher khone ? kelelew not avilable)

export default teacherRouter;
