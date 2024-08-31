// --> Importing All Dependancy <--
const bcrypt = require('bcrypt')


// --> Importing Required Models <--
const User = require('../models/User')
const mailSender = require('../utils/mailSender')


// --> Explaination <--
// to reset password there is 2 steps 
//    1. Generate a token and make a safe link with that token such way only authenticated user should reset password and send url in mail
//    2. after clicking on the link user should be able to reset password
// here we are also storing the reset password token in db



// Generate Token to reset password and send the mail
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
    await User.findOneAndUpdate(
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


// Reset Password
exports.resetPassword = async (req, res) => {

  try {

    // fetch Data 
    const { password, confirmPassword, token } = req.body;

    // Validate the data
    if (password !== confirmPassword) {
      console.log("Passwords are not mathing \nCheck ResetPassword.js File #BE024");

      return res.status(401).json({
        success: false,
        message: "Passwords are not mathing",
      })
    }

    // get user deatails but using token
    const user = await User.findOne({ resetPasswordToken: token })

    // check token time is it expired or not
    if (!user) {
      console.log("Reset Password Token is Missing \nCheck ResetPassword.js File #BE025");

      return res.status(401).json({
        success: false,
        message: "Reset Password Token is Missing, please try again",
      })
    }

    if (user.resetPasswordExpires > Date.now()) {
      console.log("Reset Password Token is Expired \nCheck ResetPassword.js File #BE026");

      return res.status(401).json({
        success: false,
        message: "Reset Password Token is Expired, please try again",
      })
    }

    // hash password and then update in DB
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { resetPasswordToken: token },
      { password: hashedPassword },
      { new: true }
    )

    // Return a Successful Response
    res.status(200).json({
      sucess: true,
      message: "Password Reset Successfully ",
      otp: otp
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Reseting password",
    })

    console.log("Error While Reseting password \nCheck ResetPassword.js File #BE027");
    console.error(error.message);
    throw error;

  }

}