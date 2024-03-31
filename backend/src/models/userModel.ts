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
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifiedPhone: {
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
