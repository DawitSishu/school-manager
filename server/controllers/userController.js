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
  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  const user = rows[0];
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
  });
});

//@desc creates a user
//@route POST /api/users/signup
//@access private
export const createUser = asyncHandler(async (req, res) => {
  const { email, password, username, role } = req.body;

  if (!email || !password || !username || !role) {
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

  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  console.log(rows.length);
  if (rows && rows.length > 0) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create a new user object
    const query =
      "INSERT INTO user (email, password, username, role) VALUES (?, ?, ?, ?)";
    const values = [email, hashedPassword, username, role];
    const [result] = await pool.query(query, values);

    res.status(201).json({
      msg: "user has been created succesfully",
    });
  }
});
