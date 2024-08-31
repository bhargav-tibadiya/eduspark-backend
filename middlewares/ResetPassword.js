// --> Importing All Dependancy <--
const jwt = require("jsonwebtoken")


// --> Importing Required Models <--
const User = require('../models/User')
const mailSender = require('../utils/mailSender')

// Generate Token to reset password
exports.resetPasswordToken = async (req, res, next) => {
  try {

    // fetch email from request
    const { email } = req.body;

    // check if user exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      console.log("User Not Found \nCheck ResetPassword.js File #BE022");

      return res.status(401).json({
        success: false,
        message: "User Not Found. Please SignUp",
      })
    }

    // generate token
    const token = crypto.randomUUID();

    // update in db
    const updatedInfo = await User.findOneAndUpdate(
      { email: email },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() + (5 * 60 * 1000) },
      { new: true }
    )

    // create URL
    const url = `http://localhost:${process.env.PORT}/update-password/${token}`

    // Send mail
    await mailSender(email, "EduSpark | Reset Password", `Reset Password Link : ${url}`)

    // Return a Successful Response
    res.status(200).json({
      sucess: true,
      message: "Mail to   Reset Password Sent Successfully ",
      otp: otp
    })

    next();

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Reset Token Password cant be generated",
    })

    console.log("Reset Token Password cant be generated \nCheck ResetPassword.js File #BE023");
    console.error(error.message);
    throw error;

  }

}