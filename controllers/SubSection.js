// --> Importing Required Models <--
const Section = import('../models/Section')
const SubSection = import('../models/SubSection')

const { findByIdAndUpdate } = require('../models/User')
// --> Importing All Dependancy <--
const { uploadImageToCloudinary } = require('../utils/imageUploader')

exports.createSubSection = async (req, res) => {
  try {

    //  Fetch Data From Reqest 
    const { sectionId, title, timeDuration, description } = req.body

    // Extract File and Video
    const video = req.files.videoFile

    // Validation
    const isDataMissing = (!sectionId || !title || !timeDuration || !description || !video)

    if (isDataMissing) {

      console.log("Data is Missing \nCheck Controller/SubSection.js File #BE048");
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields, Some Data are Missing",
      })

    }

    // Upload Video to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

    // create a sub Section
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    })

    // Update Section with Sub Section ObjectID
    const updatedSection = await findByIdAndUpdate(
      sectionId,
      {
        $push: {
          SubSection: subSectionDetails._id
        }
      },
      { new: true }
    )

    // Return Response
    res.status(200).json({
      sucess: true,
      message: "SubSection Created SuccessFully",
      data: updatedSection
    })


  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Creating SubSection",
    })

    console.log("Error While Creating SubSection. \nCheck Controllers/SubSection.js File #BE045");
    console.error(error.message);
    throw error;

  }
}


exports.updateSubSection = async (req, res) => {
  try {

    //  Fetch Data From Reqest 
    const { sectionId, subSectionId, title, timeDuration, description } = req.body

    // Extract File and Video
    const video = req.files.videoFile

    // Validation
    const isDataMissing = (!sectionId || !subSectionId || !title || !timeDuration || !description || !video)

    if (isDataMissing) {

      console.log("Data is Missing \nCheck Controller/SubSection.js File #BE049");
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields, Some Data are Missing",
      })

    }

    // Upload Video to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

    // update a sub Section
    const subSectionDetails = await SubSection.findByIdAndUpdate({ subSectionId }, {
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    })

    // Return Response
    res.status(200).json({
      sucess: true,
      message: "SubSection Created SuccessFully",
      data: subSectionDetails
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Updating SubSection",
    })

    console.log("Error While Updating SubSection. \nCheck Controllers/SubSection.js File #BE046");
    console.error(error.message);
    throw error;

  }
}


exports.deleteSubSection = async (req, res) => {
  try {

    //  Fetch Data From Reqest 
    const { subSectionId } = req.body

    // Delete
    await SubSection.findByIdAndDelete(subSectionId);

    // Return Response
    res.status(200).json({
      sucess: true,
      message: "SubSection Deleted SuccessFully",
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Deleting SubSection",
    })

    console.log("Error While Deleting SubSection. \nCheck Controllers/SubSection.js File #BE047");
    console.error(error.message);
    throw error;

  }
}

