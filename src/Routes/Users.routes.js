import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserByUserId,
  createUser,
  updateUserByUserId,
  deleteUserByUserId,
} from "../Controllers/Users.controller.js";

router.get("/", getAllUsers);
router.get("/:id", getUserByUserId);
router.post("/", createUser);
router.put("/:id", updateUserByUserId);
router.delete("/:id", deleteUserByUserId);

export default router;
