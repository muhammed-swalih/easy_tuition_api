import mongoose from "mongoose";

const { Schema } = mongoose;

const webinarSchema = new Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  date: { type: String, required: true }, // Change the data type to Date
  StartingTime: { type: String, required: true }, // Change the data type to Date
  endingTime: { type: String, required: true }, // Change the data type to Date
  topic: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  amount: { type: String, required: true },
});

export default mongoose.model("webinarModel", webinarSchema);
