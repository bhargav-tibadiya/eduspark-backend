// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for course <--
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
    required: true,
  },
  courseDescription: {
    type: String,
    trim: true,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User"
  },
  whatWillYouLearn: {
    type: String,
    trim: true,
    required: true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Section"
    }
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "RatingAndReview"
    }
  ],
  price: {
    type: Number,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Tag"
  },
  studentsENrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User"
    }
  ]

})


// --> Exporting Schema as section <--
module.exports = mongoose.model("Course", CourseSchema)
