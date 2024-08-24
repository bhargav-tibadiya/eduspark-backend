// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for courseProgress <--
const courseProgress = new mongoose.Schema({
  courseID: {
    typr: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  completedVideos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection"
    }
  ]
})

// --> Exporting Schema as courseProgress <--
module.exports = mongoose.model("courseProgress", courseProgress)