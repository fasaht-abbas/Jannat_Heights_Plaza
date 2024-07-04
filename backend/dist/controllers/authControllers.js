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
exports.logoutController = exports.isUserLoggedIn = exports.refreshTokens = exports.AfterGoogleLogin = exports.LoginEmailController = exports.getAuthenticatedUser = exports.registerWithEmail = void 0;
const userModel_1 = require("../models/userModel");
const validate_1 = require("../utils/validate");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const GenerateJwt_1 = require("../utils/GenerateJwt");
const mongoose_1 = __importDefault(require("mongoose"));
const registerWithEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, phone, name } = req.body;
    try {
        // validation performed
        (0, validate_1.validateRegisterWithEmail)({ email, password, phone, name });
        //checking if the user is exsiting
        const existingUser = yield userModel_1.UserModel.findOne({ email });
        if (existingUser) {
            throw (0, http_errors_1.default)(409, "user already exists");
        }
        //creating new user
        const hashedPassword = yield bcrypt_1.default.hashSync(password.toString(), 10);
        const newuser = yield userModel_1.UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
        });
        const createdUser = yield userModel_1.UserModel.findById(newuser._id).select("-password");
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
});
exports.registerWithEmail = registerWithEmail;
const getAuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { secret } = req.body;
        console.log(secret);
        const decode = yield (0, GenerateJwt_1.verifyJwt)(secret, validate_1.env.JWT_ACCESS_SECRET);
        if (decode === null || decode === void 0 ? void 0 : decode.id) {
            const UserId = new mongoose_1.default.Types.ObjectId(decode === null || decode === void 0 ? void 0 : decode.id);
            const returnUser = (yield userModel_1.UserModel.findById(UserId).select("-password"));
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
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const LoginEmailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        (0, validate_1.validateLoginWithEmail)({ email, password });
        const user = yield userModel_1.UserModel.findOne({ email });
        if (user && user.password) {
            const match = yield bcrypt_1.default.compareSync(password, user === null || user === void 0 ? void 0 : user.password);
            if (match) {
                const accessToken = yield (0, GenerateJwt_1.generateAccessToken)({ id: user === null || user === void 0 ? void 0 : user._id });
                const refreshToken = yield (0, GenerateJwt_1.generateRefreshToken)({ id: user === null || user === void 0 ? void 0 : user._id });
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
});
exports.LoginEmailController = LoginEmailController;
const AfterGoogleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            let user = req.user;
            const accessToken = yield (0, GenerateJwt_1.generateAccessToken)({ id: user === null || user === void 0 ? void 0 : user._id });
            const refreshToken = yield (0, GenerateJwt_1.generateRefreshToken)({ id: user === null || user === void 0 ? void 0 : user._id });
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
});
exports.AfterGoogleLogin = AfterGoogleLogin;
const refreshTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies.jwtRefresh;
        if (refreshToken) {
            const match = yield (0, GenerateJwt_1.verifyJwt)(refreshToken, validate_1.env.JWT_REFRESH_SECRET);
            if (match) {
                const userId = new mongoose_1.default.Types.ObjectId(match.id);
                const returnUser = yield userModel_1.UserModel.findById(userId);
                const newAccessToken = yield (0, GenerateJwt_1.generateAccessToken)({
                    id: returnUser === null || returnUser === void 0 ? void 0 : returnUser._id,
                });
                const newRefreshToken = yield (0, GenerateJwt_1.generateRefreshToken)({
                    id: returnUser === null || returnUser === void 0 ? void 0 : returnUser._id,
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
});
exports.refreshTokens = refreshTokens;
const isUserLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const match = yield (0, GenerateJwt_1.verifyJwt)(token, validate_1.env.JWT_ACCESS_SECRET);
            if (match) {
                const userId = new mongoose_1.default.Types.ObjectId(match.id);
                const foundUser = yield userModel_1.UserModel.findById(userId);
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
});
exports.isUserLoggedIn = isUserLoggedIn;
const logoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.logoutController = logoutController;
//# sourceMappingURL=authControllers.js.map