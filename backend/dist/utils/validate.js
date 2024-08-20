"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginWithEmail = exports.validateRegisterWithEmail = exports.phoneRegex = exports.nameRegex = exports.passRegex = exports.emailRegex = exports.env = void 0;
const envalid_1 = require("envalid");
require("dotenv/config");
const http_errors_1 = __importDefault(require("http-errors"));
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_URL: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)(),
    CLOUDINARY_CLOUD_NAME: (0, envalid_1.str)(),
    CLOUDINARY_API_KEY: (0, envalid_1.str)(),
    CLOUDINARY_API_SECRET: (0, envalid_1.str)(),
    GOOGLE_CLIENT_ID: (0, envalid_1.str)(),
    GOOGLE_CLIENT_SECRET: (0, envalid_1.str)(),
    JWT_ACCESS_SECRET: (0, envalid_1.str)(),
    JWT_REFRESH_SECRET: (0, envalid_1.str)(),
    FRONTEND_URL: (0, envalid_1.str)(),
    SERVER_URL: (0, envalid_1.str)(),
    ENVIRONMENT: (0, envalid_1.str)(),
    ACCESS_TOKEN_EXPIRY_TIME: (0, envalid_1.str)(),
    REFRESH_TOKEN_EXPIRY_TIME: (0, envalid_1.str)(),
    NODEMAILER_GMAIL_USER: (0, envalid_1.str)(),
    NODEMAILER_GMAIL_PASSWORD: (0, envalid_1.str)(),
    NODEMAILER_SMTP_HOST: (0, envalid_1.str)(),
    NODEMAILER_SMTP_PORT: (0, envalid_1.port)(),
});
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.passRegex = /^(?=.*[a-zA-Z])(?=.*\d).*$/;
exports.nameRegex = /^[A-Za-z\s]+$/;
exports.phoneRegex = /^\d{8,}$/;
const checkValidity = (data, regex) => {
    if (!(data === undefined || null)) {
        return regex.test(data);
    }
    return false;
};
// validating the user credentials of new user
const validateRegisterWithEmail = (data) => {
    if (!checkValidity(data === null || data === void 0 ? void 0 : data.email.toString(), exports.emailRegex)) {
        throw (0, http_errors_1.default)(404, "A valid Email is required");
    }
    if (!checkValidity(data === null || data === void 0 ? void 0 : data.password.toString(), exports.passRegex)) {
        throw (0, http_errors_1.default)(404, "A valid Password is required (at least 8 characters)");
    }
    if (!checkValidity(data === null || data === void 0 ? void 0 : data.phone.toString(), exports.phoneRegex)) {
        throw (0, http_errors_1.default)(404, "A valid phone required");
    }
    if (!checkValidity(data === null || data === void 0 ? void 0 : data.name.toString(), exports.nameRegex)) {
        throw (0, http_errors_1.default)(404, "A valid name is required");
    }
};
exports.validateRegisterWithEmail = validateRegisterWithEmail;
// validating the user credentials before logging in
const validateLoginWithEmail = (data) => {
    if (!checkValidity(data === null || data === void 0 ? void 0 : data.email.toString(), exports.emailRegex)) {
        throw (0, http_errors_1.default)(404, "A valid Email is required");
    }
    if (!checkValidity(data === null || data === void 0 ? void 0 : data.password.toString(), exports.passRegex)) {
        throw (0, http_errors_1.default)(404, "A valid Password is required (at least 8 characters)");
    }
};
exports.validateLoginWithEmail = validateLoginWithEmail;
//# sourceMappingURL=validate.js.map