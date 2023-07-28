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

//@desc assigns teacher to a class with subject
//@route POST /api/classes/teacher
//@access private
export const teacherToClass = asyncHandler(async (req, res) => {
  const { teacher_id, class_name } = req.body;
  const class_result = await pool.query(
    `SELECT * FROM class WHERE class_name = (?)`,
    [class_name]
  );
  const teacher_result = await pool.query(
    `SELECT * FROM teacher WHERE teacher_id = ?`,
    [teacher_id]
  );

  if (
    class_result[0].length <= 0 ||
    teacher_result[0].length <= 0 ||
    !teacher_result ||
    !class_result
  ) {
    const err = new Error("Incorrect name_of_class or id_of_teacher");
    err.statusCode = 401;
    throw err;
  }
  const teachers = class_result[0][0].teachers;
  if (teachers == null) {
    // the subject must be got from the teacher_id
    let teacherData = JSON.stringify({ math: teacher_id });
    const class_result = await pool.query(
      `UPDATE class SET teachers = ? WHERE class_name = ?`,
      [teacherData, class_name]
    );
    res.json(class_result);
  } else {
    // the subject must be got from the teacher_id
    let teacherData = JSON.stringify({
      ...JSON.parse(teachers),
      bio: teacher_id,
    });
    const class_result = await pool.query(
      `UPDATE class SET teachers = ? WHERE class_name = ?`,
      [teacherData, class_name]
    );
    res.json(class_result);
  }
});

//@desc assigns student to a class with subject
//@route POST /api/classes/student
//@access private
export const studentToClass = asyncHandler(async (req, res) => {
  const { student_id, class_name } = req.body;
  const class_result = await pool.query(
    `SELECT * FROM class WHERE class_name = ?`,
    [class_name]
  );
  const student_result = await pool.query(
    `SELECT * FROM students WHERE student_id = ?`,
    [student_id]
  );
  if (
    class_result[0].length <= 0 ||
    student_result[0].length <= 0 ||
    !student_result ||
    !class_result
  ) {
    const err = new Error("Incorrect name_of_class or id_of_student");
    err.statusCode = 401;
    throw err;
  }
  const students = class_result[0][0].students;
  console.log(students);
  if (students == null) {
    // the name must be got from the student_id
    let studentData = JSON.stringify({ full_name: student_id });
    const class_result = await pool.query(
      `UPDATE class SET students = ? WHERE class_name = ?`,
      [studentData, class_name]
    );
    res.json(class_result);
  } else {
    // the name must be got from the student_id
    let studentData = JSON.stringify({
      ...JSON.parse(students),
      dx8: student_id,
    });
    // console.log(studentData);
    const class_result = await pool.query(
      `UPDATE class SET students = ? WHERE class_name = ?`,
      [studentData, class_name]
    );
    res.json(class_result);
  }
});

//@desc returns all teachers
//@route GET /api/teacher
//@access private
export const getTeachers = asyncHandler(async (req, res) => {
    const result = await pool.query('SELECT * FROM teacher');
    res.json(result[0]);
});
