import express from "express";
import { pool } from "./database/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

pool.query("SELECT * from user", (err, rows, fields) => {
    console.log(rows);
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log("running on port 5000");
});
