import mongoose from "mongoose";

const { Schema } = mongoose;

const CsbSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  csbDetails: [{ type: Array, required: true }],
});

export default mongoose.model("csb Details", CsbSchema);
