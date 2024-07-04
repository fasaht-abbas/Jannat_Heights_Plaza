"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const validate_1 = require("./validate");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: validate_1.env.CLOUDINARY_CLOUD_NAME,
    api_key: validate_1.env.CLOUDINARY_API_KEY,
    api_secret: validate_1.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
            return null;
        const response = await cloudinary_1.v2.uploader.upload(localFilePath, {
            resource_type: "auto",
            overwrite: true,
        });
        fs_1.default.unlinkSync(localFilePath);
        return response;
    }
    catch (error) {
        fs_1.default.unlinkSync(localFilePath);
        return null;
    }
};
exports.uploadOnCloudinary = uploadOnCloudinary;
