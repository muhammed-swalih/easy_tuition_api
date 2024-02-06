import mongoose from "mongoose";

const { Schema } = mongoose;

const IntroSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  intro: { type: String, required: true },
  vid: { data: Buffer, contentType: String },
  picUrl: { type: String },
});

export default mongoose.model("teacherIntro", IntroSchema);


