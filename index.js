import express from "express";

//importing routers

// importing Teacher routes
import TeacherAuth from "./routes/Teacher_Routes/Auth.js";
import teacherPersonal from "./routes/Teacher_Routes/Personal.js";
import teacherCollege from "./routes/Teacher_Routes/College.js";
import teacherBank from "./routes/Teacher_Routes/Bank.js";
import teacherReq from "./routes/Teacher_Routes/Req.js";
import teachAccept from "./routes/Teacher_Routes/AcceptClass.js";
import teachWebinar from "./routes/Teacher_Routes/webinar.js";
import payment from "./routes/Payement_routes/payment.js";
import assignment from "./routes/Teacher_Routes/Assignment.js";
import createClass from "./routes/Teacher_Routes/Req.js";
import postReportByTeacher from "./routes/Teacher_Routes/Reports.js";
import chooseClass from "./routes/Teacher_Routes/ChoosedClassed.js";
import teacherTimeSlot from "./routes/Teacher_Routes/TimeSlots.js";
import teacherIntro from "./routes/Teacher_Routes/Intro.js";
import TeacherCsb from "./routes/Teacher_Routes/Csb.js";

// importing student routes
import studAuth from "./routes/Student_Routes/Auth.js";
import studPersonal from "./routes/Student_Routes/Personal.js";
import studSchool from "./routes/Student_Routes/School.js";
import studParent from "./routes/Student_Routes/Parent.js";
import postReportsByStudents from "./routes/Student_Routes/Reports.js";

//importing dependencies
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Razorpay from "razorpay";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

//Teacher endpoints
app.use("/teachAuth", TeacherAuth);
app.use("/teachPersonal", teacherPersonal);
app.use("/teachCollege", teacherCollege);
app.use("/teachBank", teacherBank);
app.use("/teachReq", teacherReq);
app.use("/teachAcc", teachAccept);
app.use("/teachWebinar", teachWebinar);
app.use("/assignment", assignment);
app.use("/teacherReport", postReportByTeacher);
app.use("/chooseClass", chooseClass);
app.use("/teachTimeSlot", teacherTimeSlot);
app.use("/teachIntro", teacherIntro);
app.use("/teachCsb", TeacherCsb );

app.use("/payment", payment);
app.use("/createClass", createClass);

//students endpoints
app.use("/studAuth", studAuth);
app.use("/studPersonal", studPersonal);
app.use("/studSchool", studSchool);
app.use("/studParent", studParent);
app.use("/studentReport", postReportsByStudents);

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is successfully connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongodb is connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongodb is disconnected");
});

app.listen(3005, () => {
  console.log("listening");
  connect();
});

app.get("/", (req, res) => {
  res.json("this is the backend page");
});
