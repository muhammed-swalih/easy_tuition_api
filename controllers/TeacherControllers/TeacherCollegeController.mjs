import TeacherCollegeDetails from "../../models/TeacherRegistrationModels/TeacherCollegeDetails.js";
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

export const postCollegeDetails = async (req, res) => {
  const isAlreadyExist = await TeacherCollegeDetails.findOne({
    teacherId: req.user._id,
  });

  // if (isAlreadyExist) {
  //   return res
  //     .status(500)
  //     .json("you already submitted your personal details ! :)");
  // }
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json(err);
    }
    const uniqueFilename = uuidv4();
    const filePath = Buffer.from(req.file.path);
    const destination = `teacherCollegeIdProof/${
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
    console.log(req.body);
    const {
      teacherId,
      collegeName,
      colAddress,
      courses,
      currentYear,
      joined,
      passOutYear,
      collegeId,
    } = req.body;

    const collegeDetails = new TeacherCollegeDetails({
      teacherId: teacherId,
      collegeName: collegeName,
      colAddress: colAddress,
      courses: courses,
      currentYear: currentYear,
      joined: joined,
      passOutYear: passOutYear,
      picUrl: url,
    });

    try {
      const teacherCollegeDetails = await TeacherCollegeDetails.create(
        collegeDetails
      );
      const response = await TeacherCollegeDetails.findOne({
        _id: teacherCollegeDetails._id,
      }).populate("teacherId", "-password");
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const getCollege = async (req, res) => {
  const teacherCollege = await TeacherCollegeDetails.findOne({
    teacherId: req.user._id,
  });

  if (!teacherCollege) {
    res.status(404).json("please upload your college details");
    return
  }

  try {
    res.status(200).json(teacherCollege);
  } catch (error) {
    res.status(500).json(error);
  }
};
