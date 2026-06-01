// import User from "../models/User.js";
// import Order from "../models/Order.js";

// // GET ALL CUSTOMERS
// export const getAllCustomers = async (req, res) => {
//     try {

//         const users = await User.find({
//             role: "user",
//         }).sort({ createdAt: -1 });

//         const customers = await Promise.all(

//             users.map(async (user) => {

//                 // USER ORDERS
//                 const orders = await Order.find({
//                     user: user._id,
//                 }).sort({ createdAt: -1 });

//                 // TOTAL SPENT
//                 const totalSpent = orders.reduce(
//                     (acc, item) => acc + item.totalAmount,
//                     0
//                 );

//                 // TOTAL ORDERS
//                 const totalOrders = orders.length;

//                 // LAST ORDER
//                 const lastOrder =
//                     orders[0]?.createdAt || null;

//                 // LAST ORDER ID
//                 const lastOrderId =
//                     orders[0]?.orderId || "N/A";

//                 // REFUNDS
//                 const refunds = 0;

//                 // STATUS
//                 let status = "Active";

//                 if (
//                     !lastOrder ||
//                     new Date(lastOrder) <
//                     new Date(
//                         Date.now() -
//                         90 * 24 * 60 * 60 * 1000
//                     )
//                 ) {
//                     status = "Inactive";
//                 }

//                 // // LOYALTY
//                 // let loyalty = "Regular";

//                 // if (totalSpent >= 500000) {
//                 //   loyalty = "VIP ELITE";
//                 // } else if (totalSpent >= 100000) {
//                 //   loyalty = "VIP GOLD";
//                 // }
//                 // TAGS
//                 let tags = [];

//                 // NEW CUSTOMER
//                 if (loyalty === "New") {
//                     tags.push("New");
//                 }

//                 // VIP
//                 if (
//                     loyalty === "VIP GOLD" ||
//                     loyalty === "VIP ELITE"
//                 ) {
//                     tags.push("VIP");
//                 }

//                 // HIGH SPENDING
//                 if (totalSpent >= 100000) {
//                     tags.push("High Spending");
//                 }

//                 // INACTIVE
//                 if (status === "Inactive") {
//                     tags.push("Inactive");
//                 }

                

//                 return {
//                     id: user._id,

//                     name: user.name,

//                     email: user.email,

//                     phone: user.phone,

//                     address:
//                         orders[0]?.shippingAddress?.city ||
//                         "N/A",

//                     orders: totalOrders,

//                     spent: totalSpent,

//                     lastOrder: lastOrder,

//                     since: user.createdAt,

//                     status,

//                     loyalty,

//                     orderId: lastOrderId,

//                     refunds,

//                     coupons: [],

//                     tags,
//                 };
//             })
//         );

//         res.status(200).json({
//             success: true,
//             customers,
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

// // CUSTOMER STATS
// export const getCustomerStats = async (
//     req,
//     res
// ) => {
//     try {

//         const users = await User.find({
//             role: "user",
//         });

//         let vipMembers = 0;
//         let inactiveClients = 0;
//         let newCustomers = 0;

//         for (const user of users) {

//             const orders = await Order.find({
//                 user: user._id,
//             });

//             const totalSpent = orders.reduce(
//                 (acc, item) =>
//                     acc + item.totalAmount,
//                 0
//             );

//             const totalOrders = orders.length;

//             if (totalSpent >= 100000) {
//                 vipMembers++;
//             }

//             if (totalOrders <= 2) {
//                 newCustomers++;
//             }

//             const lastOrder =
//                 orders[0]?.createdAt || null;

//             if (
//                 !lastOrder ||
//                 new Date(lastOrder) <
//                 new Date(
//                     Date.now() -
//                     90 * 24 * 60 * 60 * 1000
//                 )
//             ) {
//                 inactiveClients++;
//             }
//         }

//         res.status(200).json({
//             success: true,

//             stats: {
//                 totalCustomers: users.length,

//                 vipMembers,

//                 inactiveClients,

//                 newCustomers,
//             },
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

import User from "../models/User.js";
import Order from "../models/Order.js";

