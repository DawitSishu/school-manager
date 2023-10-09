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

//@desc updates the password for student
//@route PUT /api/student/profile/update
//@access private
export const updatePass = asyncHandler(async (req, res) => {
  const { student_id } = req.user;
  const { password } = req.body;
  if (!password) {
    const err = new Error("Missing required fields");
    err.statusCode = 400;
    throw err;
  }
  const newpassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `UPDATE students SET password = ? WHERE student_id = ?`,
    [newpassword, student_id]
  );
  res.json({ msg: "Password updated successfully!!" });
});

//@desc input the profile for student
//@route post /api/student/profile/input
//@access private
export const inputProfile = asyncHandler(async (req, res) => {
  const { student_id } = req.user;
  const { password, birth_date, gender } = req.body;
  if (!password || !birth_date || !gender) {
    const err = new Error("Missing required fields");
    err.statusCode = 400;
    throw err;
  }
  const newpassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `UPDATE students SET password = ?, date_of_birth = ?, gender = ?, updated = 1 WHERE student_id = ?`,
    [newpassword, birth_date, gender, student_id]
  );

  res.json({ msg: "Profile updated successfully!" });
});

//@desc input review for a specific teacher
//@route post /api/student/review/teacher
//@access private
export const addReview = asyncHandler(async (req, res) => {
  const { teacher_id, rating, comment } = req.body;
  const student_id = req.user.student_id;

  if (!teacher_id || !rating || !comment) {
    const err = new Error("Missing required fields");
    err.statusCode = 400;
    throw err;
  }

  // Check if the user has already reviewed the same teacher
  const existingReviewQuery =
    "SELECT * FROM reviews WHERE teacher_id = ? AND student_id = ?";
  const { rows: existingReview } = await pool.query(existingReviewQuery, [
    teacher_id,
    student_id,
  ]);

  if (existingReview.length > 0) {
    const err = new Error("You have already reviewed this teacher");
    err.statusCode = 400;
    throw err;
  }
  const insertReviewQuery =
    "INSERT INTO reviews (student_id, teacher_id, rating, comment) VALUES (?, ?, ?, ?)";
  await pool.query(insertReviewQuery, [
    student_id,
    teacher_id,
    rating,
    comment,
  ]);
  res.status(201).json({ message: "Review added successfully" });
});

//@desc get a list of teachers to be reviewd
//@route get /api/student/myteachers
//@access private
export const myTeachers = asyncHandler(async (req, res) => {
  const { class_id } = req.user;
  const teacherIDsString = await pool.query(
    "SELECT teachers FROM class WHERE class_id = ?",
    [class_id]
  );

  const teacherIDsObject = JSON.parse(teacherIDsString[0][0].teachers);

  // Extract teacher IDs into an array
  const teacherIDs = Object.values(teacherIDsObject);

  // Query the teacher table to get full names
  const teacherFullNames = await Promise.all(
    teacherIDs.map(async (teacherID) => {
      const teacherData = await pool.query(
        "SELECT full_name FROM teacher WHERE teacher_id = ?",
        [teacherID]
      );
      return teacherData[0][0].full_name;
    })
  );

  // Combine the IDs and full names into a final result object
  const result = {};
  Object.keys(teacherIDsObject).forEach((subject, index) => {
    result[subject] = [teacherIDs[index], teacherFullNames[index]];
  });

  res.json(result);
});
