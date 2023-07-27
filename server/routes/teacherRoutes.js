import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import { getStudents,updateStudentValue } from "../controllers/teacherController.js";

const teacherRouter = express.Router();

// my calsses (the classes he teaches)

// students (the students he studeies in class (2a- students))
teacherRouter.get("/classes/:id", getStudents);
// update the value of the students (test ena final masgebat)
teacherRouter.post("/students/:id", updateStudentValue);

//get the specific student;

// get report card (homeroom teacher khone ? kelelew not avilable)

export default teacherRouter;
