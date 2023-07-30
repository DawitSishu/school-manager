import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";

//@desc returns all the classes of the teacher
//@route GET /api/teacher/class
//@access private
export const getMyClasses = asyncHandler(async (req, res) => {
  //the id is his' so is got from the req.user don't forget
  const { id } = req.body;
  const result = await pool.query(
    `SELECT teaching_class from teacher WHERE teacher_id = ?`,
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

//@desc  updates the subjects of a class
//@route PUT /api/students/:id   ? if all no id
//@access private
export const updateStudentValue = asyncHandler(async (req, res) => {
  //update all at once;
  // async function updateStudentsTable(data) {
  //   for (const item of data) {
  //     const { subj, stud_id } = item;
  //     try {
  //       await pool.query('UPDATE students SET subj = ? WHERE student_id = ?', [subj, stud_id]);
  //       console.log(`Updated student with ID ${stud_id}`);
  //     } catch (error) {
  //       console.error(`Error updating student with ID ${stud_id}: ${error.message}`);
  //     }
  //   }
  // }

  //update one at a time
  // on the front end restrict it to input only one subject;
  const data = JSON.stringify(req.body); // must be encrypted

  //cheack with req.user and the class here....
  const { id } = req.params; // should be got from the req.user
  // Query the database to get the students JSON array from the class table
  const [rows] = await pool.query(
    `UPDATE students SET report_card = ? WHERE  student_id = ?`,
    [data, id]
  );
  // res.json(JSON.parse(rows[0].students));
  // Respond with the updated student record as the response
  // res.json(student);
  console.log(rows);
});

//@desc returns the specific student data
//@route GET /api/student/:id
//@access private
export const getStudent = asyncHandler(async (req, res) => {
  //the id is his' so is got from the req.user don't forget
  const { id } = req.params;
  const result = await pool.query(
    `SELECT * from students WHERE student_id = ?`,
    [id]
  );
  res.json(result[0][0]);
});
