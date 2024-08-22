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
exports.sendMessage = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const validate_1 = require("./validate");
const http_errors_1 = __importDefault(require("http-errors"));
exports.transporter = nodemailer_1.default.createTransport({
    host: validate_1.env.NODEMAILER_SMTP_HOST,
    port: validate_1.env.ENVIRONMENT === "production" ? 465 : validate_1.env.NODEMAILER_SMTP_PORT,
    secure: validate_1.env.ENVIRONMENT === "Production",
    auth: {
        user: validate_1.env.NODEMAILER_GMAIL_USER,
        pass: validate_1.env.NODEMAILER_GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2", // Ensures TLS 1.2 or higher is used
    },
    debug: true,
    logger: true,
});
const sendMessage = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const mailoptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.message,
    };
    const info = yield exports.transporter.sendMail(mailoptions);
    if (!info) {
        (0, http_errors_1.default)(400, "Message Could'nt be sent");
    }
});
exports.sendMessage = sendMessage;
/// add he new sendMessage from proprty these fields...
// make sure to add the notifications functionaliy here
//# sourceMappingURL=nodemailer.js.map