import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "./validate";
import createHttpError from "http-errors";

export const generateAccessToken = (payload: {}): string => {
  try {
    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRY_TIME,
    });
  } catch (error) {
    throw createHttpError(400, `${error}`);
  }
};

export const generateRefreshToken = (payload: {}): string => {
  try {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRY_TIME,
    });
  } catch (error) {
    throw createHttpError(400, `${error}`);
  }
};

export const verifyJwt = (
  token: string | null,
  secret: string
): JwtPayload | null => {
  if (token) {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw createHttpError(401, "Token expired");
      } else {
        throw createHttpError(403, "Invalid token");
      }
    }
  } else {
    throw createHttpError(404, "Token not found");
  }
};
