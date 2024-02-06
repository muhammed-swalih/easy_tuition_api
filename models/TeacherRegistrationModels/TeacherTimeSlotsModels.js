import mongoose from "mongoose";
const { Schema } = mongoose;

const TimeSlotSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  am: [{ type: String, required: true }],
  pm: [{ type: String, required: true }],
});

export default mongoose.model("TeacherTimeSlots", TimeSlotSchema);
