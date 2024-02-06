import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import firebaseConfig from "../../firebase.config.cjs";
import studSchoolDetails from "../../models/StudentRegistrationModels/studSchoolDetails.js";

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
export const postStudSchool = async (req, res) => {
  const isAlreadyExist = await studSchoolDetails.findOne({
    studentId: req.user._id,
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
    const destination = `studentSchoolIdProof/${
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
    const { schoolName, schoolAdrs, idProof, studentId, classes } = req.body;

    try {
      const school = new studSchoolDetails({
        studentId: studentId,
        schoolName: schoolName,
        schoolAdrs: schoolAdrs,
        picUrl: url,
        classes: classes,
      });

      const newSchoolStud = await studSchoolDetails.create(school);
      const response = await studSchoolDetails
        .findOne({ _id: newSchoolStud._id })
        .populate("studentId", "-password");
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const getSchool = async (req, res) => {
  const school = await studSchoolDetails.findOne({ studentId: req.user._id });
  if (!school) {
    res.status(404).json("please upload your school details");
    return;
  }

  try {
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json(error);
  }
};
