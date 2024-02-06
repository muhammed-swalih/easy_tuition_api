import express from "express";
import { paymentHolding, protect, protectStudent } from "../../middlewares/jwt.js";
import {
  createOrder,
  verifyPayment,
  verifyPaymentForClass,
} from "../../controllers/payment_controller/payment_controller.js";

const router = express();

router.post("/", protectStudent, createOrder);
router.post("/paymentverification", verifyPayment);
router.post("/paymentverificationforClass", verifyPaymentForClass);

// router.get("/",protect,paymentHolding,)

export default router;
