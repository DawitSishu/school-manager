import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";

//@desc returns the specific student data
//@route GET /api/student/profile
//@access private
export const studentProfile = asyncHandler(async (req, res) => {
  //the id is his' so is got from the req.user don't forget
  const result = await pool.query(
    `SELECT * from students WHERE student_id = ?`,
    [req.user.student_id]
  );
  res.json(result[0][0]);
});

//@desc returns the report card of a student
//@route GET /api/student/result
//@access private
export const studentResult = asyncHandler(async (req, res) => {
  //the id is his' so is got from the req.user don't forget
  const { id } = req.body;
  const result = await pool.query(
    `SELECT report_card from students WHERE student_id = ?`,
    [id]
  );
  res.json(result[0][0]);
});

//@desc returns the report card history of the student
//@route GET /api/student/result
//@access private
export const studentHistory = asyncHandler(async (req, res) => {
  //the id is his' so is got from the req.user don't forget
  const { id } = req.body;
  const result = await pool.query(
    `SELECT history from students WHERE student_id = ?`,
    [id]
  );
  res.json(result[0][0]);
});
