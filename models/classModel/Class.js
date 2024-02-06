import mongoose from "mongoose";

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    reqId: { type: mongoose.Schema.Types.ObjectId, ref: "studentRequest" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
  },
  { timestamps: true }
);

export default mongoose.model("classes", classSchema);
