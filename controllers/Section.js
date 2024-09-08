// --> Importing Required Models <--
const Section = import('../models/Section')
const Course = import('../models/Course')

exports.createSection = async (req, res) => {
  try {

    // Fetch Data
    const { sectionName, courseId } = req.body

    // Validate Data
    const isDataMissing = (!sectionName || !courseId)

    if (isDataMissing) {

      console.log("Data is Missing \nCheck Controller/Section.js File #BE041");
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields, Some Data are Missing",
      })

    }

    // Create Section
    const newSection = Section.create({ sectionName })

    // update course with Sections Object ID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id
        },
      },
      { new: true }
    )

    // Return Response
    res.status(200).json({
      sucess: true,
      message: "Section Created SuccessFully",
      data: updatedCourseDetails
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Creating Section",
    })

    console.log("Error While Creating Section. \nCheck Controllers/Section.js File #BE040");
    console.error(error.message);
    throw error;

  }
}


exports.updateSection = async (req, res) => {
  try {

    // Fetch Data
    const { sectionName, sectionId } = req.body

    // Validate Data
    const isDataMissing = (!sectionName || !sectionId)

    if (isDataMissing) {

      console.log("Data is Missing \nCheck Controller/Section.js File #BE043");
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields, Some Data are Missing",
      })

    }

    // update Section
    const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })

    // Return Response
    res.status(200).json({
      sucess: true,
      message: "Section Updated SuccessFully",
      section: section,
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Updating Section",
    })

    console.log("Error While Updating Section. \nCheck Controllers/Section.js File #BE042");
    console.error(error.message);
    throw error;

  }
}


exports.deleteSection = async (req, res) => {
  try {

    // Fetch Data
    const { sectionId } = req.params

    // delete Section
    const section = await Section.findByIdAndDelete(sectionId)

    // Return Response
    res.status(200).json({
      sucess: true,
      message: "Section Deleted SuccessFully",
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Deleting Section",
    })

    console.log("Error While Deleting Section. \nCheck Controllers/Section.js File #BE044");
    console.error(error.message);
    throw error;

  }
}