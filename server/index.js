import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import directorRouter from "./routes/directorRoutes.js";
import studentRouter from "./routes/studentRoutes.js";


const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api", teacherRouter);
app.use("/api", directorRouter);
app.use("/api/student", studentRouter);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("running on port 5000");
});
