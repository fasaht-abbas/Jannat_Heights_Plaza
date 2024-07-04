"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.isUserLoggedIn = exports.refreshTokens = exports.AfterGoogleLogin = exports.LoginEmailController = exports.getAuthenticatedUser = exports.registerWithEmail = void 0;
const userModel_1 = require("../models/userModel");
const validate_1 = require("../utils/validate");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const GenerateJwt_1 = require("../utils/GenerateJwt");
const mongoose_1 = __importDefault(require("mongoose"));
const registerWithEmail = async (req, res, next) => {
    const { email, password, phone, name } = req.body;
    try {
        // validation performed
        (0, validate_1.validateRegisterWithEmail)({ email, password, phone, name });
        //checking if the user is exsiting
        const existingUser = await userModel_1.UserModel.findOne({ email });
        if (existingUser) {
            throw (0, http_errors_1.default)(409, "user already exists");
        }
        //creating new user
        const hashedPassword = await bcrypt_1.default.hashSync(password.toString(), 10);
        const newuser = await userModel_1.UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
        });
        const createdUser = await userModel_1.UserModel.findById(newuser._id).select("-password");
        if (createdUser) {
            res.status(200).send({
                success: true,
                createdUser,
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.registerWithEmail = registerWithEmail;
const getAuthenticatedUser = async (req, res, next) => {
    try {
        const { secret } = req.body;
        console.log(secret);
        const decode = await (0, GenerateJwt_1.verifyJwt)(secret, validate_1.env.JWT_ACCESS_SECRET);
        if (decode?.id) {
            const UserId = new mongoose_1.default.Types.ObjectId(decode?.id);
            const returnUser = (await userModel_1.UserModel.findById(UserId).select("-password"));
            if (!returnUser) {
                throw (0, http_errors_1.default)(400, "Error user not found");
            }
            return res.status(200).send({
                success: true,
                returnUser,
            });
        }
        else {
            throw (0, http_errors_1.default)(400, "Error user not found");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getAuthenticatedUser = getAuthenticatedUser;
const LoginEmailController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        (0, validate_1.validateLoginWithEmail)({ email, password });
        const user = await userModel_1.UserModel.findOne({ email });
        if (user && user.password) {
            const match = await bcrypt_1.default.compareSync(password, user?.password);
            if (match) {
                const accessToken = await (0, GenerateJwt_1.generateAccessToken)({ id: user?._id });
                const refreshToken = await (0, GenerateJwt_1.generateRefreshToken)({ id: user?._id });
                res.cookie("jwtRefresh", refreshToken, {
                    httpOnly: true,
                    secure: validate_1.env.ENVIRONMENT === "Production",
                    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                });
                return res.status(200).send({
                    success: true,
                    accessToken: accessToken,
                });
            }
            else {
                throw (0, http_errors_1.default)(500, "Incorrect Password");
            }
        }
        else {
            throw (0, http_errors_1.default)(404, "User Not found");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.LoginEmailController = LoginEmailController;
const AfterGoogleLogin = async (req, res, next) => {
    try {
        if (req.user) {
            let user = req.user;
            const accessToken = await (0, GenerateJwt_1.generateAccessToken)({ id: user?._id });
            const refreshToken = await (0, GenerateJwt_1.generateRefreshToken)({ id: user?._id });
            res.cookie("jwtRefresh", refreshToken, {
                httpOnly: true,
                secure: validate_1.env.ENVIRONMENT === "Production",
                expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            });
            res.redirect(validate_1.env.FRONTEND_URL +
                `/authorization?name=${user.name}&email=${user.email}&secret=${accessToken}`);
        }
        else
            throw (0, http_errors_1.default)(400, "No user found in the stretegy");
    }
    catch (error) {
        next(error);
    }
};
exports.AfterGoogleLogin = AfterGoogleLogin;
const refreshTokens = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies.jwtRefresh;
        if (refreshToken) {
            const match = await (0, GenerateJwt_1.verifyJwt)(refreshToken, validate_1.env.JWT_REFRESH_SECRET);
            if (match) {
                const userId = new mongoose_1.default.Types.ObjectId(match.id);
                const returnUser = await userModel_1.UserModel.findById(userId);
                const newAccessToken = await (0, GenerateJwt_1.generateAccessToken)({
                    id: returnUser?._id,
                });
                const newRefreshToken = await (0, GenerateJwt_1.generateRefreshToken)({
                    id: returnUser?._id,
                });
                res
                    .status(200)
                    .cookie("jwtRefresh", newRefreshToken, {
                    httpOnly: true,
                    secure: validate_1.env.ENVIRONMENT === "Production",
                    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                })
                    .send({
                    success: true,
                    accessToken: newAccessToken,
                    returnUser,
                });
            }
        }
        else
            throw (0, http_errors_1.default)(400, "Refresh token does not exist");
    }
    catch (error) {
        next(error);
    }
};
exports.refreshTokens = refreshTokens;
const isUserLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const match = await (0, GenerateJwt_1.verifyJwt)(token, validate_1.env.JWT_ACCESS_SECRET);
            if (match) {
                const userId = new mongoose_1.default.Types.ObjectId(match.id);
                const foundUser = await userModel_1.UserModel.findById(userId);
                if (foundUser) {
                    return res.status(200).send({
                        success: true,
                    });
                }
                else {
                    throw (0, http_errors_1.default)(401, "Unauthorized user");
                }
            }
            else {
                throw (0, http_errors_1.default)(401, "Unauthorized user");
            }
        }
    }
    catch (error) {
        next(error);
    }
};
exports.isUserLoggedIn = isUserLoggedIn;
const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("jwtRefresh", {
            httpOnly: true,
            secure: validate_1.env.ENVIRONMENT === "Production",
        });
        res.send({
            success: true,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logoutController = logoutController;
