import StudentReport from "../../models/Reports/StudentReport.js";
import TeacherReport from "../../models/Reports/TeacherReport.js";

export const getAllReportsFromStudent = async (req, res) => {
  const allReportsByTeachers = await StudentReport.find()
    .populate("teachId", "-password")
    .populate("teachCollege")
    .populate("teachPersonal")
    .populate("reportBy", "-password");

  if (allReportsByTeachers.length == 0) {
    return res.status(200).json("no reports are submitted!");
  }
  try {
    res.status(200).json(allReportsByTeachers);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const postReportsByStudents = async (req, res) => {
  const { reportReason, teachId, teachCollege, teachPersonal, reportBy } =
    req.body;
  if (
    !reportReason ||
    !teachId ||
    !teachCollege ||
    !teachPersonal ||
    !reportBy
  ) {
    return res.status(404).json("please fill the required feilds");
  }

  const newReport = new StudentReport({
    reportReason: reportReason,
    teachId: teachId,
    teachCollege: teachCollege,
    teachPersonal: teachPersonal,
    reportBy: reportBy,
  });

  try {
    const newSavedReport = await StudentReport.create(newReport);
    const response = await StudentReport.findOne({ _id: newReport._id })
      .populate("teachId", "-password")
      .populate("teachCollege")
      .populate("teachPersonal")
      .populate("reportBy", "-password");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
