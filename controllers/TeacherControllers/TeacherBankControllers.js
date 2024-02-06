import TeacherBank from "../../models/TeacherRegistrationModels/TeacherBank.js";

export const postBankDetails = async (req, res) => {
  const { bankHolderName, bankName, accNo, ifsc, teacherId } = req.body;

  if (!bankHolderName || !bankName || !accNo || !ifsc, !teacherId) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  const bankExist = await TeacherBank.findOne({ accNo });
  if (bankExist) {
    res.status(500).json("this bank is already is connected");
    return;
  }

  const bankDetails = new TeacherBank({
    teacherId : teacherId,
    bankHolderName: bankHolderName,
    bankName: bankName,
    accNo: accNo,
    ifsc: ifsc,
  });

  try {
    const newBankDetails = await TeacherBank.create(bankDetails);
    const response = await TeacherBank.findOne({
      _id: newBankDetails._id,
    }).populate("teacherId", "-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBank = async (req, res) => {
  const teacherBank = await TeacherBank.findOne({
    teacherId: req.user._id,
  });

  if (!teacherBank) {
    res.status(404).json("please upload your bank details");
    return;
  }

  try {
    res.status(200).json(teacherBank);
  } catch (error) {
    res.status(500).json(error);
  }
};
