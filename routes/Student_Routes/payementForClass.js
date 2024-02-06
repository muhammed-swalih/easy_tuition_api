import express from 'express'
import { paymentHolding, protect, protectStudent } from '../../middlewares/jwt';
import { createOrder } from '../../controllers/payment_controller/payment_controller';

const router = express();

router.post('/',protectStudent,createOrder)
router.get('/',protectStudent,paymentHolding)