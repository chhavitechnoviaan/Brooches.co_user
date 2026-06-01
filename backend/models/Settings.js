import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: "Brooches Luxury",
    },

    adminEmail: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    shippingCharge: {
      type: Number,
      default: 100,
    },

    currency: {
      type: String,
      default: "INR",
    },

    notifications: {
      type: Boolean,
      default: true,
    },

    securityAlerts: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model(
  "Settings",
  settingsSchema
);

export default Settings;