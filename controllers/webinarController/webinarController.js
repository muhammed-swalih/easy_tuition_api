import paymentMode from "../../models/Student_Payment/paymentMode.js";
import webinar from "../../models/webinarModel/webinar.js";
import moment from "moment-timezone";

export const postWebinar = async (req, res) => {
  const {
    teacherId,
    date,
    topic,
    description,
    poster,
    amount,
    StartingTime,
    endingTime,
  } = req.body;

  if (
    !teacherId ||
    !date ||
    !StartingTime ||
    !endingTime ||
    !topic ||
    !description ||
    !poster ||
    !amount
  ) {
    res.status(404).json("please fill the required feild");
    return;
  }

  const localDate = moment(date).tz("Asia/Kolkata").format("YYYY-MM-DD");
  const localStartingTime = moment(StartingTime)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD hh:mm:ss");
  const localEndingTime = moment(endingTime)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD hh:mm:ss");

  console.log(localDate);
  console.log(localStartingTime);
  console.log(localEndingTime);

  const newWebinar = new webinar({
    teacherId: teacherId,
    date: localDate, // Convert to Date with local timezone
    StartingTime: localStartingTime,
    endingTime: localEndingTime,
    topic: topic,
    description: description,
    poster: poster,
    amount: amount,
  });

  try {
    const hostedWebinar = await webinar.create(newWebinar);
    const response = await webinar
      .findOne({ _id: hostedWebinar._id })
      .populate("teacherId", "-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getWebinar = async (req, res) => {
  const webinars = await webinar
    .find({ teacherId: req.user._id })
    .populate("teacherId", "-password");
  if (webinars.length === 0) {
    res.status(404).json("you don't have any webinars");
    return;
  }
  try {
    res.status(200).json(webinars);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getWebinarDetailsForStudents = async (req, res) => {
  const allWebinars = await webinar.find();
  if (!allWebinars) {
    res.status(404).json("currently there is no webinar conducted");
    return;
  }
  try {
    res.status(200).json(allWebinars);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const enrollWebinar = async (req, res) => {
  res.status(200).json(req.paidUser);

  const yourWebinar = await webinar.findOne({ _id: req.paidUser.id });
  if (!yourWebinar) {
    res.status(404).json("there is no webinars");
    return;
  }

  try {
    res.status(200).json(yourWebinar);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getStudentsForWebinar = async (req, res) => {
  const myStudents = await paymentMode
    .find({ paidTo: req.user._id })
    .populate("paidBy", "-password")
    .populate("webinar")
    .populate("paidTo");

  if (!myStudents) {
    res.status(404).json("no student is registered");
    return;
  }

  try {
    res.status(200).json(myStudents);
  } catch (error) {
    res.status(500).json(error);
  }
};
