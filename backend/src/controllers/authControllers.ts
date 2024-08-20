import { UserModel } from "../models/userModel";
import { RequestHandler } from "express";
import { LoginWithEmailType, RegisterWithEmailType } from "../utils/interfaces";

import {
  env,
  validateLoginWithEmail,
  validateRegisterWithEmail,
} from "../utils/validate";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyJwt,
} from "../utils/GenerateJwt";
import mongoose from "mongoose";
import UserDTO from "../types/userType";

export const registerWithEmail: RequestHandler<
  unknown,
  unknown,
  RegisterWithEmailType,
  unknown
> = async (req, res, next) => {
  const { email, password, phone, name } = req.body;

  try {
    // validation performed
    validateRegisterWithEmail({ email, password, phone, name });
    //checking if the user is exsiting
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw createHttpError(409, "user already exists");
    }
    //creating new user
    const hashedPassword = await bcrypt.hashSync(password.toString(), 10);
    const newuser = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    });

    const createdUser = await UserModel.findById(newuser._id).select(
      "-password"
    );

    if (createdUser) {
      res.status(200).send({
        success: true,
        createdUser,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const { secret } = req.body;
    const decode = await verifyJwt(secret, env.JWT_ACCESS_SECRET);
    if (decode?.id) {
      const UserId = new mongoose.Types.ObjectId(decode?.id);
      const returnUser: UserDTO = (await UserModel.findById(UserId).select(
        "-password"
      )) as UserDTO;
      if (!returnUser) {
        throw createHttpError(400, "Error user not found");
      }
      return res.status(200).send({
        success: true,
        returnUser,
      });
    } else {
      throw createHttpError(400, "Error user not found");
    }
  } catch (error) {
    next(error);
  }
};

export const LoginEmailController: RequestHandler<
  unknown,
  unknown,
  LoginWithEmailType,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    validateLoginWithEmail({ email, password });

    const user = await UserModel.findOne({ email });

    if (user && user.password) {
      const match = await bcrypt.compareSync(password, user?.password);
      if (match) {
        const accessToken = await generateAccessToken({ id: user?._id });
        const refreshToken = await generateRefreshToken({ id: user?._id });
        res.cookie("jwtRefresh", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          domain: env.FRONTEND_URL,
          secure: env.ENVIRONMENT === "Production",
          expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).send({
          success: true,
          accessToken: accessToken,
        });
      } else {
        throw createHttpError(500, "Incorrect Password");
      }
    } else {
      throw createHttpError(404, "User Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const AfterGoogleLogin: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      let user = req.user as UserDTO;
      const accessToken = await generateAccessToken({ id: user?._id });
      const refreshToken = await generateRefreshToken({ id: user?._id });
      res.cookie("jwtRefresh", refreshToken, {
        httpOnly: true,
        secure: env.ENVIRONMENT === "Production",
        domain: env.FRONTEND_URL,
        sameSite: "none",
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      });
      res.redirect(
        env.FRONTEND_URL +
          `/authorization?name=${user.name}&email=${user.email}&secret=${accessToken}`
      );
    } else throw createHttpError(400, "No user found in the stretegy");
  } catch (error) {
    next(error);
  }
};

// refreshing the jwts
export const refreshTokens: RequestHandler = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    const refreshToken = cookies.jwtRefresh;
    if (refreshToken) {
      const match = await verifyJwt(refreshToken, env.JWT_REFRESH_SECRET);
      if (match) {
        const userId = match.id as mongoose.Types.ObjectId;
        const returnUser = await UserModel.findById(userId);
        const newAccessToken = await generateAccessToken({
          id: returnUser?._id,
        });
        const newRefreshToken = await generateRefreshToken({
          id: returnUser?._id,
        });
        res
          .status(200)
          .cookie("jwtRefresh", newRefreshToken, {
            domain: env.FRONTEND_URL,
            httpOnly: true,
            sameSite: "none",
            secure: env.ENVIRONMENT === "Production",
            expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          })
          .send({
            success: true,
            accessToken: newAccessToken,
            returnUser,
          });
      } else {
      }
    } else throw createHttpError(400, "Refresh token does not exist");
  } catch (error) {
    next(error);
  }
};

export const isUserLoggedIn: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const match = await verifyJwt(token, env.JWT_ACCESS_SECRET);

      if (match) {
        const userId = new mongoose.Types.ObjectId(match.id);
        const foundUser = await UserModel.findById(userId);

        if (foundUser) {
          return res.status(200).send({
            success: true,
          });
        } else {
          throw createHttpError(401, "Unauthorized user");
        }
      } else {
        throw createHttpError(401, "Unauthorized user");
      }
    }
  } catch (error) {
    next(error);
  }
};

export const logoutController: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("jwtRefresh", {
      httpOnly: true,
      secure: env.ENVIRONMENT === "Production",
      domain: env.FRONTEND_URL,
    });
    res.send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
