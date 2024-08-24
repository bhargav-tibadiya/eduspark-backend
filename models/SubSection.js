// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for subSection <--
const subSection = new mongoose.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
})

// --> Exporting Schema as subSection <--
module.exports = mongoose.model("SubSection", subSection)
