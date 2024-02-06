import express from 'express'
import { getCollege, postCollegeDetails } from '../../controllers/TeacherControllers/TeacherCollegeController.mjs';
import { protect } from '../../middlewares/jwt.js';

const router = express();


router.post("/",protect,postCollegeDetails)
router.get("/",protect,getCollege)

export default router