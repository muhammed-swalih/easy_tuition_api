import mongoose from "mongoose";
const { Schema } = mongoose;

const ClassSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  classes: [{ type: String, required: true }],
});

export default mongoose.model("choosedClass", ClassSchema);
