import asyncHandler from 'express-async-handler';
import { pool } from "../database/index.js";


//@desc logs-in a user
//@route POST /api/users/login
//@access public
export const loginUser = asyncHandler(async(req,res) => {
    pool.query("SELECT * from user", (err, rows, fields) => {
        console.log(rows);
        res.json(rows)
    });    
})