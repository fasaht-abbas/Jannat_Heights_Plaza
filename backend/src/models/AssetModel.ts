import mongoose, { InferSchemaType, Schema } from "mongoose";

const assetSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["video", "photo"],
    },
    for: {
      type: String,
      enum: ["studio", "Hall"],
    },
    link: {
      type: String,
      required: true,
    },
    cd_public_id: {
      type: String,
      required: true,
    },
    set_as_home_page: {
      type: String,
      enum: ["yes", "no"],
      required: true,
      default: "no",
    },
  },
  { timestamps: true }
);

type Asset = InferSchemaType<typeof assetSchema>;

const AssetModel = mongoose.model<Asset>("asset", assetSchema);

export { Asset, AssetModel };
