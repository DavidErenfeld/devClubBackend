import usersRouter from "./Routes/Users.routes.js";
import coursesRouter from "./Routes/Courses.route.js";
import authRouter from "./Routes/Auth.route.js";
import { connectToMongo } from "./Database/Utils.js";
import session from "express-session";
import passport from "passport";
import initializePassport from "./Middleware/passport-config.js";
import flash from "express-flash";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

app.use(express.json());
connectToMongo();

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/auth", authRouter);

export default app;
