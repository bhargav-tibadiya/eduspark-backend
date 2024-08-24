// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for Profile <--
const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contact: {
    type: Number,
    trim: true,
  }
})

// --> Exporting Schema as Profile <--
module.exports = mongoose.model("Profile", profileSchema)
