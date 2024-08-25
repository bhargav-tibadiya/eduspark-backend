// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for otp <--
const otpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },

})


// --> Exporting Schema as OTP <--
module.exports = mongoose.model("OTP", otpSchema)
