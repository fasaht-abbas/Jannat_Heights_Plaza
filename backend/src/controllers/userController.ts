import { RequestHandler } from "express";
import { UserModel } from "../models/userModel";
import createHttpError from "http-errors";
import { sendMessage } from "../utils/nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const findUser: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send({
        success: true,
        account: "notFound",
      });
    }
    if (user?.googleId !== undefined || null) {
      return res.status(200).send({
        success: true,
        account: "gUser",
      });
    } else {
      return res.status(200).send({
        success: true,
        account: "eUser",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const sendOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return createHttpError(404, "User is not registered");
    }
    const OTP = Math.random().toString(36).slice(-6);
    const saved = await UserModel.findByIdAndUpdate(user?.id, {
      otp: OTP,
    });

    if (!saved) {
      return createHttpError(400, "Could not generate OTP");
    }

    const options = {
      to: email,
      subject: "OTP to verify your email account",
      message:
        `Hi ${user?.name},\n\n` +
        `Verify Your Email.` +
        `Please use the following token to verify your Email: ${OTP}\n\n` +
        `If you did not make this request, please ignore this email.\n\n` +
        `Best regards,\n` +
        `Team : Jannat Heights Plaza `,
    };

    await sendMessage(options);
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email, OTP } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return createHttpError(400, "could'nt Find user");
    }
    if (user?.otp === OTP) {
      const verified = await UserModel.findByIdAndUpdate(user?.id, {
        verifiedEmail: true,
        otp: null,
      });

      if (!verified) {
        return createHttpError(400, "Error in verifying the code");
      }
      return res.status(200).send({
        success: true,
      });
    } else return createHttpError(403, "Invalid or Expired Token");
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { id, name, phone, address, CNIC } = req.body;
    if (!id) {
      return createHttpError(404, "user error");
    }
    const userId = new mongoose.Types.ObjectId(id);
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return createHttpError(404, "user not found");
    } else if (req.file) {
      if (foundUser?.photo_cd_public_id) {
        await cloudinary.uploader.destroy(foundUser?.photo_cd_public_id);
      }
      const localPath = req.file?.path;
      console.log(localPath);
      const response = await uploadOnCloudinary(localPath);
      console.log(response);
      await UserModel.findByIdAndUpdate(userId, {
        profilePhoto: response?.secure_url,
        photo_cd_public_id: response?.public_id,
      });
    }
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      name: name,
      phone: phone,
      address: address,
      CNIC: CNIC,
    });

    if (!updateUser) {
      return createHttpError(400, "Could not update the user");
    }
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword: RequestHandler = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return createHttpError("Cannot change password something is missing");
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const hashedPassword = await bcrypt.hashSync(newPassword.toString(), 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).send({
        success: true,
      });
    } else {
      return createHttpError("User not found");
    }
  } catch (error) {
    next(error);
  }
};
