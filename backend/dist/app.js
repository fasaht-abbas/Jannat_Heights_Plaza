"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const http_errors_1 = __importStar(require("http-errors"));
const passport_1 = __importDefault(require("passport"));
const apartRoutes_1 = __importDefault(require("./routes/apartRoutes"));
require("./utils/passport");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const validate_1 = require("./utils/validate");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("*", (0, cors_1.default)({
    origin: validate_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
//routes related to the user
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/apart", apartRoutes_1.default);
//error hnadlers
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Api endpoint not found"));
});
app.use((error, req, res, next) => {
    let errorMessage = "an unknown error occured";
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        errorMessage = error.message;
        statusCode = error.status;
    }
    res.status(statusCode).json({
        success: false,
        errorMessage,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map