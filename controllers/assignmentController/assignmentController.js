import AssignmentModel from "../../models/AssignmentModel/AssignmentModel.js";
import studentAssingment from "../../models/StudentAssignmentModel/studentAssingment.js";

export const postAssignment = async (req, res) => {
  const { AssName, assHeading, content, img, assBy, to } = req.body;
  if (!AssName || !assHeading || !content || !img || !assBy || !to) {
    res.status(404).json("please fill the requierd feilds");
    return;
  }

  const newAssignment = new AssignmentModel({
    assBy: assBy,
    AssName: AssName,
    assHeading: assHeading,
    content: content,
    img: img,
    to: to,
  });

  try {
    const saveAssignment = await AssignmentModel.create(newAssignment);
    const response = await AssignmentModel.findOne({ _id: saveAssignment._id })
      .populate("to", "-password")
      .populate("assBy", "-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const submitAssignments = async (req, res) => {
  const { from, to, content } = req.body;

  if (!from || !to || !content) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  const submittedAss = new studentAssingment({
    from: from,
    to: to,
    content: content,
  });

  try {
    const submit = await studentAssingment.create(submittedAss);
    const response = await studentAssingment
      .findOne({ _id: submit._id })
      .populate("to");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSubmittedAssignmentByTeacher = async (req, res) => {
  const submitions = await studentAssingment
    .findOne({ to: req.user._id })
    .populate("from");
  if (!submitions) {
    res.status(404).json("the students is not submitt the assignments");
    return;
  }

  try {
    res.status(200).json(submitions);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAssignmentGivenByTeachers = async (req, res) => {
  //   console.log(req.user._id);
  const myAssignments = await AssignmentModel.findOne({
    to: req.user._id,
  }).populate("assBy");
  if (!myAssignments) {
    res.status(404).json("currently you have no assignments");
    return;
  }

  try {
    res.status(200).json(myAssignments);
  } catch (error) {
    res.status(500).json(error);
  }
};
