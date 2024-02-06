import mongoose from "mongoose";
const { Schema } = mongoose;

const BankSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  bankHolderName: { type: String, required: true },
  bankName: { type: String, required: true },
  accNo: { type: String, required: true },
  ifsc: { type: String, required: true },
});

export default mongoose.model("TeacherBank", BankSchema);
