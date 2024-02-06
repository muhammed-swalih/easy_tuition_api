import express from 'express'
import { protect, protectStudent } from '../../middlewares/jwt.js';
import { getSchool, postStudSchool } from '../../controllers/StudentControllers/StudSchoolController.mjs';

const router = express();

router.post('/',protectStudent,postStudSchool)
router.get("/",protectStudent,getSchool)

export default router