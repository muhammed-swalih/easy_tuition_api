import ReqModel from "../../models/TeacheReqModelFromStudent/ReqModel.js";
import Class from "../../models/classModel/Class.js";

export const postReqFromStud = async (req, res) => {
  const {
    studPersonal,
    studSchool,
    teacherId,
    studentId,
    board,
    time,
    subjects,
    cls,
  } = req.body;

  if (
    !studPersonal ||
    !studSchool ||
    !teacherId ||
    !studentId ||
    !board ||
    !time ||
    !subjects ||
    !cls
  ) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  const newReq = {
    teacherId: [teacherId],
    studPersonal: studPersonal,
    studSchool: studSchool,
    studentId: studentId,
    board: board,
    time: time,
    subjects: subjects,
    cls: cls,
  };

  try {
    const newStudent = await ReqModel.create(newReq);
    const studDetails = await ReqModel.findOne({ _id: newStudent._id })
      .populate("studPersonal", "-PrimaryPhone -SecondaryPhone")
      .populate("studSchool", "-idProof")
      .populate("teacherId", "-password")
      .populate("studentId", "-password -phone");

    res.status(200).json(studDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const showAllClassesToStudents = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("reqId")
      .populate("teacher", "-password")
      .populate("student", "-password");
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const enrollClass = async (req, res) => {
  console.log(req.paidUser);

  const myClass = await Class.findOne({ _id: req.paidUser._id });
  if (!myClass) {
    res.status(200).json("you are not paid for classes");
    return;
  }
  try {
    res.status(200).json(myClass);
  } catch (error) {
    res.status(500).json(error);
  }
};
