import express from "express";
import {
  getAllTeacher,
  getPersonal,
  getTeacherByFiltering,
  postPersonal,
} from "../../controllers/TeacherControllers/TeacherPersonlController.mjs";
import { protect, protectStudent } from "../../middlewares/jwt.js";

const router = express();

router.post("/", protect, postPersonal);
router.get("/", protect, getPersonal);
router.get("/all", protectStudent, getAllTeacher);
router.post("/filter", protectStudent, getTeacherByFiltering);

export default router;
