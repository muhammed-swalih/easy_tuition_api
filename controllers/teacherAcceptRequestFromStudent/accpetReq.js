import ReqModel from "../../models/TeacheReqModelFromStudent/ReqModel.js";
import Class from "../../models/classModel/Class.js";

export const acceptClass = async (req, res) => {
  const { reqId, teacher, student, studentPersonal, studentSchool } = req.body;

  if (!reqId || !teacher || !student) {
    res.status(404).json("please fill the required feild");
    return;
  }

  const isReqExist = await Class.findOne({ reqId: reqId });
  if (isReqExist) {
    return res.status(500).json("you already accept this request");
  }

  const acceptedClass = {
    reqId: reqId,
    teacher: teacher,
    student: student,
    studentPersonal: studentPersonal,
    studentSchool: studentSchool,
  };

  try {
    const createdClass = await Class.create(acceptedClass);
    const response = await Class.findOne({ _id: createdClass._id })
      .populate("reqId")
      .populate("teacher", "-password")
      .populate("student", "-password")
      .populate("reqId.student")
      .populate("studentPersonal")
      .populate("studentSchool");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getReqFromStud = async (req, res) => {
  try {
    const requests = await ReqModel.find({ teacherId: req.user._id })
      .populate("studPersonal", "-phone")
      .populate("studSchool", "-idProof")
      .populate("studentId", "-password");

    if (!requests) {
      res.status(404).json("there is no requests");
      return;
    }

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAcceptedClass = async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id })
      .populate("teacher", "-password")
      .populate("student", "-password")
      .populate({
        path: "reqId",
        populate: {
          path: "teacherId studPersonal studSchool studentId",
        },
      });

    if (!classes) {
      res.status(404).json("currently you dont have any classes");
      return;
    }

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getExistingStudents = async (req, res) => {
  const { id } = req.params.id;
  try {
    const response = await Class.find({ teacher: req.user._id, reqId: id });
    res.status(401).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
