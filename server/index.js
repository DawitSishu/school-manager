import express from "express";

// import { errorHandler } from "./middlewares/errorHandler.js";
import  userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json())


app.use('/api/users',userRouter );


// app.use(errorHandler);

app.listen(5000, () => {
  console.log("running on port 5000");
});
