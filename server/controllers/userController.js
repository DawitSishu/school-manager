import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//@desc logs-in a user
//@route POST /api/users/login
//@access public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("All fields are required");
    err.statusCode = 400;
    throw err;
  }
  const emailExistsQuery = `
  SELECT EXISTS(SELECT 1 FROM students WHERE email = ?) AS studentExists,
         EXISTS(SELECT 1 FROM teacher WHERE email = ?) AS teacherExists,
         EXISTS(SELECT 1 FROM director WHERE email = ?) AS directorExists
`;

  const [result] = await pool.query(emailExistsQuery, [email, email, email]);

  const { studentExists, teacherExists, directorExists } = result[0];
  let user;
  if (studentExists) {
    var [studentRow] = await pool.query(
      "SELECT * FROM students WHERE email = ?",
      [email]
    );
    user = studentRow[0];
  } else if (teacherExists) {
    var [teacherRow] = await pool.query(
      "SELECT * FROM teacher WHERE email = ?",
      [email]
    );
    user = teacherRow[0];
  } else if (directorExists) {
    var [directorRow] = await pool.query(
      "SELECT * FROM director WHERE email = ?",
      [email]
    );
    user = directorRow[0];
  } else {
    const err = new Error("Incorrect Email or Password");
    err.statusCode = 401;
    throw err;
  }
  if (!user || user.length === 0) {
    const err = new Error("Incorrect Email or Password");
    err.statusCode = 401;
    throw err;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    const err = new Error("Incorrect Email or Password");
    err.statusCode = 401;
    throw err;
  }
  const { password: omitPassword, ...userData } = user;

  const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: "1d" });
  console.log(token);
  res.json({
    token,
    role: user.role,
  });
});

//@desc creates a user
//@route POST /api/users/signup
//@access private
export const createUser = asyncHandler(async (req, res) => {
  const { email, password, role, subjects, full_name, birth_date, gender } =
    req.body;

  if (req.user.role != role) {
    const error = new Error("Not authorized to access this resource");
    error.statusCode = 400;
    throw error;
  }

  if (!email || !password || !role || !full_name || !gender) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  if (role != "student" && role != "teacher") {
    console.log(role == "teacher");
    const error = new Error("User must be a student or a teacher");
    error.statusCode = 400;
    throw error;
  }
  var type =
    role == "student" ? "students" : role == "teacher" ? "teacher" : null;
  var type2 =
    role == "student" ? "teacher" : role == "teacher" ? "students" : null;
  const [rows] = await pool.query(`SELECT * FROM ${type} WHERE email = ?`, [
    email,
  ]);
  const [cols] = await pool.query(`SELECT * FROM ${type2} WHERE email = ?`, [
    email,
  ]);
  if (rows && rows.length > 0 && cols && cols.length > 0) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    if (role == "teacher") {
      const subjectStr = JSON.stringify(subjects);
      const sql = `INSERT INTO ${type} (email, password,full_name,subject,gender) VALUES (?, ?, ?, ?, ?)`;
      const values = [email, hashedPassword, full_name, subjectStr, gender];
      const [result] = await pool.query(sql, values);
    } else {
      const sql = `INSERT INTO ${type} (email, password,full_name,date_of_birth,gender) VALUES (?, ?, ?, ?, ?)`;
      const values = [email, hashedPassword, full_name, birth_date, gender];
      const [result] = await pool.query(sql, values);
    }
    res.status(201).json({
      msg: "user has been created succesfully",
    });
  }
});

//@desc creates a user
//@route get /api/users
//@access private
export const checkUser = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!role || req.user.role === role) {
    const error = new Error("Not authorized to access this resource");
    error.statusCode = 400;
    throw error;
  }
  res.json(role);
});
