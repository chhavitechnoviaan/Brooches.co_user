import express from "express";
import {
  createCoupon,
  getCoupons,
  applyCoupon,
  deleteCoupon,
  getApplicableCoupons
} from "../controllers/couponController.js";

const router = express.Router();

router.post(
  "/create",
  createCoupon
);

router.get(
  "/all",
  getCoupons
);

router.post(
  "/apply",
  applyCoupon
);

// DELETE COUPON
router.delete(
  "/delete/:id",
  deleteCoupon
);

router.post(
  "/applicable",
  getApplicableCoupons
);
export default router;