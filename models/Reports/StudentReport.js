import mongoose from "mongoose";
const { Schema } = mongoose;

const studentReportSchema = new Schema({
  reportReason: { type: String, required: true },
  teachId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  teachPersonal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherPersonal",
  },
  teachCollege: { type: mongoose.Schema.Types.ObjectId, ref: "TeacherCollege" },
  reportBy: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
});

export default mongoose.model("studentReport", studentReportSchema);
