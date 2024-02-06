 import express from 'express'
import { protect, protectStudent } from '../../middlewares/jwt.js';
import { getParents, postStudParent } from '../../controllers/StudentControllers/StudentParentController.js';

 const router = express();

 router.post("/",protectStudent,postStudParent)
 router.get("/",protectStudent,getParents)
 
 export default router;