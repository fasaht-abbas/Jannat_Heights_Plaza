import { RequestHandler } from "express";
import { User, UserModel } from "../models/userModel";
import createHttpError from "http-errors";
import { sendMessage, transporter } from "../utils/nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { env } from "../utils/validate";

export const findUser: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
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
      throw createHttpError(404, "User is not registered");
    }
    const OTP = Math.random().toString(36).slice(-6);
    const saved = await UserModel.findByIdAndUpdate(user?.id, {
      otp: OTP,
    });

    if (!saved) {
      throw createHttpError(400, "Could not generate OTP");
    }

    const options = {
      from: "Jannat Heights Plaza <jannatheights@gmail.com>",
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
      throw createHttpError(400, "could'nt Find user");
    }
    if (user?.otp === OTP) {
      const verified = await UserModel.findByIdAndUpdate(user?.id, {
        verifiedEmail: true,
        otp: null,
      });

      if (!verified) {
        throw createHttpError(400, "Error in verifying the code");
      }
      return res.status(200).send({
        success: true,
      });
    } else throw createHttpError(403, "Invalid or Expired Token");
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { id, name, phone, address, CNIC } = req.body;
    if (!id) {
      throw createHttpError(404, "user error");
    }
    const userId = new mongoose.Types.ObjectId(id);
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      throw createHttpError(404, "user not found");
    } else if (req.file) {
      if (foundUser?.photo_cd_public_id) {
        await cloudinary.uploader.destroy(foundUser?.photo_cd_public_id);
      }
      const localPath = req.file?.path;
      const response = await uploadOnCloudinary(localPath);
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
      throw createHttpError(400, "Could not update the user");
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
      throw createHttpError("Cannot change password something is missing");
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
      throw createHttpError("User not found");
    }
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    type ArrayUsers = User[];
    const users: ArrayUsers = await UserModel.find({});
    if (users) {
      res.status(200).send({
        success: true,
        users,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const UpdateUserRole: RequestHandler = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const { role } = req.body;

    if (!uid) {
      throw createHttpError(404, "Could not find userId");
    }

    if (!role) {
      throw createHttpError(404, "Could not find role");
    }
    const id = new mongoose.Types.ObjectId(uid);
    await UserModel.findByIdAndUpdate(id, {
      role: role,
    });
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const ContactUsMail: RequestHandler = async (req, res, next) => {
  try {
    const { name, sender, message } = req.body;

    await sendMessage({
      from: env?.NODEMAILER_GMAIL_USER,
      to: env?.NODEMAILER_GMAIL_USER,
      subject: `Contact Form Message from ${name} ${sender}`,
      message: message,
    });
    res
      .status(200)
      .send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    next(error);
  }
};

export const search: RequestHandler = async (req, res, next) => {
  try {
    const { query } = req.params;

    if (!query) {
      throw createHttpError(400, "Query is required");
    }

    const result = await UserModel.find({
      $or: [{ email: { $regex: query, $options: "i" } }],
    });

    res.status(200).send({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};
