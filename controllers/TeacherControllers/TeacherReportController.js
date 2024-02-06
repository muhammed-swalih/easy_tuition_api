import TeacherReport from "../../models/Reports/TeacherReport.js";

export const getAllReportsFromTeacher = async (req, res) => {
  const allReportsByTeachers = await TeacherReport.find()
    .populate("studId", "-password")
    .populate("studSchool")
    .populate("studPersonal")
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

export const postReportByTeacher = async (req, res) => {
  const { reportReason, studId, studSchool, studPersonal, reportBy } = req.body;
  if (!reportReason || !studId || !studSchool || !studPersonal || !reportBy) {
    return res.status(404).json("please fill the required feilds");
  }

  const newReport = new TeacherReport({
    reportReason: reportReason,
    studId: studId,
    studSchool: studSchool,
    studPersonal: studPersonal,
    reportBy: reportBy,
  });

  try {
    const newSavedReport = await TeacherReport.create(newReport);
    const response = await TeacherReport.findOne({ _id: newSavedReport._id })
      .populate("studId", "-password")
      .populate("studSchool")
      .populate("studPersonal")
      .populate("reportBy", "-password");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
