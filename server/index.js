import express from "express";
import  errorHandler  from "./middlewares/errorHandler.js";
import  userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";


const app = express();
dotenv.config();


app.use(express.json())


app.use('/api/users',userRouter );
app.use(errorHandler);



app.listen(5000, () => {
  console.log("running on port 5000");
});
