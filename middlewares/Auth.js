// --> Importing All Dependancy <--
const jwt = require("jsonwebtoken")


// --> Importing Required Models <--
const User = require('../models/User')

// --> Setting Up the Environment Variables <--
require(('dotenv')).config()


// auth
exports.auth = async (req, res, next) => {

  // to chech auth we check and verify jwt token 
  try {

    const token = req.cookies.token || req.body.token || req.header('authurization').replace("Bearer ", "")

    // if token is missing then show error
    if (token) {

      console.log("Token is Missing \nCheck Middlewares/Auth.js File #BE015");
      return res.status(401).json({
        success: false,
        message: "Token is Missing",
      })
    }

    // verify the token
    try {

      const decode = await jwt.verify(token, process.env.JWT_SECRET)
      req.user = decode;

    } catch (error) {

      console.log("There is an issue Verifying Token \nCheck Middlewares/Auth.js File #BE016");
      return res.status(401).json({
        success: false,
        message: "There is an issue Verifying Token",
      })
    }

    next();

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Authentication",
    })

    console.log("Error While Authentication. \nCheck Middlewares/Auth.js File #BE017");
    console.error(error.message);
    throw error;

  }
}

// isStudent
exports.isStudent = async (req, res, next) => {
  try {

    if (req.user.accontType !== "Student") {

      res.status(401).json({
        sucess: false,
        message: "This is protected route for students",
      })

      console.log("This is protected route for students. \nCheck Middlewares/Auth.js File #BE019  ");

    }
    next();
  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "User role can't be verfied",
    })

    console.log("Unable to verify User Role. \nCheck Middlewares/Auth.js File #BE018");
    console.error(error.message);
    throw error;

  }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {

    if (req.user.accontType !== "Instructor") {

      res.status(401).json({
        sucess: false,
        message: "This is protected route for Instructor",
      })

      console.log("This is protected route for Instructor. \nCheck Middlewares/Auth.js File #BE020");

    }
    next();
  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "User role can't be verfied",
    })

    console.log("Unable to verify User Role. \nCheck Middlewares/Auth.js File #BE018");
    console.error(error.message);
    throw error;

  }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {

    if (req.user.accontType !== "Admin") {

      res.status(401).json({
        sucess: false,
        message: "This is protected route for Admin",
      })

      console.log("This is protected route for Admin. \nCheck Middlewares/Auth.js File #BE021");

    }
    next();
  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "User role can't be verfied",
    })

    console.log("Unable to verify User Role. \nCheck Middlewares/Auth.js File #BE018");
    console.error(error.message);
    throw error;

  }
}