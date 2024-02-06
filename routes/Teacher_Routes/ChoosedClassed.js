import express from "express";
import { protect } from "../../middlewares/jwt.js";
import {
  getChoosedClass,
  postChoosedClass,
} from "../../controllers/TeacherControllers/TeacherChoosedClassController.js";

const router = express();

router.post("/", protect, postChoosedClass);
router.get("/", protect, getChoosedClass);

export default router
