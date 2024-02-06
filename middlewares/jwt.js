import jwt, { decode } from "jsonwebtoken";
import AuthModel from "../models/auths/AuthModel.js";
import StudentAuthModel from "../models/auths/StudentAuthModel.js";
import webinar from "../models/webinarModel/webinar.js";
import Class from "../models/classModel/Class.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const docode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await AuthModel.findById(docode.id).select("-password");
      if (req.user === null) {
        return res.status(404).json("token failed");
      }
      console.log(req.user._id);

      next();
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
      return;
    }
  }
  if (!token) {
    res.status(404).json("Not authorized, no token");
    return;
  }
};

export const protectStudent = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const docode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await StudentAuthModel.findById(docode.id).select("-password");
      if (req.user === null) {
        return res.status(404).json("token failed");
      }
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
      return;
    }
  }
  if (!token) {
    res.status(404).json("Not authorized, no token");
    return;
  }
};

export const paymentHolding = async (req, res, next) => {
  const token = req.header("webinar-token");
  if (!token) {
    res.status(401).json("Access denied. You are not paid.");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded.id);

    req.paidUser = await webinar.findById(decoded.id);
    if (!req.paidUser) {
      res.status(404).json("there no token");
      return;
    }
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const paymentHoldingForClass = async (req, res, next) => {
  const token = req.header("class-token");
  if (!token) {
    res.status(401).json("Access denied. You are not paid.");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded.id);

    req.paidUser = await Class.findById(decoded.id);
    if (!req.paidUser) {
      res.status(404).json("there no token");
      return;
    }
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
