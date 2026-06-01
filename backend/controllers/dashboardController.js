import Product from "../models/Product.js";
import Order from "../models/Order.js";
// import Transaction from "../models/Transaction.js";

export const getDashboardStats =
async (req, res) => {

try {

  // PRODUCTS

  const totalProducts =
    await Product.countDocuments();

  const lowStockProducts =
    await Product.countDocuments({
      stockQty: { $lt: 5 },
    });

  // ORDERS

  const totalOrders =
    await Order.countDocuments();

  const pendingOrders =
    await Order.countDocuments({
      orderStatus: "Processing",
    });

  const deliveredOrders =
    await Order.countDocuments({
      orderStatus: "Delivered",
    });

  // REVENUE

  const revenueData =
    await Order.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

  const totalRevenue =
    revenueData[0]?.total || 0;

  // TRANSACTIONS

  const failedPayments =
    await Transaction.countDocuments({
      paymentStatus: "Failed",
    });

  // RECENT ORDERS

  const recentOrders =
    await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

  // RECENT TRANSACTIONS

  const recentTransactions =
    await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5);

  res.json({
    totalProducts,
    lowStockProducts,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    totalRevenue,
    failedPayments,
    recentOrders,
    recentTransactions,
  });

} catch (error) {

  res.status(500).json({
    success: false,
    message: error.message,
  });

}


};
