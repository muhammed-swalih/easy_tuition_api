import mongoose from "mongoose";
const { Schema } = mongoose;

const teacherReportSchema = new Schema({
  reportReason: { type: String, required: true },
  studId: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
  studSchool: { type: mongoose.Schema.Types.ObjectId, ref: "studentSchool" },
  studPersonal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentPersonal",
  },
  reportBy: { type: mongoose.Schema.Types.ObjectId, ref: "auth"},
});

export default mongoose.model("teacherReport", teacherReportSchema);
