import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalCustomers =
      await User.countDocuments({
        role: "user",
      });

    const totalAdmins =
      await User.countDocuments({
        role: "admin",
      });

    const totalCoupons =
      await Coupon.countDocuments();

    const deliveredOrders =
      await Order.countDocuments({
        orderStatus: "Delivered",
      });

    const pendingOrders =
      await Order.countDocuments({
        orderStatus: "Processing",
      });

    // TOTAL REVENUE
    const revenueData = await Order.aggregate([
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

    // MONTHLY SALES
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          value: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id": 1,
        },
      },
    ]);

    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const formattedMonthlySales =
      monthlySales.map((item) => ({
        month: months[item._id - 1],
        value: item.value,
      }));

    // RECENT ORDERS
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      totalAdmins,
      totalCoupons,
      deliveredOrders,
      pendingOrders,
      monthlySales:
        formattedMonthlySales,
      recentOrders,

      orderPercent: 42,
      productPercent: 28,
      customerPercent: 15,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};