import AuthController from "../Controllers/Auth.controller.js";
import express from "express";
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login");
router.post("/logout");

export default router;
