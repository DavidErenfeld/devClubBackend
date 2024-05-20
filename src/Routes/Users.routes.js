import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserByUserId,
  createUser,
  updateUserByUserId,
  deleteUserByUserId,
} from "../Controllers/Users.controller.js";
import AuthMiddleware from "../Middleware/AuthMiddleware.js";

router.get("/", AuthMiddleware, getAllUsers);
router.get("/:id", getUserByUserId);
router.post("/", createUser);
router.put("/:id", AuthMiddleware, updateUserByUserId);
router.delete("/:id", deleteUserByUserId);

export default router;
