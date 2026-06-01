import express from "express";
import {
  addReview,
  getProductReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post(
  "/add-review",
  addReview
);

router.get(
  "/product/:productId",
  getProductReviews
);

export default router;