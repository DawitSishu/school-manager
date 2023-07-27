import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";

//@desc creates a class
//@route POST /api/classes
//@access private
export const createClass = asyncHandler(async (req, res) => {
  const { class_name } = req.body;
  const result = await pool.query(`INSERT INTO class (class_name) VALUES (?)`, [
    class_name,
  ]);
  res.json({ msg: `Class successfully created!` });
});



//dave ezi na
//@desc assigns teacher to a class with subject
//@route POST /api/student
//@access private
export const teacherToClass = asyncHandler(async (req, res) => {
    const { class_name } = req.body;
    const result = await pool.query(`INSERT INTO class (class_name) VALUES (?)`, [
      class_name,
    ]);
    res.json({ msg: `Class successfully created!` });
  });