import mongoose, { InferSchemaType, Schema } from "mongoose";

const textSchema = new Schema(
  {
    textName: {
      type: String,
      required: true,
    },
    textData: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type Text = InferSchemaType<typeof textSchema>;

const TextModel = mongoose.model<Text>("text", textSchema);

export { Text, TextModel };