// GET ALL CUSTOMERS
export const getAllCustomers = async (req, res) => {
  try {
    const users = await User.find({
      role: "user",
    }).sort({ createdAt: -1 });

    const customers = await Promise.all(
      users.map(async (user) => {
        // USER ORDERS
        const orders = await Order.find({
          user: user._id,
        }).sort({ createdAt: -1 });

        // TOTAL SPENT
        const totalSpent = orders.reduce(
          (acc, item) =>
            acc + (item.totalAmount || 0),
          0
        );

        // TOTAL ORDERS
        const totalOrders = orders.length;

        // LAST ORDER
        const lastOrder =
          orders[0]?.createdAt || null;

        // LAST ORDER ID
        const lastOrderId =
          orders[0]?.orderId || "N/A";

        // REFUNDS
        const refunds = 0;

        // STATUS
        let status = "Active";

        if (
          !lastOrder ||
          new Date(lastOrder) <
            new Date(
              Date.now() -
                90 * 24 * 60 * 60 * 1000
            )
        ) {
          status = "Inactive";
        }

        // =========================
        // LOYALTY LOGIC
        // =========================

        let loyalty = "New";

        // USER HAS 2+ ORDERS
        if (totalOrders >= 2) {
          loyalty = "Regular";
        }

        // MONTHLY ORDERS
        const oneMonthAgo = new Date();

        oneMonthAgo.setMonth(
          oneMonthAgo.getMonth() - 1
        );

        const monthlyOrders = orders.filter(
          (o) =>
            new Date(o.createdAt) >=
            oneMonthAgo
        ).length;

        // VIP GOLD
        if (
          monthlyOrders >= 4 ||
          totalSpent >= 100000
        ) {
          loyalty = "VIP GOLD";
        }

        // VIP ELITE
        if (
          monthlyOrders >= 8 ||
          totalSpent >= 500000
        ) {
          loyalty = "VIP ELITE";
        }

        // =========================
        // TAGS
        // =========================

        let tags = [];

        // NEW
        if (loyalty === "New") {
          tags.push("New");
        }

        // VIP
        if (
          loyalty === "VIP GOLD" ||
          loyalty === "VIP ELITE"
        ) {
          tags.push("VIP");
        }

        // HIGH SPENDING
        if (totalSpent >= 100000) {
          tags.push("High Spending");
        }

        // INACTIVE
        if (status === "Inactive") {
          tags.push("Inactive");
        }

        return {
          id: user._id,

          name: user.name,

          email: user.email,

          phone: user.phone,

          address:
            orders[0]?.shippingAddress
              ?.city || "N/A",

          orders: totalOrders,

          spent: totalSpent,

          lastOrder: lastOrder,

          since: user.createdAt,

          status,

          loyalty,

          orderId: lastOrderId,

          refunds,

          coupons: [],

          tags,
        };
      })
    );

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CUSTOMER STATS
export const getCustomerStats = async (
  req,
  res
) => {
  try {
    const users = await User.find({
      role: "user",
    });

    let vipMembers = 0;
    let inactiveClients = 0;
    let newCustomers = 0;

    for (const user of users) {
      const orders = await Order.find({
        user: user._id,
      }).sort({ createdAt: -1 });

      const totalSpent = orders.reduce(
        (acc, item) =>
          acc + (item.totalAmount || 0),
        0
      );

      const totalOrders = orders.length;

      // MONTHLY ORDERS
      const oneMonthAgo = new Date();

      oneMonthAgo.setMonth(
        oneMonthAgo.getMonth() - 1
      );

      const monthlyOrders = orders.filter(
        (o) =>
          new Date(o.createdAt) >=
          oneMonthAgo
      ).length;

      // VIP MEMBERS
      if (
        monthlyOrders >= 4 ||
        totalSpent >= 100000
      ) {
        vipMembers++;
      }

      // NEW CUSTOMERS
      if (totalOrders < 2) {
        newCustomers++;
      }

      // LAST ORDER
      const lastOrder =
        orders[0]?.createdAt || null;

      // INACTIVE
      if (
        !lastOrder ||
        new Date(lastOrder) <
          new Date(
            Date.now() -
              90 * 24 * 60 * 60 * 1000
          )
      ) {
        inactiveClients++;
      }
    }

    res.status(200).json({
      success: true,

      stats: {
        totalCustomers: users.length,

        vipMembers,

        inactiveClients,

        newCustomers,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};