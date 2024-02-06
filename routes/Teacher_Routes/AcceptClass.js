import express from 'express'
import { protect } from '../../middlewares/jwt.js';
import { acceptClass, getAcceptedClass } from '../../controllers/teacherAcceptRequestFromStudent/accpetReq.js';

const router = express();

router.post("/",protect,acceptClass)
router.get("/",protect,getAcceptedClass)



export default router