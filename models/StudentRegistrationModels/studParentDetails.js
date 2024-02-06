import mongoose from "mongoose";
const { Schema } = mongoose;

const parentSchema = new Schema({
  studentId: { type: String, required: true },
  parentName: { type: String, required: true },
  guardian: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model("parentSchema", parentSchema);
