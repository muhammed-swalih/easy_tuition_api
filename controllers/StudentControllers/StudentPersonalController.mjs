import StudPersonalDetails from "../../models/StudentRegistrationModels/StudPersonalDetails.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import firebaseConfig from "../../firebase.config.cjs";

const { bucket } = firebaseConfig;

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("img");

export const postStudPersonal = async (req, res) => {
  const isAlreadyExist = await StudPersonalDetails.findOne({
    studentId: req.user._id,
  });

  // if (isAlreadyExist) {
  //   return res
  //     .status(500)
  //     .json("you already submitted your personal details ! :)");
  // }
  upload(req, res, async (err) => {
    console.log(req.user._id);
    if (err) {
      res.status(500).json(err);
    }
    const uniqueFilename = uuidv4();
    const filePath = Buffer.from(req.file.path);
    const destination = `studentsImages/${
      req.file.originalname + uniqueFilename
    }`;

    bucket
      .upload(filePath, {
        destination: destination,
        contentType: req.file.mimetype,
        public: true,
      })
      .then(() => {
        console.log("Image uploaded successfully.");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });

    const file = bucket.file(destination);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2028", // Set an expiration date or duration as needed
    });

    const {
      studentId,
      gender,
      dob,
      primaryLang,
      secondaryLang,
      address,
      pincode,
      district,
      state,
      img,
    } = req.body;

    try {
      const personalDetails = new StudPersonalDetails({
        studentId: studentId,
        gender: gender,
        dob: dob,
        primaryLang: primaryLang,
        secondaryLang: secondaryLang,
        address: address,
        pincode: pincode,
        district: district,
        state: state,
        picUrl: url,
      });

      const newStudentPersonalDetails = await StudPersonalDetails.create(
        personalDetails
      );
      const response = await StudPersonalDetails.find({
        _id: personalDetails._id,
      }).populate("studentId", "-password");

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const getPersonal = async (req, res) => {
  try {
    const personal = await StudPersonalDetails.findOne({
      studentId: req.user._id,
    }).populate("studentId" , "-password");
    if (!personal) {
      res.status(404).json("please upload your personal details");
      return;
    }
    res.status(200).json(personal);
  } catch (error) {
    res.status(500).json(error);
  }
};
