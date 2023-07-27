import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import { getStudents } from "../controllers/teacherController.js";

const teacherRouter = express.Router();

// my calsses (the classes he teaches)

// students (the students he studeies in class (2a- students))
teacherRouter.post("/classes/:id", getStudents);
// update the value of the students (test ena final masgebat)

// get report card (homeroom teacher khone ? kelelew not avilable)

export default teacherRouter;
