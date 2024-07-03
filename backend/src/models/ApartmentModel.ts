import mongoose, { InferSchemaType, Schema } from "mongoose";

const appartSchema = new Schema(
  {
    no: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      enum: ["2", "3", "4", "5", "6"],
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    bookings: {
      type: mongoose.Types.ObjectId,
      ref: "booking",
    },
    //these booking would be of the type booking
    status: {
      type: String,
      enum: ["Booked", "Available"],
      default: "Available",
    },
  },
  { timestamps: true }
);

type Apart = InferSchemaType<typeof appartSchema>;

const ApartModel = mongoose.model<Apart>("apart", appartSchema);

export { Apart, ApartModel };
