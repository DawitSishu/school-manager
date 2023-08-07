import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";
import bcrypt from "bcrypt";

//@desc returns details of director
//@route POST /api/director/me
//@access private
export const getMe = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM director WHERE director_id = ?",
    [req.user.director_id]
  );
  res.json(result[0][0]);
});

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
  const { teacher_id, class_name, subject } = req.body;
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
    let teacherData = JSON.stringify({ [subject]: teacher_id });
    const class_final = await pool.query(
      `UPDATE class SET teachers = ? WHERE class_name = ?`,
      [teacherData, class_name]
    );
  } else {
    // the subject must be got from the teacher_id
    let teacherData = JSON.stringify({
      ...JSON.parse(teachers),
      [subject]: teacher_id,
    });
    const class_final = await pool.query(
      `UPDATE class SET teachers = ? WHERE class_name = ?`,
      [teacherData, class_name]
    );
  }
  const classes = teacher_result[0][0].teaching_class;
  if (classes == null) {
    let classData = JSON.stringify([class_name]); //class_id
    const updateTeacher = await pool.query(
      `UPDATE teacher SET teaching_class = ? WHERE teacher_id = ?`,
      [classData, teacher_id]
    );
  } else {
    let parsedClasses = JSON.parse(classes);
    if (!parsedClasses.includes(class_name)) {
      parsedClasses.push(class_name);
    }
    const classData = JSON.stringify(parsedClasses);
    const updateTeacher = await pool.query(
      `UPDATE teacher SET teaching_class = ? WHERE  teacher_id = ?`,
      [classData, teacher_id]
    );
  }
  res.json({ msg: "class and teacher have been updated successfully!" });
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
  const class_id = class_result[0][0].class_id;
  const students = class_result[0][0].students;
  if (students == null) {
    // the name must be got from the student_id
    let studentData = JSON.stringify({ full_name: student_id });
    const final_class = await pool.query(
      `UPDATE class SET students = ? WHERE class_name = ?`,
      [studentData, class_name]
    );
    const final = await pool.query(
      `UPDATE students SET class_id = ? WHERE student_id = ?`,
      [class_id, student_id]
    );
  } else {
    // the name must be got from the student_id
    let studentData = JSON.stringify({
      ...JSON.parse(students),
      dx8: student_id,
    });
    const final_class = await pool.query(
      `UPDATE class SET students = ? WHERE class_name = ?`,
      [studentData, class_name]
    );
    const final = await pool.query(
      `UPDATE students SET class_id = ? WHERE student_id = ?`,
      [class_id, student_id]
    );
  }
  res.json({ msg: "class and student have been updated successfully!" });
});

//@desc returns all teachers
//@route GET /api/teacher
//@access private
export const getTeachers = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM teacher");
  res.json(result[0]);
});

//@desc returns one teacher details
//@route GET /api/teacher/:id
//@access private
export const getOneTeacher = asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM teacher WHERE teacher_id = ?",
    [req.params.id]
  );
  res.json(result[0][0]);
});

//@desc resets teacher password to 1234
//@route POST /api/teacher/reset
//@access private
export const resetTeacher = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (req.user.role != "admin") {
    const err = new Error("Not authorized to access this resource");
    err.statusCode = 401;
    throw err;
  }
  const result = await pool.query(
    "SELECT * FROM teacher WHERE teacher_id = ?",
    [id]
  );
  if (result.length === 0) {
    const err = new Error("Teacher not found");
    err.statusCode = 404;
    throw err;
  }
  const teacher = result[0];
  const hashedPassword = await bcrypt.hash("1234", 10);

  await pool.query("UPDATE teacher SET password = ? WHERE teacher_id = ?", [
    hashedPassword,
    teacher.teacher_id,
  ]);

  res
    .status(200)
    .json({ success: true, msg: "Teacher password reset successfully" });
});
