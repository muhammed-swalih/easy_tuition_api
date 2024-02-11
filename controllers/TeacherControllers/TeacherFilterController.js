import TeacherCbsModel from "../../models/TeacherRegistrationModels/TeacherCbsModel.js";

export const getFilteredTeachered = async (req, res) => {
  const { boardSelect, subject, cls } = req.body;

  const filteredClassDetails = await TeacherCbsModel.find().populate(
    "teacherId",
    "-password"
  );

  const sortedTeacherIds = [];

  filteredClassDetails.forEach(({ csbDetails, teacherId }) => {
    csbDetails.forEach(([classes]) => {
      if (classes.classes === cls) {
        console.log(classes.classes);
        classes.boards.forEach(({ board, subjects }) => {
          if (board === boardSelect) {
            console.log(board);
            subjects.forEach((sub) => {
              if (sub === subject) {
                console.log(sub);
                sortedTeacherIds.push(teacherId._id.toString());
              }
            });
          }
        });
      }
    });
  });

  try {
    if (sortedTeacherIds.length > 0) {
      res.status(200).json(sortedTeacherIds);
    } else {
      res.status(404).json("No teachers found for the specified criteria.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error.");
  }
};
