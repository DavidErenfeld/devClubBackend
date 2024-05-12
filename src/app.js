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
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

initializePassport(passport);

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/auth", authRouter);
app.get("/login", (req, res) => {
  res.send(req.body);
});
export default app;
