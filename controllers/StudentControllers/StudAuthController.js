import { generateToken } from "../../config/generateToken.js";
import StudentAuthModel from "../../models/auths/StudentAuthModel.js";
import bcrypt from "bcrypt";

export const studeRegister = async (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    res.status(404).json("please fill the require feilds");
    return;
  }
  const existUser = await StudentAuthModel.findOne({ email: email });

  if (existUser) {
    res.status(401).json("this is user is already exist with this email");
    return;
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new StudentAuthModel({
    username: username,
    email: email,
    phone: phone,
    password: hash,
  });
  try {
    await newUser.save();
    const response = {
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      password: newUser.password,
      token: generateToken(newUser._id),
      id: newUser._id,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const studLogin = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  const user = await StudentAuthModel.findOne({ email });
  if (user) {
    const isPassword = bcrypt.compareSync(password, user.password);
    if (isPassword) {
      const response = {
        username: user.username,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      };
      res.status(200).json(response);
    } else {
      res.status(404).json("wrong email or password");
    }
  }
};
