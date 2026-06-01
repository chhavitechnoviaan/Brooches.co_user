// import ContactQuery from "../models/contactQuery.js";
// import Notification from "../models/Notification.js";


// // CREATE CONTACT QUERY
// export const createContactQuery =
//   async (req, res) => {

//     try {

//       const {
//         fullName,
//         email,
//         phone,
//         inquiryType,
//         subject,
//         message,
//       } = req.body;

//       // SAVE QUERY
//       const query =
//         await ContactQuery.create({
//           fullName,
//           email,
//           phone,
//           inquiryType,
//           subject,
//           message,
//         });

//       // CREATE ADMIN NOTIFICATION
//       await Notification.create({
//         title: "New Contact Inquiry",

//         message: `${fullName} sent a new inquiry regarding "${subject}"`,

//         category: "Customer Queries",

//         priority: "high",

//         relatedId: query._id,

//         type: "contact",
//       });
//     //       await Notification.create({
//     //   title: "New Customer Query",
//     //   message: `${user.name} asked about order #${orderId}`,
//     //   category: "Customer Queries",
//     //   priority: "high",
//     //   read: false,
//     //   queryId: query._id,
//     // });

//       res.status(201).json({
//         success: true,
//         message:
//           "Inquiry submitted successfully",
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };



// // GET ALL CONTACT QUERIES
// export const getContactQueries =
//   async (req, res) => {

//     try {

//       const queries =
//         await ContactQuery.find()
//           .sort({ createdAt: -1 });

//       res.status(200).json({
//         success: true,
//         queries,
//       });

//     } catch (error) {

//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

import ContactQuery from "../models/contactQuery.js";
import Notification from "../models/Notification.js";

// CREATE CONTACT QUERY
export const createContactQuery =
    async (req, res) => {
        try {
            const {
                fullName,
                email,
                phone,
                inquiryType,
                subject,
                message,
            } = req.body;

            // SAVE QUERY
            const query =
                await ContactQuery.create({
                    fullName,
                    email,
                    phone,
                    inquiryType,
                    subject,
                    message,
                });

            // CREATE ADMIN NOTIFICATION
            //   await Notification.create({
            //     title: "New Contact Inquiry",

            //     message: `${fullName} sent a new inquiry regarding "${subject}"`,

            //     category: "Customer Queries",

            //     priority: "high",

            //     relatedId: query._id,

            //     type: "contact",
            //   });

            await Notification.create({
                title: "New Contact Inquiry",

                message: `${fullName} sent a new inquiry regarding "${subject}"`,

                category: "Customer Queries",

                priority: "high",

                relatedId: query._id,

                type: "contact",

                customerName: fullName,

                customerEmail: email,

                phone: phone,
                subject: subject,
                queryMessage: message,

            });

            res.status(201).json({
                success: true,
                message:
                    "Inquiry submitted successfully",
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };


// GET ALL CONTACT QUERIES
export const getContactQueries =
    async (req, res) => {

        try {

            const queries =
                await ContactQuery.find()
                    .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                queries,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };


// REPLY TO QUERY
export const replyToQuery =
    async (req, res) => {

        try {

            const { reply } = req.body;

            // UPDATE QUERY
            const updatedQuery =
                await ContactQuery.findByIdAndUpdate(
                    req.params.id,
                    {
                        adminReply: reply,
                        replied: true,
                    },
                    { new: true }
                );

            // UPDATE NOTIFICATION
            await Notification.findOneAndUpdate(
                {
                    relatedId: req.params.id,
                },
                {
                    adminReply: reply,
                    replied: true,
                }
            );

            res.status(200).json({
                success: true,
                query: updatedQuery,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };