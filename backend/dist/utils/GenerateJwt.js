"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate_1 = require("./validate");
const http_errors_1 = __importDefault(require("http-errors"));
const generateAccessToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, validate_1.env.JWT_ACCESS_SECRET, {
            expiresIn: validate_1.env.ACCESS_TOKEN_EXPIRY_TIME,
        });
    }
    catch (error) {
        throw (0, http_errors_1.default)(400, `${error}`);
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, validate_1.env.JWT_REFRESH_SECRET, {
            expiresIn: validate_1.env.REFRESH_TOKEN_EXPIRY_TIME,
        });
    }
    catch (error) {
        throw (0, http_errors_1.default)(400, `${error}`);
    }
};
exports.generateRefreshToken = generateRefreshToken;
const verifyJwt = (token, secret) => {
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            return decoded;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw (0, http_errors_1.default)(401, "Token expired");
            }
            else {
                throw (0, http_errors_1.default)(403, "Invalid token");
            }
        }
    }
    else {
        throw (0, http_errors_1.default)(404, "Token not found");
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=GenerateJwt.js.map