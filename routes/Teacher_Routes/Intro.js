import express from "express";
import { protect, protectStudent } from "../../middlewares/jwt.js";
import {
  getAllIntro,
  getIntro,
  postIntro,
} from "../../controllers/TeacherControllers/TeachIntroController.mjs";

const router = express();

router.post("/", protect, postIntro);
router.get("/", protect, getIntro);
router.get("/all", protectStudent, getAllIntro);

export default router;
