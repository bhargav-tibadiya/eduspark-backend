// --> Importing All Dependancy <--
const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary = async (file, folder, height, quality) => {

  const options = { folder }

  if (height) {
    options.height = height;
    options.quality = quality;
  }
  options.resourseType = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options)
}