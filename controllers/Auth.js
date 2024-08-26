// --> Importing All Dependancy <--
const otpGenerator = require('otp-generator')


// --> Importing Required Models <--
const User = require('../models/User')
const OTP = require('../models/OTP')


// --> Function for Sending OTP <--
exports.sendOTP = async (req, res) => {

  // TODO : Add email Validation

  try {

    // Fetch Data from Request Body
    const { email } = req.body

    // Checking if User Exist in DB
    const checkUserPresent = await User.findOne({ email })

    // If User Exist then rreturn a Response of "User Exist" 
    if (checkUserPresent) {
      return res.status(401).json({
        success: true,
        message: "User Already Exist Please Login"
      })
    }

    // If User Doesn't Exist then Generate OTP 
    const otpOptions = {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
      length: 6
    };

    var otp = otpGenerator.generate(otpOptions)
    console.log("OTP Generated : ", otp);

    // Check if Generated OTP Already Exist or not 
    const checkOTPPresent = await OTP.findOne({ otp: otp });

    // If we find OTP wee keep generating new OTP
    while (checkOTPPresent) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
      })
    }

    // Create a Entry in DB
    const otpPayload = { email, otp }
    const otpBody = await OTP.create(otpPayload);
    console.log('otpBody', otpBody)

    // Return a Successful Response
    res.status(200).json({
      sucess: true,
      message: "OTP Sent Successfully ",
      otp: otp
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Sending OTP",
    })
    console.log("Error While Sending OTP. \nCheck Auth.js File #BE004");
    console.error(error.message);
    throw error;

  }
}