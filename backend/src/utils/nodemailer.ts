import nodemailer from "nodemailer";
import { env } from "./validate";
import createHttpError from "http-errors";
export const transporter = nodemailer.createTransport({
  host: env.NODEMAILER_SMTP_HOST,
  port: env.ENVIRONMENT === "production" ? 465 : env.NODEMAILER_SMTP_PORT,
  secure: env.ENVIRONMENT === "Production",
  auth: {
    user: env.NODEMAILER_GMAIL_USER,
    pass: env.NODEMAILER_GMAIL_PASSWORD,
  },
});

interface messageBody {
  to: string;
  from: string;
  subject: string;
  message: string;
}

export const sendMessage = async (options: messageBody) => {
  const mailoptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.message,
  };
  const info = await transporter.sendMail(mailoptions);
  if (!info) {
    createHttpError(400, "Message Could'nt be sent");
  }
};

/// add he new sendMessage from proprty these fields...
// make sure to add the notifications functionaliy here
