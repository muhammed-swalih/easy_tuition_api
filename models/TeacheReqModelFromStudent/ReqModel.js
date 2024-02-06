import mongoose from "mongoose";

const { Schema } = mongoose;

const ReqSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  studPersonal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentPersonal",
  },
  studSchool: { type: mongoose.Schema.Types.ObjectId, ref: "studentSchool" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
  board: { type: String, required: true },
  time: { type: String, required: true },
  subjects: [{ type: String, required: true }],
});

export default mongoose.model("studentRequest", ReqSchema);
