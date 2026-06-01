// import mongoose from "mongoose";

// const contactQuerySchema =
//     new mongoose.Schema(
//         {
//             fullName: {
//                 type: String,
//                 required: true,
//             },

//             email: {
//                 type: String,
//                 required: true,
//             },

//             phone: {
//                 type: String,
//             },

//             inquiryType: {
//                 type: String,
//             },

//             subject: {
//                 type: String,
//                 required: true,
//             },

//             message: {
//                 type: String,
//                 required: true,
//             },
//         },
//         {
//             timestamps: true,
//         }
//     );

// export default mongoose.models.ContactQuery ||
//     mongoose.model(
//         "ContactQuery",
//         contactQuerySchema
//     );


import mongoose from "mongoose";

const contactQuerySchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
      },

      inquiryType: {
        type: String,
      },

      subject: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      // NEW
      adminReply: {
        type: String,
        default: "",
      },

      // NEW
      replied: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.ContactQuery ||
  mongoose.model(
    "ContactQuery",
    contactQuerySchema
  );