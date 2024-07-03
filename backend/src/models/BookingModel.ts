import mongoose, { InferSchemaType, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    booking_time: {
      type: Date,
      required: true,
    },
    // this iss not the final model feel free to modify it kion k ama ne tv chalaya hua hai
    status: {
      type: String,
      enum: ["Processing", "Confirmed", "Expired", "Canceled"],
      default: "Processing",
    },
    payment_meathod: {
      type: String,
      enum: ["advance", "on_check_in"],
    },
    payment_cleared: {
      type: Boolean,
      required: true,
      default: false,
    },
    payment_amount: {
      type: Number,
    },
    payment_receipt: {
      type: String,
    },
    apartment: {
      type: mongoose.Types.ObjectId,
      ref: "apart",
      required: true,
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

type Booking = InferSchemaType<typeof bookingSchema>;

const BookingModel = mongoose.model<Booking>("booking", bookingSchema);

export { Booking, BookingModel };
