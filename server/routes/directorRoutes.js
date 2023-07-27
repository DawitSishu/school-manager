import express from "express";
import userAuthChecker from "../middlewares/userAuthCheaker.js";
import { createClass } from "../controllers/directorController.js";

const directorRouter = express.Router();

//create a class
directorRouter.post('/classes',createClass);
//create a student

//assign teacher to class

// asiign students to class

// return all teachers

// return detail of specific teacher

// admin panel ?

// teacher performance


export default directorRouter;