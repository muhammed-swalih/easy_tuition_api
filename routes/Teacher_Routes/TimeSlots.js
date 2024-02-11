import express from "express";
import { protect, protectStudent } from "../../middlewares/jwt.js";
import {
  getAllTimeSlots,
  getTeacherAvailableTimeForStudent,
  getTimeSlotOfTeacher,
  postTimeSlots,
} from "../../controllers/TeacherControllers/TeacherTimeSlotController.js";

const router = express();

router.post("/", protect, postTimeSlots);
router.get("/", protect, getTimeSlotOfTeacher);
router.get("/allTime", protectStudent, getAllTimeSlots);
router.get("/:id", protectStudent, getTeacherAvailableTimeForStudent);

export default router;
