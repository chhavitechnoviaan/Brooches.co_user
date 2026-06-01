import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  orderPlaced: {
    type: Boolean,
    default: false,
  },

  orderedAt: {
    type: Date,
    default: null,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);