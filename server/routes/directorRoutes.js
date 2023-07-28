import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import { createClass, teacherToClass } from "../controllers/directorController.js";

const directorRouter = express.Router();

//create a class
directorRouter.post('/classes',createClass);
//assign teacher to class
directorRouter.post('/classes/teacher',teacherToClass);

// asiign students to class

// return all teachers

// return detail of specific teacher

// admin panel ?

// teacher performance


export default directorRouter;