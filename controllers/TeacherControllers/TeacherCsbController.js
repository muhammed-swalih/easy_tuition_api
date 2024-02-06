import TeacherCbsModel from "../../models/TeacherRegistrationModels/TeacherCbsModel.js";

export const postCsb = async (req, res) => {
  const { teacherId, csbDetails } = req.body;

  const csb = new TeacherCbsModel({
    teacherId: teacherId,
    csbDetails: csbDetails,
  });

  try {
    const newCsb = await TeacherCbsModel.create(csb);
    const response = await TeacherCbsModel.findOne({
      _id: newCsb._id,
    }).populate("teacherId", "-password");

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCsbOfTeacher = async (req, res) => {
  try {
    const response = await TeacherCbsModel.findOne({
      teacherId: req.user.id,
    }).populate("teacherId", "-password");
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
