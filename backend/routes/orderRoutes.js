import express from "express";

import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
  getOrderStats,
  getUserOrdersforadmin,
  getTransactions
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place-order", placeOrder);

router.put(
  "/update-status",
  updateOrderStatus
);
router.get("/user/:userId",getUserOrders);
router.get("/all", getAllOrders);
router.get("/stats",getOrderStats);
router.post("/users", getUserOrdersforadmin);
router.get(
  "/transactions",
  getTransactions
);
export default router;

