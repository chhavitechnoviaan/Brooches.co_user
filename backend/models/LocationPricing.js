import mongoose from "mongoose";

const locationPricingSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      unique: true,
    },
    markupPercentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LocationPricing", locationPricingSchema);