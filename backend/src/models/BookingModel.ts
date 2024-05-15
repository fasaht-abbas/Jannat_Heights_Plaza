import mongoose, { InferSchemaType, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    refId: {
      type: String,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    // this iss not the final model feel free to modify it kion k ama ne tv chalaya hua hai
    payment: {
      advance: {
        amount: String,
        status: ["clear", "pending"],
      },
      remaining: {
        amount: String,
        status: ["clear", "pending"],
      },
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
