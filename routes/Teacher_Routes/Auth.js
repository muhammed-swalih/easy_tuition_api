import express from "express";

import {
  TeacherLogin,
  TeacherRegister,
} from "../../controllers/TeacherControllers/TeacherAuthController.js";

const router = express();

router.get("/", (req, res) => {
  res.json("this is the teacher auth api");
});

router.post("/", TeacherRegister);
router.post("/login", TeacherLogin);

export default router;
