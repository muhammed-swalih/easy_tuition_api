import express from "express";
import {
  getAllReportsFromTeacher,
  postReportByTeacher,
} from "../../controllers/TeacherControllers/TeacherReportController.js";
import { protect } from "../../middlewares/jwt.js";

const router = express();

router.get("/", getAllReportsFromTeacher);
router.post("/", protect, postReportByTeacher);

export default router;
