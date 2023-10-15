import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";
import bcrypt from "bcrypt";

//@desc returns detail of the teacher
//@route GET /api/teacher/me
//@access private
export const getMydetails = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM teacher WHERE teacher_id = ?",
    [req.user.teacher_id]
  );
  const teacherDetails = result[0][0];
  const getReviewsQuery = "SELECT * FROM reviews WHERE teacher_id = ?";
  const teacherReviews = await pool.query(getReviewsQuery, [
    req.user.teacher_id,
  ]);

  let totalRating = 0;
  for (const review of teacherReviews[0]) {
    totalRating += review.rating;
  }
  const averageRating =
    teacherReviews[0].length > 0 ? totalRating / teacherReviews[0].length : 0;
  teacherDetails.averageRating = averageRating.toFixed(1);
  res.status(200).json(teacherDetails);
});

//@desc returns all the classes of the teacher
//@route POST /api/teacher/class
//@access private
export const getMyClasses = asyncHandler(async (req, res) => {
  //the id is his' so is got from the req.user don't forget
  const { id } = req.body;
  const result = await pool.query(
    `SELECT * from class WHERE homeroom_teacher = ?`,
    [id]
  );
  res.json(result[0][0]);
});

//@desc returns all students in class
//@route GET /api/classes/:id
//@access private
export const getStudents = asyncHandler(async (req, res) => {
  //cheack with req.user and the class here....

  const { id } = req.params; // should be got from the req.user
  // Query the database to get the students JSON array from the class table
  const [rows] = await pool.query(
    "SELECT students FROM class WHERE class_id = ?",
    [id]
  );
  res.json(JSON.parse(rows[0].students));
  // maybe if i needd it;
  // if (rows.length === 0) {
  //   return res.status(404).json({ error: "Class not found" });
  // }
  // const studentsJSON = rows[0].students;
  // const studentIDs = JSON.parse(studentsJSON);

  // if (!Array.isArray(studentIDs)) {
  //   return res.status(400).json({ error: "Invalid students data" });
  // }
  // const placeholders = studentIDs.map(() => "?").join(",");
  // // Query the database to get the names of students with the specified IDs
  // const result = await pool.query(
  //   `SELECT student_id, full_name FROM students WHERE sudent_id IN (${placeholders})`,
  //   [...studentIDs]
  // );
  // res.json(result[0]);
});

//@desc  updates the marks of student
//@route PUT /api/students/marks
//@access private
export const updateStudentValue = asyncHandler(async (req, res) => {
  const datas = req.body;
  for (let data of datas) {
    let report = JSON.stringify(data.report_card);
    const [rows] = await pool.query(
      `UPDATE students SET report_card = ? WHERE student_id = ?`,
      [report, data.id]
    );
  }
  res.json({ msg: "All marks saved successfully!!" });
});

//@desc returns  student data
//@route GET /class/students/:id
//@access private
export const getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `
  SELECT s.student_id,s.full_name, s.report_card
  FROM students s
  JOIN class c ON s.class_id = c.class_id
  WHERE c.class_id = ?
`,
    [id]
  );
  res.json(result[0]);
});

//@desc returns  student data
//@route POST /class/students/
//@access private
export const getStudentData = asyncHandler(async (req, res) => {
  const { class_name } = req.body;
  const result = await pool.query(
    `
  SELECT student_id, full_name, report_card
FROM students
WHERE class_id = (SELECT class_id FROM class WHERE class_name = ?);
`,
    [class_name]
  );
  const teach = await pool.query(
    `SELECT teachers FROM class WHERE class_name = ?`,
    [class_name]
  );
  res.json({ students: result[0], teachers: teach[0][0] });
});

//@desc updates the password for teacher
//@route PUT /api/teacher/update
//@access private
export const updatePass = asyncHandler(async (req, res) => {
  const { teacher_id } = req.user;
  const { password } = req.body;
  const newpassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `UPDATE teacher SET password = ? WHERE teacher_id = ?`,
    [newpassword, teacher_id]
  );
  res.json({ msg: "Password updated successfully!!" });
});

//@desc gets all the review messages annonymously from students
//@route GET /api/teacher/myreviews
//@access private
export const myReviews = asyncHandler(async (req, res) => {
  const { teacher_id } = req.user;
  const result = await pool.query(
    `SELECT * FROM reviews WHERE teacher_id = ? ORDER BY timestamp DESC`,
    [teacher_id]
  );
  res.status(200).json(result[0]);
});
