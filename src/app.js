import usersRouter from "./Routes/Users.routes.js";
import coursesRouter from "./Routes/Courses.route.js";
import authRouter from "./Routes/Auth.route.js";
import { connectToMongo } from "./Database/Utils.js";
import express from "express";
const app = express();

app.use(express.json());

connectToMongo();

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/auth", authRouter);

export default app;
