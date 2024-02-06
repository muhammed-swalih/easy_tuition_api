import express from 'express'
import { getBank, postBankDetails } from '../../controllers/TeacherControllers/TeacherBankControllers.js';
import { protect } from '../../middlewares/jwt.js';

const router = express();


router.post("/",protect,postBankDetails)
router.get("/",protect,getBank)
export default router