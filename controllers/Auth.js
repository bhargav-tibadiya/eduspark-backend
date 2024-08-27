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


// --> Function for Signup <--
exports.signUp = async (req, res) => {

  // Fethch Data From Request Body
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp
  } = req.body

  // Validate Data
  const isDataMissing = (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp)

  if (isDataMissing) {
    console.log("Password and Confirm Passwords noth Matching \nCheck Auth.js File #BE005");
    return res.status(403).json({
      success: false,
      message: "Please Fill All Fields, Some Data are Missing",
    })
  }

  // Match if Both Password Match
  if (password !== confirmPassword) {

    console.log("Password and Confirm Passwords noth Matching \nCheck Auth.js File #BE006");

    return res.status(400).json({
      success: false,
      message: "Password and Confirm Passwords noth Matching",
    })
  }

  // Check if User Already Exist
  const userExist = await User.findOne({ email })

  console.log("User Already Exist Please Login \nCheck Auth.js File #BE007");

  if (userExist) {
    return res.status(400).json({
      success: false,
      message: "User Already Exist Please Login",
    })
  }

  // Find most Recent OTP for the User ( using sort we are sorting to most recent otp and selecting top )
  const recentOtp = await OTP.find({ email }).sort({ createdAT: -1 }).limit(1);
  console.log("Selected Recent OTP from DB: ", recentOtp);

  // Validate OTP
  if (recentOtp.length == 0) {

    // OTP not found
    console.log("OTP not found in DB \nCheck Auth.js File #BE008");

    return res.status(400).json({
      success: false,
      message: "OTP Not Found in DB",
    })

  } else if (otp != recentOtp.otp) {

    // OTP doesnt match
    console.log("OTP Doesnt Match \nCheck Auth.js File #BE009");

    return res.status(400).json({
      success: false,
      message: "OTP Doesnt Match",
    })

  }

  // Hash Password

  // Create Entry in DB

  // Return Response

}