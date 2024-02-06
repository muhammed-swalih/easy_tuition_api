import express from "express";
import {
  getAllReportsFromStudent,
  postReportsByStudents,
} from "../../controllers/StudentControllers/StudentReportController.js";
import { protectStudent } from "../../middlewares/jwt.js";

const router = express();

router.get("/", getAllReportsFromStudent);
router.post("/", protectStudent, postReportsByStudents);

export default router;
