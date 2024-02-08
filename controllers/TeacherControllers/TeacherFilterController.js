import TeacherCbsModel from "../../models/TeacherRegistrationModels/TeacherCbsModel.js";

export const getFilteredTeachered = async (req, res) => {
  const { board, subjects, cls } = req.body;

  const filteredClassDetails = await TeacherCbsModel.find().populate(
    "teacherId",
    "-password"
  );

  //   console.log(board, subjects, cls);

  let IsteacherClass = false;
  let IsteacherBoards = false;
  let IsteacherSubject = false;

  const sortedTeacherIds = [];

  let cless;
  let sub;
  let brds;

  const csb = filteredClassDetails;

  csb.map((items, index) => {
    const classBoardSub = items.csbDetails;

    classBoardSub.map((item, index) => {
      item.map((ite, ind) => {
        ite.boards.map((it, im) => {
          if (it.board === board && sub === subjects && sub === subjects) {
            console.log(it.board);
            brds = it.board;
            sortedTeacherIds.push(items.teacherId._id.toString());
            IsteacherBoards = true;
          }

          it.subjects.map((i, n) => {
            if (i === subjects && ite.class === cls && brds === board) {
              sub = i;
              sortedTeacherIds.push(items.teacherId._id.toString());
              IsteacherSubject = true;
            }
          });
        });

        if (ite.class === cls) {
          cless = ite.class;
          sortedTeacherIds.push(items.teacherId._id.toString());
          IsteacherClass = true;
        }
      });
    });
  });

  console.log(sortedTeacherIds);

  try {
    if (sortedTeacherIds) {
      res.status(200).json(sortedTeacherIds);
    } else {
      res
        .status(500)
        .json("sorry no teachers at this boards or subjects or class");
    }
  } catch (error) {
    console.log(error);
  }
};
