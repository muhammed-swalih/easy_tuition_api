import TeacherCbsModel from "../../models/TeacherRegistrationModels/TeacherCbsModel"
import TeacherCollegeDetails from "../../models/TeacherRegistrationModels/TeacherCollegeDetails"


export const getFilteredTeachered = async (req,res) => {
    const {classes,boards,subjects,am,pm} = req.body

    const filteredClassDetails = await TeacherCbsModel.find({})

    try {



    } catch (error) {
        
    }
}