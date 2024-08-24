// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for section <--
const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "SubSection"
  }
})

// --> Exporting Schema as section <--
module.exports = mongoose.model("Section", sectionSchema)
