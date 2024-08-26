// --> Importing All Dependancy <--
const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');


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

// --> Function to Send E-Mail <--
const sendVerifcationEmail = async (email, otp) => {

  try {

    const mailRepsonce = await mailSender(email, "Verification Email from CodeSpark", otp);
    console.log("Verification Email Sent Successfully")

  } catch (error) {

    console.log("Error While Sending Verification Mail. \nCheck OTP.js File #BE003");
    console.error(error.message);
    throw error;

  }

}

// --> The User will be only register if OTP verification via mail is Done <-- 
// --> So using pre to do some task before saving the entry to DB  <--
otpSchema.pre("save", async (next) => {
  await sendVerifcationEmail(this.email, this.otp);
  next();
})


// --> Exporting Schema as OTP <--
module.exports = mongoose.model("OTP", otpSchema)
