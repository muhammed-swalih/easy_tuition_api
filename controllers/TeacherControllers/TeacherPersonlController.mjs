import TeacherPersonalDetails from "../../models/TeacherRegistrationModels/TeacherPersonalDetails.js";
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

export const postPersonal = async (req, res) => {
  const isAlreadyExist = await TeacherPersonalDetails.findOne({
    teacherId: req.user._id,
  });

  if (isAlreadyExist) {
    return res
      .status(500)
      .json("you already submitted your personal details ! :)");
  }
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json(err);
    }
    const uniqueFilename = uuidv4();
    const filePath = Buffer.from(req.file.path);
    const destination = `teachersImages/${
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
      teacherId,
      dob,
      primaryLang,
      secondaryLang,
      PrimaryPhone,
      SecondaryPhone,
      address,
      pincode,
      state,
      img,
    } = req.body;

    try {
      // const isExist = TeacherPersonalDetails.findOne({ id: teacherId });
      // if (isExist) {
      //   return res
      //     .state(500)
      //     .json("your personal details is already uploaded!");
      // }

      const personalDetails = new TeacherPersonalDetails({
        teacherId: teacherId,
        dob: dob,
        primaryLang: primaryLang,
        secondaryLang: secondaryLang,
        PrimaryPhone: PrimaryPhone,
        SecondaryPhone: SecondaryPhone,
        address: address,
        pincode: pincode,
        state: state,
        picUrl: url,
      });

      const newPersonalDetails = await TeacherPersonalDetails.create(
        personalDetails
      );

      const response = await TeacherPersonalDetails.findOne({
        _id: personalDetails._id,
      }).populate("teacherId", "-password");
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const getPersonal = async (req, res) => {
  const teacherPersonal = await TeacherPersonalDetails.findOne({
    teacherId: req.user._id,
  });

  if (!teacherPersonal) {
    res.status(404).json("please upload your personal details");
    return;
  }

  try {
    res.status(200).json(teacherPersonal);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllTeacher = async (req, res) => {
  try {
    const allTeachers = await TeacherPersonalDetails.find().populate(
      "teacherId",
      "-password"
    );
    return res.status(200).json(allTeachers);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getTeacherByFiltering = async (req, res) => {
  const { ids } = req.body;
  try {
    const response = await TeacherPersonalDetails.findOne({
      teacherId: ids,
    }).populate("teacherId", "-password");
    if (!response) {
      return res
        .status(401)
        .json("there is no personal datas for this teacher");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
