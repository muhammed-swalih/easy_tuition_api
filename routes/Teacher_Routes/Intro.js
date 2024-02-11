import express from "express";
import { protect, protectStudent } from "../../middlewares/jwt.js";
import {
  getAllIntro,
  getIntro,
  getTeachIntroForStudent,
  postIntro,
} from "../../controllers/TeacherControllers/TeachIntroController.mjs";

const router = express();

router.post("/", protect, postIntro);
router.get("/", protect, getIntro);
router.get("/all", protectStudent, getAllIntro);
router.get("/:id", protectStudent, getTeachIntroForStudent);

export default router;
