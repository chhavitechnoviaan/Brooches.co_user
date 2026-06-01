// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     // RANDOM ORDER ID
//     orderId: {
//       type: String,
//       unique: true,
//     },

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: [
//       {
//         id: String,
//         name: String,
//         image: String,
//         price: String,
//         quantity: Number,
//         productId: String,
//       },
//     ],

//     shippingAddress: {
//       fullName: String,
//       mobile: String,
//       email: String,
//       country: String,
//       state: String,
//       city: String,
//       zipCode: String,
//       address: String,
//       landmark: String,
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["COD", "ONLINE"],
//       default: "COD",
//     },

//     paymentStatus: {
//       type: String,
//       enum: [
//         "Pending",
//         "Paid",
//         "Failed",
//         "Refund",
//       ],
//       default: "Pending",
//     },

//     orderStatus: {
//       type: String,
//       enum: [
//         "Processing",
//         "Confirmed",
//         "Shipped",
//         "Delivered",
//       ],
//       default: "Processing",
//     },
//     trackingNumber: {
//       type: String,
//       default: "",
//     },
//     subtotal: Number,
//     shipping: Number,
//     discount: Number,
//     totalAmount: Number,
//     invoiceNumber: String,
//     deliveredAt: Date,
//     couponCode: {
//       type: String,
//       default: "",

//     },
//     discountAmount: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model(
//   "Order",
//   orderSchema
// );

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // RANDOM ORDER ID
    orderId: {
      type: String,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        id: String,
        name: String,
        image: String,
        price: String,
        quantity: Number,
        productId: String,
      },
    ],

    shippingAddress: {
      fullName: String,
      mobile: String,
      email: String,
      country: String,
      state: String,
      city: String,
      zipCode: String,
      address: String,
      landmark: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
        "Refund",
      ],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Processing",
        "Confirmed",
        "Shipped",
        "Delivered",
      ],
      default: "Processing",
    },

    trackingNumber: {
      type: String,
      default: "",
    },

    subtotal: Number,
    shipping: Number,
    discount: Number,
    totalAmount: Number,

    invoiceNumber: String,

    deliveredAt: Date,

    couponCode: {
      type: String,
      default: "",
    },

    discountAmount: {
      type: Number,
      default: 0,
    },
awbNumber: {
  type: String,
  default: "",
},

courierName: {
  type: String,
  default: "",
},

trackingUrl: {
  type: String,
  default: "",
},

shipmentId: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

const Order =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);

export default Order;


