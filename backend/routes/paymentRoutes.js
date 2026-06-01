import express from 'express';
const router = express.Router();

import {
   capturePayment,
   razorpayWebhook,
   verifyPayment,
} from "../controllers/paymentController.js";

router.post("/capturePayment", capturePayment);
router.post("/verifyPayment",  verifyPayment);
router.post("/webhook", express.raw({ type: "application/json" }),  razorpayWebhook);

// router.post("/verifySignature", verifySignature)

export default router;