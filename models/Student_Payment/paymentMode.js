import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema({
  razorpay_order_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
  paidFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentAuth",
    required: true,
  },
  paidTo: { type: mongoose.Schema.Types.ObjectId, ref: "auth", required: true },
  webinarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "webinarModel",
    required: true,
  },
  paidToken: { type: String, required: true },
  tokenExpiresAt: { type: Date, required: true },
});

export default mongoose.model("payment", paymentSchema);
