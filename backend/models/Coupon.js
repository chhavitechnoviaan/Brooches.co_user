// import mongoose from "mongoose";

// const couponSchema = new mongoose.Schema(
//   {
//     couponName: {
//       type: String,
//       required: true,
//       unique: true,
//       uppercase: true,
//     },

//     description: {
//       type: String,
//     },

//     discountType: {
//       type: String,
//       enum: ["PERCENTAGE", "FIXED"],
//       default: "PERCENTAGE",
//     },

//     discountValue: {
//       type: Number,
//       required: true,
//     },

//     minimumOrder: {
//       type: Number,
//       default: 0,
//     },

//     expiryDate: {
//       type: Date,
//       required: true,
//     },

//     usageLimit: {
//       type: Number,
//       default: 1,
//     },

//     usedCount: {
//       type: Number,
//       default: 0,
//     },

//     product: {
//       type: String,
//       default: "",
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     usedBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model(
//   "Coupon",
//   couponSchema
// );

import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        couponName: {
            type: String,
            required: true,
            uppercase: true,
            unique: true,
        },

        description: {
            type: String,
        },

        discountType: {
            type: String,
            enum: ["PERCENTAGE", "FIXED"],
            default: "PERCENTAGE",
        },

        discountValue: {
            type: Number,
            required: true,
        },

        minimumOrder: {
            type: Number,
            default: 0,
        },

        expiryDate: {
            type: Date,
        },

        usageLimit: {
            type: Number,
            default: 0,
        },

        usageLimitType: {
            type: String,
            enum: [
                "UNLIMITED",
                "FIRST_ORDER_ONLY",
                "LIMITED",
            ],
            default: "UNLIMITED",
        },


        applicableProducts: [
        {
          type: String,
        },
      ],

        usedCount: {
            type: Number,
            default: 0,
        },

        usedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
        applicableType: {
            type: String,
            enum: ["ALL", "SPECIFIC"],
            default: "ALL",
        },

        productType: {
            type: String,
        },

        selectedCategories: [
            {
                type: String,
            },
        ],

    },

    {
        timestamps: true,
    }
);

// export default mongoose.model(
//     "Coupon",
//     couponSchema
// );

const Coupon =
    mongoose.models.Coupon ||
    mongoose.model("Coupon", couponSchema);
export default Coupon;