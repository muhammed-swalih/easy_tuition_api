import express from "express";
import { protect, protectStudent } from "../../middlewares/jwt.js";
import {
  getCsbOfTeacher,
  postCsb,
} from "../../controllers/TeacherControllers/TeacherCsbController.js";
import { getFilteredTeachered } from "../../controllers/TeacherControllers/TeacherFilterController.js";

const router = express();

router.post("/", protect, postCsb);
router.get("/", protectStudent, getCsbOfTeacher);
router.post("/filter", protectStudent, getFilteredTeachered);

export default router;
