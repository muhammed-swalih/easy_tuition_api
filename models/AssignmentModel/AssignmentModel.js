import mongoose from "mongoose";

const { Schema } = mongoose;

const assignmentSchema = new Schema({
  assBy: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  AssName: { type: String, required: true },
  assHeading: { type: String, required: true },
  content: { type: String, required: true },
  img: { type: String, required: true },
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" }],
});

export default mongoose.model("assignment", assignmentSchema);
