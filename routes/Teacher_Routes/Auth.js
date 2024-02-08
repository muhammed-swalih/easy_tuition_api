import express from "express";

import {
  TeacherLogin,
  TeacherRegister,
} from "../../controllers/TeacherControllers/TeacherAuthController.js";
import { protectStudent } from "../../middlewares/jwt.js";

const router = express();

router.get("/", (req, res) => {
  res.json("this is the teacher auth api");
});

router.post("/", TeacherRegister);
router.post("/login", TeacherLogin);
router.post("/",protectStudent)

export default router;
