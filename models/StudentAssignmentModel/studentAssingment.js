import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const assignmentSubmitSchema = new Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "studentAuth" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
  content : {type : String, required : true}
});

export default mongoose.model("assignmentSubmitions",assignmentSubmitSchema)
