import express from "express";
import { pool } from "./database/index.js";

const app = express();

pool.query("SELECT * from user", (err, rows, fields) => {
  console.log(rows);
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
