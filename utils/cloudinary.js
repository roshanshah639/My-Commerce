import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// clodinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // if local file path is not found
    if (!localFilePath) {
      return null;
    }

    // upload files on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // log the success
    console.log(`Image uploaded successfully. At URL: ${response.secure_url}`);

    // delete the locally saved temp file
    fs.unlinkSync(localFilePath);

    // return the response
    return response;
  } catch (error) {
    // log the error
    console.log(error.message);

    // delete the locally saved temp file
    fs.unlinkSync(localFilePath);

    // return null
    return null;
  }
};

export { uploadOnCloudinary };
