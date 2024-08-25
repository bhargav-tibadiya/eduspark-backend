// --> Importing All Dependancy <--
const mongoose = require('mongoose');


// --> Defining Schema for courseProgress <--
const ratingAndReview = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: Number,
    required: true,
    trim: true
  },
})

// --> Exporting Schema as courseProgress <--
module.exports = mongoose.model("RatingAndReview", ratingAndReview)
