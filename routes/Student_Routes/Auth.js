import express from 'express'
import { studLogin, studeRegister } from '../../controllers/StudentControllers/StudAuthController.js';

const router = express();

router.get("/",(req,res)=> {
    res.json("this is the student auth endpoing")
})

router.post("/",studeRegister);
router.post("/login", studLogin)


export default router