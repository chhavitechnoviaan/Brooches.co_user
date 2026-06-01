// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     fullName: String,
//     mobile: String,
//     email: String,

//     country: String,
//     state: String,
//     city: String,

//     zipCode: String,
//     address: String,
//     landmark: String,

//     isDefault: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model(
//   "Address",
//   addressSchema
// );

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    alternateMobile: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    zipCode: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    landmark: {
      type: String,
      default: "",
    },

    addressType: {
      type: String,
      enum: ["Home", "Office"],
      default: "Home",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model(
  "Address",
  addressSchema
);

export default Address;