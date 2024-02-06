import studParentDetails from "../../models/StudentRegistrationModels/studParentDetails.js";

export const postStudParent = async (req, res) => {
  const { guardian, email, phone, parentName, studentId } = req.body;

  const isAlreadyExist = await studParentDetails.findOne({
    studentId: req.user.id,
  });
  if (isAlreadyExist) {
    return res.status(500).json("you already uploadedn your parent details");
  }

  if (!guardian || !email || !phone || !parentName || !studentId) {
    res.status(404).json("please fill the required feild");
    return;
  }

  const parent = new studParentDetails({
    studentId: studentId,
    parentName: parentName,
    guardian: guardian,
    email: email,
    phone: phone,
  });

  try {
    const newParentDetails = await studParentDetails.create(parent);
    const response = await studParentDetails
      .findOne({
        _id: newParentDetails._id,
      })
      .populate("studentId", "-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

export const getParents = async (req, res) => {
  const parent = await studParentDetails.findOne({ studentId: req.user._id });
  if (!parent) {
    res.status(404).json("please upload your parent details");
    return;
  }

  try {
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json(error);
  }
};
