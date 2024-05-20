import AuthController from "../Controllers/Auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);

router.post("/logout", AuthController.logout);

export default router;
