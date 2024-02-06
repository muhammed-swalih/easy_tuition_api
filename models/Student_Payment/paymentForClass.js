import mongoose from "mongoose";

const { Schema } = mongoose;

const classPayment = new Schema({
  razorpay_order_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  paidFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentAuth",
    required: true,
  },
  paidTo: { type: mongoose.Schema.Types.ObjectId, ref: "auth", required: true },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classes",
    required: true,
  },
  paidToken: { type: String, required: true },
  tokenExpiresAt: { type: String, required: true },
});

export default mongoose.model("paymentForClass", classPayment);
