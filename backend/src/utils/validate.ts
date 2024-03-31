import { cleanEnv, port, str } from "envalid";
import { LoginWithEmailType, RegisterWithEmailType } from "./interfaces";
import "dotenv/config";
import createHttpError from "http-errors";
export const env = cleanEnv(process.env, {
  MONGO_URL: str(),
  PORT: port(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  FRONTEND_URL: str(),
  SERVER_URL: str(),
  ENVIRONMENT: str(),
  ACCESS_TOKEN_EXPIRY_TIME: str(),
  REFRESH_TOKEN_EXPIRY_TIME: str(),
});
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passRegex = /^(?=.*[a-zA-Z])(?=.*\d).*$/;
export const nameRegex = /^[A-Za-z]+$/;
export const phoneRegex = /^\d{8,}$/;

const checkValidity = (data: string, regex: RegExp): Boolean => {
  if (!(data === undefined || null)) {
    return regex.test(data);
  }
  return false;
};

// validating the user credentials of new user
export const validateRegisterWithEmail = (data: RegisterWithEmailType) => {
  if (!checkValidity(data?.email.toString(), emailRegex)) {
    throw createHttpError(404, "A valid Email is required");
  }
  if (!checkValidity(data?.password.toString(), passRegex)) {
    throw createHttpError(
      404,
      "A valid Password is required (at least 8 characters)"
    );
  }
  if (!checkValidity(data?.phone.toString(), phoneRegex)) {
    throw createHttpError(404, "A valid phone required");
  }
  if (!checkValidity(data.name.toString(), nameRegex)) {
    throw createHttpError(404, "A valid name is required");
  }
};
// validating the user credentials before logging in
export const validateLoginWithEmail = (data: LoginWithEmailType) => {
  if (!checkValidity(data?.email.toString(), emailRegex)) {
    throw createHttpError(404, "A valid Email is required");
  }
  if (!checkValidity(data?.password.toString(), passRegex)) {
    throw createHttpError(
      404,
      "A valid Password is required (at least 8 characters)"
    );
  }
};
