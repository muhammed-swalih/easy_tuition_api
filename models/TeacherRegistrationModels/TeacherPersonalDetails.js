import mongoose from "mongoose";
const { Schema } = mongoose;

const PersonalSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  dob: { type: String, required: true },
  primaryLang: { type: String, required: true },
  secondaryLang: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  img: { data: Buffer, contentType: String },
  picUrl: { type: String },
});

export default mongoose.model("TeacherPersonal", PersonalSchema);
