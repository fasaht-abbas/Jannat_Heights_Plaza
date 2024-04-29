import mongoose, { InferSchemaType, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "customer"],
      default: "customer",
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    photo_cd_public_id: {
      type: String,
    },
    otp: {
      type: String,
      default: null,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    CNIC: {
      type: String,
    },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

const UserModel = mongoose.model<User>("user", userSchema);

export { User, UserModel };
