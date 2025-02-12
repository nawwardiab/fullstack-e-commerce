import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./utils/database.js";
import usersRouter from "./routes/usersRouter.js";

import {
  globalErrorHandler,
  routeNotFound,
} from "./middleware/errorHandlers.js";
import user from "./models/User.js"

await connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/users', usersRouter);
// 
// app.use('carts', cartsRouter);
// app.use('orders', orders);  // we dont have time for these 

app.use(routeNotFound);
app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));