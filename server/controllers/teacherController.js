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
  try {
    const { id } = req.params; // should be got from the req.user
    // Query the database to get the students JSON array from the class table
    const [rows] = await pool.query(
      "SELECT students FROM class WHERE class_id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Class not found" });
    }
    const studentsJSON = rows[0].students;
    const studentIDs = JSON.parse(studentsJSON);

    if (!Array.isArray(studentIDs)) {
      return res.status(400).json({ error: "Invalid students data" });
    }
    const placeholders = studentIDs.map(() => "?").join(",");
    // Query the database to get the names of students with the specified IDs
    const result = await pool.query(
      `SELECT student_id, full_name FROM students WHERE sudent_id IN (${placeholders})`,
      [...studentIDs]
    );
    res.json(result[0]);
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({ error: "Error getting students" });
  }
});

//@desc returns all students in class
//@route Post /api/students/:id
//@access private
export const updateStudentValue = asyncHandler(async (req, res) => {
  const data = JSON.stringify(req.body); // must be encrypted
  // Assuming you have a function to save the updated student record back to the database
  const result = await pool.query(
    "UPDATE students SET report_card = ? WHERE user_id = ?",
    [data, id]
  );

  // Respond with the updated student record as the response
  res.json(student);
  console.log(data);
});
