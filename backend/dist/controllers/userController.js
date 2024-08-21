"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.ContactUsMail = exports.UpdateUserRole = exports.getAllUsers = exports.updatePassword = exports.updateProfile = exports.verifyOTP = exports.sendOTP = exports.findUser = void 0;
const userModel_1 = require("../models/userModel");
const http_errors_1 = __importDefault(require("http-errors"));
const nodemailer_1 = require("../utils/nodemailer");
const cloudinary_1 = require("../utils/cloudinary");
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_2 = require("cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const validate_1 = require("../utils/validate");
const findUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield userModel_1.UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).send({
                success: true,
                account: "notFound",
            });
        }
        if ((user === null || user === void 0 ? void 0 : user.googleId) !== undefined || null) {
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
});
exports.findUser = findUser;
const sendOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield userModel_1.UserModel.findOne({ email });
        if (!user) {
            throw (0, http_errors_1.default)(404, "User is not registered");
        }
        const OTP = Math.random().toString(36).slice(-6);
        const saved = yield userModel_1.UserModel.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user.id, {
            otp: OTP,
        });
        if (!saved) {
            throw (0, http_errors_1.default)(400, "Could not generate OTP");
        }
        const options = {
            from: "Jannat Heights Plaza <jannatheights@gmail.com>",
            to: email,
            subject: "OTP to verify your email account",
            message: `Hi ${user === null || user === void 0 ? void 0 : user.name},\n\n` +
                `Verify Your Email.` +
                `Please use the following token to verify your Email: ${OTP}\n\n` +
                `If you did not make this request, please ignore this email.\n\n` +
                `Best regards,\n` +
                `Team : Jannat Heights Plaza `,
        };
        yield (0, nodemailer_1.sendMessage)(options);
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendOTP = sendOTP;
const verifyOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, OTP } = req.body;
        const user = yield userModel_1.UserModel.findOne({ email });
        if (!user) {
            throw (0, http_errors_1.default)(400, "could'nt Find user");
        }
        if ((user === null || user === void 0 ? void 0 : user.otp) === OTP) {
            const verified = yield userModel_1.UserModel.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user.id, {
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
});
exports.verifyOTP = verifyOTP;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id, name, phone, address, CNIC } = req.body;
        if (!id) {
            throw (0, http_errors_1.default)(404, "user error");
        }
        const userId = new mongoose_1.default.Types.ObjectId(id);
        const foundUser = yield userModel_1.UserModel.findById(userId);
        if (!foundUser) {
            throw (0, http_errors_1.default)(404, "user not found");
        }
        else if (req.file) {
            if (foundUser === null || foundUser === void 0 ? void 0 : foundUser.photo_cd_public_id) {
                yield cloudinary_2.v2.uploader.destroy(foundUser === null || foundUser === void 0 ? void 0 : foundUser.photo_cd_public_id);
            }
            const localPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const response = yield (0, cloudinary_1.uploadOnCloudinary)(localPath);
            yield userModel_1.UserModel.findByIdAndUpdate(userId, {
                profilePhoto: response === null || response === void 0 ? void 0 : response.secure_url,
                photo_cd_public_id: response === null || response === void 0 ? void 0 : response.public_id,
            });
        }
        const updateUser = yield userModel_1.UserModel.findByIdAndUpdate(userId, {
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
});
exports.updateProfile = updateProfile;
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            throw (0, http_errors_1.default)("Cannot change password something is missing");
        }
        const user = yield userModel_1.UserModel.findOne({ email: email });
        if (user) {
            const hashedPassword = yield bcrypt_1.default.hashSync(newPassword.toString(), 10);
            user.password = hashedPassword;
            yield user.save();
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
});
exports.updatePassword = updatePassword;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.UserModel.find({});
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
});
exports.getAllUsers = getAllUsers;
const UpdateUserRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        const { role } = req.body;
        if (!uid) {
            throw (0, http_errors_1.default)(404, "Could not find userId");
        }
        if (!role) {
            throw (0, http_errors_1.default)(404, "Could not find role");
        }
        const id = new mongoose_1.default.Types.ObjectId(uid);
        yield userModel_1.UserModel.findByIdAndUpdate(id, {
            role: role,
        });
        return res.status(200).send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateUserRole = UpdateUserRole;
const ContactUsMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sender, message } = req.body;
        yield (0, nodemailer_1.sendMessage)({
            from: validate_1.env === null || validate_1.env === void 0 ? void 0 : validate_1.env.NODEMAILER_GMAIL_USER,
            to: validate_1.env === null || validate_1.env === void 0 ? void 0 : validate_1.env.NODEMAILER_GMAIL_USER,
            subject: `Contact Form Message from ${name} ${sender}`,
            message: message,
        });
        res
            .status(200)
            .send({ success: true, message: "Email sent successfully!" });
    }
    catch (error) {
        next(error);
    }
});
exports.ContactUsMail = ContactUsMail;
const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.params;
        if (!query) {
            throw (0, http_errors_1.default)(400, "Query is required");
        }
        const result = yield userModel_1.UserModel.find({
            $or: [{ email: { $regex: query, $options: "i" } }],
        });
        res.status(200).send({
            success: true,
            result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.search = search;
//# sourceMappingURL=userController.js.map