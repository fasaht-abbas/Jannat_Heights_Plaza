"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const validate_1 = require("./validate");
const http_errors_1 = __importDefault(require("http-errors"));
const transporter = nodemailer_1.default.createTransport({
    host: validate_1.env.NODEMAILER_SMTP_HOST,
    port: validate_1.env.NODEMAILER_SMTP_PORT,
    secure: validate_1.env.ENVIRONMENT === "Production",
    auth: {
        user: validate_1.env.NODEMAILER_GMAIL_USER,
        pass: validate_1.env.NODEMAILER_GMAIL_PASSWORD,
    },
});
const sendMessage = async (options) => {
    const mailoptions = {
        from: validate_1.env.NODEMAILER_GMAIL_USER,
        to: options.to,
        subject: options.subject,
        text: options.message,
    };
    const info = await transporter.sendMail(mailoptions);
    if (!info) {
        (0, http_errors_1.default)(400, "Message Could'nt be sent");
    }
};
exports.sendMessage = sendMessage;
