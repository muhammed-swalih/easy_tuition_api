import paymentMode from "../../models/Student_Payment/paymentMode.js";
import { generateToken } from "../../config/generateToken.js";
import crypto from "crypto";
import instance from "../../razorPayInstance.js";
import webinar from "../../models/webinarModel/webinar.js";
import dotenv from "dotenv";
import Class from "../../models/classModel/Class.js";
import paymentForClass from "../../models/Student_Payment/paymentForClass.js";
import moment from "moment-timezone";

dotenv.config();

export const createOrder = async (req, res) => {
  console.log("iam the order api");
  const { amount } = req.body;
  try {
    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };

    try {
      const order = await instance.orders.create(options);
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paidFrom,
    paidTo,
    webinarId,
  } = req.body;

  console.log(req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (!isAuthentic) {
    return res.status(404).json("keys don't match");
  }

  // const currentTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD hh:mm:ss");
  const time = new Date();
  const currentTime = moment(time)
    .tz("Asia/kolkata")
    .format("YYYY-MM-DD hh:mm:ss");
  console.log(currentTime);

  const isAlreadExist = await paymentMode.findOne({
    paidFrom: paidFrom,
    webinarId: webinarId,
  });

  const webinarEndingTime = await webinar.findOne({ _id: webinarId });
  if (isAlreadExist) {
    if (currentTime <= webinarEndingTime.endingTime) {
      return res.status(200).json("you are already paid for this webinar");
    } else {
      return res.status(404).json("this webinar is finished");
    }
  }
  const newPayment = new paymentMode({
    razorpay_order_id: razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature,
    paidFrom: paidFrom,
    paidTo: paidTo,
    webinarId: webinarId,
    paidToken: generateToken(webinarId),
    tokenExpiresAt: webinarEndingTime.endingTime,
  });

  if (currentTime <= webinarEndingTime.endingTime) {
    const savedPayment = await paymentMode.create(newPayment);
    const response = await paymentMode
      .findOne({ _id: savedPayment._id })
      .populate("paidFrom", "-password")
      .populate("paidTo", "-password")
      .populate("webinarId");

    return res
      .status(200)
      .json("token is valid you are allowed to access this webinar");
  } else {
    return res
      .status(500)
      .json("token is expired, can't participate in this webinar");
  }
};

export const verifyPaymentForClass = async (req, res) => {
  console.log(req.body);
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paidFrom,
    paidTo,
    classId,
  } = req.body;

  if (
    (!razorpay_order_id,
    !razorpay_payment_id,
    !razorpay_signature,
    !paidFrom,
    !paidTo,
    !classId)
  ) {
    return res.status(404).json("please fill the required feilds");
  }
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    return res.status(500).json("keys doesn't match");
  }
  const expireTimeOfTheToken = moment()
    .add(30, "days")
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD hh:mm:ss");

  const time = new Date();
  const currentTime = moment(time)
    .tz("Asia/kolkata")
    .format("YYYY-MM-DD hh:mm:ss");
  console.log(expireTimeOfTheToken);
  console.log(currentTime);

  const myClass = await Class.findOne({ _id: classId });
  const paidClass = new paymentForClass({
    razorpay_order_id: razorpay_order_id,
    razorpay_payment_id: razorpay_payment_id,
    razorpay_signature: razorpay_signature,
    paidFrom: paidFrom,
    paidTo: paidTo,
    classId: classId,
    paidToken: generateToken(classId),
    tokenExpiresAt: expireTimeOfTheToken,
  });

  const newPaidClass = await paymentForClass.findOne({ _id: paidClass._id });
  
  if(paidClass.razorpay_order_id === razorpay_order_id){
    return res.status(200).json("you are already paid for this class countinue for avalibale days")
  }

  if (currentTime <= expireTimeOfTheToken) {
    const savedNewClass = await paymentForClass.create(paidClass);
    const response = await paymentForClass
      .findOne({ _id: savedNewClass._id })
      .populate("paidTo", "-password")
      .populate("paidTo", "-password")
      .populate("classId");

    return res.status(200).json(response);
  } else {
    return res.status(500).json("token expired pay for the new month ");
  }
};
