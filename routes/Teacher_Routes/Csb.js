import express from "express";
import { protect, protectStudent } from "../../middlewares/jwt.js";
import {
  getCsbOfTeacher,
  postCsb,
} from "../../controllers/TeacherControllers/TeacherCsbController.js";

const router = express();

router.post("/", protect, postCsb);
router.get("/", protectStudent, getCsbOfTeacher);

export default router
