// --> Importing All Dependancy <--
const mailSender = require('../utils/mailSender');
const { uploadImageToCloudinary } = require('../utils/imageUploader')


// --> Importing Required Models <--
const Course = import('../models/Course')
const User = import('../models/User')
const Tag = import('../models/Tags')


// Handler Function to create Course
exports.createCourse = async (req, res) => {
  try {

    // Fetch Data From Request
    const { courseName, courseDescription, whatWillYouLearn, price, tag } = req.body
    const thumbnail = req.files.thumbnailImage

    // Validation
    const isDataMissing = (!courseName || !courseDescription || !whatWillYouLearn || !price || !tag || !thumbnail)

    if (isDataMissing) {

      console.log("Data is Missing \nCheck Controller/course.js File #BE036");
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields, Some Data are Missing",
      })

    }

    // Check for Instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId)

    if (!instructorDetails) {

      console.log("Instructor is Missing \nCheck Controller/course.js File #BE036");
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      })

    }

    // Check if tag is Valid or notk
    const tagDetails = (await Tag).findById(tag)

    if (!tagDetails) {

      console.log("Tag Not Found So Invalid \nCheck Controller/course.js File #BE037");
      return res.status(404).json({
        success: false,
        message: "Tag Not Found So Invalid Tag",
      })

    }

    const thumbnailImage = uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

    // create Entry for new course

    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription: courseDescription,
      instructor: instructorDetails._id,
      whatWillYouLearn: whatWillYouLearn,
      price: price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url
    })

    // Add the new course to the user schema of the Instructork
    await User.findByIdAndUpdate(
      { id: instructorDetails._id },
      {
        $push: { courses: newCourse._id },
      }
    )

    // Upate Schema of Tag
    await Tag.findByIdAndUpdate(
      { id: instructorDetails._id },
      { courses: newCourse._id }
    )

    // Send the Response
    res.status(200).json({
      sucess: true,
      message: "Course Created SuccessFully",
      data: newCourse
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Creating a Course",
    })

    console.log("Error While Creating a Course. \nCheck Course.js File #BE038");
    console.error(error.message);
    throw error;

  }
}


// Handler Function to fetch All Course
exports.showAllCourses = async (req, res) => {
  try {

    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true
      }
    ).populate('instructor').exec();


    // Send the Response
    res.status(200).json({
      sucess: true,
      message: "All Courses SuccessFully Fetched",
      data: allCourses
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Fetching All Course",
    })

    console.log("Error While Fetching All Course. \nCheck Controllers/Course.js File #BE038");
    console.error(error.message);
    throw error;

  }
}