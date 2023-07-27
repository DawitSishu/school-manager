import asyncHandler from "express-async-handler";
import { pool } from "../database/index.js";
import jwt from "jsonwebtoken";

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
  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
  const user = rows[0];
  if (!user ||  user.length === 0) {
    const err = new Error("Incorrect Email or Password");
    err.statusCode = 401;
    throw err;
  }
//   const isPasswordMatch = await bcrypt.compare(password, user.password);
//   if (!isPasswordMatch) {
//     const err = new Error("Incorrect Email or Password");
//     err.statusCode = 401;
//     throw err;
//   }
  const { password: omitPassword, ...userData } = user;

  const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: "1d" });
  console.log(token);
  res.json({
    token,
  });
});
