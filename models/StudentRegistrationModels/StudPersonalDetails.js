import mongoose from "mongoose";
const { Schema } = mongoose;

const PersonalSchema = new Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  primaryLang: { type: String, required: true },
  secondaryLang: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  img: { data: Buffer, contentType: String },
  picUrl: { type: String },
});

export default mongoose.model("studentPersonal", PersonalSchema);
