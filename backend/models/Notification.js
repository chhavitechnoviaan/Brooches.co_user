// import mongoose from "mongoose";

// const notificationSchema =
//   new mongoose.Schema(
//     {
//       title: {
//         type: String,
//         required: true,
//       },

//       message: {
//         type: String,
//         required: true,
//       },

//       // category: {
//       //   type: String,
//       //   enum: [
//       //     "Orders",
//       //     "Deliveries",
//       //     "Payments",
//       //     "Customers",
//       //     "Inventory",
//       //     "Returns & Refunds",
//       //     "Coupons & Offers",
//       //     "Security",
//       //     "Staff",
//       //     "SEO",
//       //   ],
//       // },
//       category: {
//         type: String,
//         enum: [
//           "Orders",
//           "Deliveries",
//           "Payments",
//           "Customers",
//           "Inventory",
//           "Returns & Refunds",
//           "Coupons & Offers",
//           "Security",
//           "Staff",
//           "SEO",
//           "Customer Queries",
//         ],
//       },

//       priority: {
//         type: String,
//         enum: ["high", "normal"],
//         default: "normal",
//       },

//       read: {
//         type: Boolean,
//         default: false,
//       },

//      relatedId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "ContactQuery",
// },

//       type: String,
//     },
//     {
//       timestamps: true,
//     }
//   );

// export default mongoose.model(
//   "Notification",
//   notificationSchema
// );

import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        enum: [
          "Orders",
          "Deliveries",
          "Payments",
          "Customers",
          "Inventory",
          "Returns & Refunds",
          "Coupons & Offers",
          "Security",
          "Staff",
          "SEO",
          "Customer Queries",
        ],
      },

      priority: {
        type: String,
        enum: ["high", "normal"],
        default: "normal",
      },

      read: {
        type: Boolean,
        default: false,
      },

      relatedId: String,

      type: String,

      // NEW
      customerName: String,

      // NEW
      customerEmail: String,

      // // NEW
      // customerPhone: String,

      // // NEW
      // customerMessage: String,
      phone: String,

      subject: String,

      queryMessage: String,
      // NEW
      adminReply: {
        type: String,
        default: "",
      },

      replied: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Notification",
  notificationSchema
);