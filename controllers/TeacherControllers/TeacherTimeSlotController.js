import TeacherTimeSlotsModels from "../../models/TeacherRegistrationModels/TeacherTimeSlotsModels.js";

export const postTimeSlots = async (req, res) => {
  const { teacherId, am, pm } = req.body;

  if ((!teacherId, !am, !pm)) {
    return res.status(404).json("please fill the requried feilds");
  }

  const newTimeSlot = new TeacherTimeSlotsModels({
    teacherId: teacherId,
    am: am,
    pm: pm,
  });

  try {
    const savedTimeSlots = await TeacherTimeSlotsModels.create(newTimeSlot);
    const response = await TeacherTimeSlotsModels.findOne({
      _id: savedTimeSlots._id,
    }).populate("teacherId", "-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTimeSlotOfTeacher = async (req, res) => {
  try {
    const getTimeSlot = await TeacherTimeSlotsModels.findOne({
      _id: req.body.id,
    }).populate("teacherId", "-password");

    if (!getTimeSlot) {
      return res.status(404).json("you dont select any time slots");
    }

    res.status(200).json(getTimeSlot);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllTimeSlots = async (req, res) => {
  try {
    const getAllTime = await TeacherTimeSlotsModels.find().populate(
      "teacherId",
      "-password"
    );

    if(!getAllTime){
        res.status(400).json("there is no timeslots")
    }

    res.status(200).json(getAllTime);
  } catch (error) {
    return res.status(500).json(error);
  }
};
