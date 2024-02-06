import TeachChooseClass from "../../models/TeacherRegistrationModels/TeachChooseClass.js";

export const postChoosedClass = async (req, res) => {
  try {
    const { teacherId, classes } = req.body;

    if (!teacherId || !classes) {
      return res.status(500).json("please fill the required feilds");
    }

    const choosedClasses = new TeachChooseClass({
      teacherId: teacherId,
      classes: classes,
    });

    const newChoosedClasses = await TeachChooseClass.create(choosedClasses);
    const response = await TeachChooseClass.findOne({
      _id: choosedClasses._id,
    }).populate("teacherId", "-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getChoosedClass = async (req, res) => {
  try {
    const classes = await TeachChooseClass.findOne({ _id: req.user.id });
    if (!classes) {
      return res.status(404).json("you dont choose any classes");
    }
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json(error);
  }
};
