import { v2 as cloudinary } from "cloudinary";
import { env } from "./validate";
import fs from "fs";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      overwrite: true,
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// hum agar chahin to we can simply make a model for the video aur isk sath sath ye bhi ho sakta hai k hum kisi tarikay se process.env me email bhi de dain aur phir uska link de dai third ye k me sab se pehlay admin hi banata hu aur usay hi sari access deta hu aur agay wal kaam baad me
export { uploadOnCloudinary };
