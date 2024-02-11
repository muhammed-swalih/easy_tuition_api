import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import firebaseConfig from "../../firebase.config.cjs";
import TeachIntroModel from "../../models/TeacherRegistrationModels/TeachIntroModel.js";
import contentType from "content-type";

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

export const postIntro = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json(err);
    }

    // Check if req.file exists before accessing mimetype
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uniqueFilename = uuidv4();
    const filePath = Buffer.from(req.file.path);
    const destination = `teacherIntro/${req.file.originalname}`;

    try {
      const videoContentType = contentType.parse(req.file.mimetype).type;

      bucket
        .upload(filePath, {
          destination: destination,
          contentType: req.file.mimetype,
          public: true,
        })
        .then(() => {
          console.log("video uploaded successfully.", videoContentType);
        })
        .catch((error) => {
          console.error("Error uploading video:", error);
        });

      const file = bucket.file(destination);
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2028",
      });

      const { teacherId, intro, img } = req.body;

      const teacherIntro = new TeachIntroModel({
        teacherId: teacherId,
        intro: intro,
        picUrl: url,
      });

      const newIntro = await TeachIntroModel.create(teacherIntro);

      const response = await TeachIntroModel.findOne({
        _id: newIntro._id,
      }).populate("teacherId", "-password");

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const getIntro = async (req, res) => {
  try {
    const response = await TeachIntroModel.findOne({
      _id: req.user.id,
    }).populate("teacherId", "-password");

    if (!response) {
      return res.status(404).json("you dont upload your introduction!");
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllIntro = async (req, res) => {
  try {
    const response = await TeachIntroModel.find().populate(
      "teacherId",
      "-password"
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getTeachIntroForStudent = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  try {
    const response = await TeachIntroModel.findOne({ teacherId: id });
    if (!response) {
      return res.status(404).json("there is no teacher with this id");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
