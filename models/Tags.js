// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for tags <--
const tags = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
})


// --> Exporting Schema as tags <--
module.exports = mongoose.model("Tags", tags)
