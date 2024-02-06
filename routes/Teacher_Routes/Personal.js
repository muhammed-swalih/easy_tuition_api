import express from "express";
import {
  getAllTeacher,
  getPersonal,
  postPersonal,
} from "../../controllers/TeacherControllers/TeacherPersonlController.mjs";
import { protect, protectStudent } from "../../middlewares/jwt.js";

const router = express();

router.post("/", protect, postPersonal);
router.get("/", protect, getPersonal);
router.get("/all", protectStudent, getAllTeacher);

export default router;
