// --> Importing All Dependancy <--


// --> Importing Required Models <--
const Tag = import('../models/Tags')

exports.createTag = async (req, res) => {
  try {

    // Fetch data from request 
    const { name, description } = req.body;

    // Validate Data
    const isDataMissing = (!name || !description)

    if (isDataMissing) {

      console.log("Data is Missing \nCheck Tags.js File #BE033");
      return res.status(403).json({
        success: false,
        message: "Please Fill All Fields, Some Data are Missing",
      })

    }

    // Create a entry in DB
    const tagDetails = await Tag.create({
      name: name,
      description: description
    })


    // return Response
    res.status(200).json({
      sucess: true,
      message: "Tag Created Successfully ",
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Creating Tag",
    })
    console.log("Error While Creating Tag. \nCheck Tags.js File #BE032");
    console.error(error.message);
    throw error;

  }
}


// Handler Funcction to fetch All Tags
exports.showAllTags = async (req, res) => {
  try {

    // Fetch All data from DB
    const allTags = await Tag.find({}, { name: true, description: true })

    // return Response
    res.status(200).json({
      sucess: true,
      message: "All Tags Fetched Successfully ",
      allTags: allTags
    })

  } catch (error) {

    res.status(500).json({
      sucess: false,
      message: "Error While Fetching All Tag",
    })

    console.log("Error While Fetching All Tag. \nCheck Tags.js File #BE034");
    console.error(error.message);
    throw error;

  }
}