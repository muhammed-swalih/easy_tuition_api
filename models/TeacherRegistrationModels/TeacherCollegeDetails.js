import mongoose from "mongoose";

const { Schema } = mongoose;

const CollegeSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  collegeName: { type: String, required: true },
  colAddress: { type: String, required: true },
  courses: { type: String, required: true },
  currentYear: { type: String, required: true },
  joined: { type: String, required: true },
  passOutYear: { type: String, required: true },
  collegeId: { data: Buffer, contentType: String },
  picUrl: { type: String },
});

export default mongoose.model("TeacherCollege", CollegeSchema);
