import express from "express";

import {
  getCart,
  addToCart,
  updateCartQuantity,
  removeCartItem,
  clearUserCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get(
  "/:userId",
  getCart
);

router.post(
  "/add",
  addToCart
);

router.put(
  "/update",
  updateCartQuantity
);

router.delete(
  "/remove",
  removeCartItem
);

router.delete(
  "/clear/:userId",
  clearUserCart
);

export default router;