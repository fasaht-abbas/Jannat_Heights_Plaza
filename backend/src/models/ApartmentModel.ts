import mongoose, { InferSchemaType, Schema } from "mongoose";

const appartSchema = new Schema(
  {
    no: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      enum: ["2nd", "3rd", "4rth", "5th", "6th"],
    },
  },
  { timestamps: true }
);

type Apart = InferSchemaType<typeof appartSchema>;

const ApartModel = mongoose.model<Apart>("appart", appartSchema);

export { Apart, ApartModel };
