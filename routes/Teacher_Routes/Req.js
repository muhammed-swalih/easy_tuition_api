import express from "express";
import {
  paymentHoldingForClass,
  protect,
  protectStudent,
} from "../../middlewares/jwt.js";
import {
  enrollClass,
  postReqFromStud,
  showAllClassesToStudents,
} from "../../controllers/studentRequestController/ReqController.js";
import {
  acceptClass,
  getAcceptedClass,
  getReqFromStud,
} from "../../controllers/teacherAcceptRequestFromStudent/accpetReq.js";

const router = express();

router.post("/", protectStudent, postReqFromStud);
router.post("/acceptClass", protect, acceptClass);
router.get("/", protect, getReqFromStud);
router.get("/acceptedClassesFromStudent", protect, getAcceptedClass);
router.get("/getAllClasses", protectStudent, showAllClassesToStudents);
router.get(
  "/enrollClasses",
  protectStudent,
  paymentHoldingForClass,
  enrollClass
);

export default router;
