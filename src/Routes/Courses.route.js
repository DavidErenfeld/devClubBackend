import express from "express";
const router = express.Router();
import {
  getAllCourses,
  getCourseByCourseId,
  createCourse,
  updateCourseByCourseId,
  deleteCourseByCourseId,
} from "../Controllers/Courses.controller.js";

router.get("/", getAllCourses);
router.get("/:id", getCourseByCourseId);
router.post("/", createCourse);
router.put("/:id", updateCourseByCourseId);
router.delete("/:id", deleteCourseByCourseId);

export default router;
