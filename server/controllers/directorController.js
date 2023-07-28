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
//@route POST /api/classes/teacher
//@access private
export const teacherToClass = asyncHandler(async (req, res) => {
    const { teacher_id,class_name } = req.body;
    const class_result = await pool.query(`SELECT * FROM class WHERE class_name = (?)`, [
      class_name,
    ]);
    const teacher_result = await  pool.query(`SELECT * FROM teacher WHERE teacher_id = (?)`, [
      teacher_id,
    ]);

    if (class_result[0].length <= 0 || teacher_result[0].length <= 0 || !teacher_result || !class_result){
      const err = new Error("Incorrect name_of_class or id_of_teacher");
    err.statusCode = 401;
    throw err;
    }
    const teachers = class_result[0][0].teachers;
    if(teachers == null){
      // the subject must be got from the teacher_id
      let teacherData = JSON.stringify({math : teacher_id});
      const class_result = await pool.query(`UPDATE class SET teachers = ? WHERE class_name = ?`, [
        teacherData,
        class_name
      ]);
      res.json(class_result);
    }else {
      // the subject must be got from the teacher_id
      // let teachersFinal = teachers.map(teacher => JSON.parse(teacher));
      // console.log(JSON.parse(teachers));
      let teacherData =JSON.stringify([JSON.parse(teachers),{bio : teacher_id}]);
      const class_result = await pool.query(`UPDATE class SET teachers = ? WHERE class_name = ?`, [
        teacherData,
        class_name
      ]);
      res.json(class_result);
    }
  });