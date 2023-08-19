import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";
import bcrypt from "bcrypt";

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

//@desc updates the password for teacher
//@route PUT /api/student/profile/update
//@access private
export const updatePass = asyncHandler(async (req, res) => {
  const { student_id } = req.user;
  const { password } = req.body;
  const newpassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `UPDATE students SET password = ? WHERE student_id = ?`,
    [newpassword, student_id]
  );
res.json({msg:"Password updated successfully!!"});
});

