import express from 'express'
import { protect, protectStudent } from '../../middlewares/jwt.js';
import { getAssignmentGivenByTeachers, getSubmittedAssignmentByTeacher, postAssignment, submitAssignments } from '../../controllers/assignmentController/assignmentController.js';

const router = express();

router.post("/",protect,postAssignment)
router.post("/submit",protectStudent,submitAssignments)
router.get("/",protect,getSubmittedAssignmentByTeacher)
router.get("/takeAss",protectStudent,getAssignmentGivenByTeachers)

export default router