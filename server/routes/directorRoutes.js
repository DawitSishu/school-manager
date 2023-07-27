import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import { createClass, createStudent } from "../controllers/directorController.js";

const directorRouter = express.Router();

//create a class
directorRouter.post('/classes',createClass);
//create a student
directorRouter.post('/classes',createStudent);
//assign teacher to class

// asiign students to class

// return all teachers

// return detail of specific teacher

// admin panel ?

// teacher performance


export default directorRouter;