import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";

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
      `SELECT user_id, username FROM user WHERE user_id IN (${placeholders})`,
      [...studentIDs]
    );
    res.json(result[0]);
  } catch (error) {
    console.error("Error getting students:", error);
    res.status(500).json({ error: "Error getting students" });
  }
});
