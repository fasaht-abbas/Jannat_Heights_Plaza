"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRole = exports.getAllUsers = exports.updatePassword = exports.updateProfile = exports.verifyOTP = exports.sendOTP = exports.findUser = void 0;
const userModel_1 = require("../models/userModel");
const http_errors_1 = __importDefault(require("http-errors"));
const nodemailer_1 = require("../utils/nodemailer");
const cloudinary_1 = require("../utils/cloudinary");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_2 = require("cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const findUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email);
        const user = await userModel_1.UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).send({
                success: true,
                account: "notFound",
            });
        }
        if (user?.googleId !== undefined || null) {
            return res.status(200).send({
                success: true,
                account: "gUser",
            });
        }
        else {
            return res.status(200).send({
                success: true,
                account: "eUser",
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.findUser = findUser;
const sendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userModel_1.UserModel.findOne({ email });
        if (!user) {
            throw (0, http_errors_1.default)(404, "User is not registered");
        }
        const OTP = Math.random().toString(36).slice(-6);
        const saved = await userModel_1.UserModel.findByIdAndUpdate(user?.id, {
            otp: OTP,
        });
        if (!saved) {
            throw (0, http_errors_1.default)(400, "Could not generate OTP");
        }
        const options = {
            to: email,
            subject: "OTP to verify your email account",
            message: `Hi ${user?.name},\n\n` +
                `Verify Your Email.` +
                `Please use the following token to verify your Email: ${OTP}\n\n` +
                `If you did not make this request, please ignore this email.\n\n` +
                `Best regards,\n` +
                `Team : Jannat Heights Plaza `,
        };
        await (0, nodemailer_1.sendMessage)(options);
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendOTP = sendOTP;
const verifyOTP = async (req, res, next) => {
    try {
        const { email, OTP } = req.body;
        const user = await userModel_1.UserModel.findOne({ email });
        if (!user) {
            throw (0, http_errors_1.default)(400, "could'nt Find user");
        }
        if (user?.otp === OTP) {
            const verified = await userModel_1.UserModel.findByIdAndUpdate(user?.id, {
                verifiedEmail: true,
                otp: null,
            });
            if (!verified) {
                throw (0, http_errors_1.default)(400, "Error in verifying the code");
            }
            return res.status(200).send({
                success: true,
            });
        }
        else
            throw (0, http_errors_1.default)(403, "Invalid or Expired Token");
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOTP = verifyOTP;
const updateProfile = async (req, res, next) => {
    try {
        const { id, name, phone, address, CNIC } = req.body;
        if (!id) {
            throw (0, http_errors_1.default)(404, "user error");
        }
        const userId = new mongoose_1.default.Types.ObjectId(id);
        const foundUser = await userModel_1.UserModel.findById(userId);
        if (!foundUser) {
            throw (0, http_errors_1.default)(404, "user not found");
        }
        else if (req.file) {
            if (foundUser?.photo_cd_public_id) {
                await cloudinary_2.v2.uploader.destroy(foundUser?.photo_cd_public_id);
            }
            const localPath = req.file?.path;
            console.log(localPath);
            const response = await (0, cloudinary_1.uploadOnCloudinary)(localPath);
            console.log(response);
            await userModel_1.UserModel.findByIdAndUpdate(userId, {
                profilePhoto: response?.secure_url,
                photo_cd_public_id: response?.public_id,
            });
        }
        const updateUser = await userModel_1.UserModel.findByIdAndUpdate(userId, {
            name: name,
            phone: phone,
            address: address,
            CNIC: CNIC,
        });
        if (!updateUser) {
            throw (0, http_errors_1.default)(400, "Could not update the user");
        }
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
const updatePassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            throw (0, http_errors_1.default)("Cannot change password something is missing");
        }
        const user = await userModel_1.UserModel.findOne({ email: email });
        if (user) {
            const hashedPassword = await bcrypt_1.default.hashSync(newPassword.toString(), 10);
            user.password = hashedPassword;
            await user.save();
            return res.status(200).send({
                success: true,
            });
        }
        else {
            throw (0, http_errors_1.default)("User not found");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updatePassword = updatePassword;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel_1.UserModel.find({});
        if (users) {
            res.status(200).send({
                success: true,
                users,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const UpdateUserRole = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { role } = req.body;
        if (!uid) {
            throw (0, http_errors_1.default)(404, "Could not find userId");
        }
        const id = new mongoose_1.default.Types.ObjectId(uid);
        await userModel_1.UserModel.findByIdAndUpdate(id, {
            role: role,
        });
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.UpdateUserRole = UpdateUserRole;
