import { instance } from "../config/razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const capturePayment = async (req, res) => {
  const { currency, amount } = req.body;

  try {
    let total_amount = 0;

    total_amount += Number(amount);
    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);
    // console.log('paymentResponse',paymentResponse)

    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // const userId = req.user.id

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(200)
        .json({ success: false, message: "Payment Failed" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(200).json({ success: false, message: "Payment Failed" });
  } catch (err) {
    console.log("errr", err);
    return res.status(500).json({ success: false, message: "Network Error" });
  }
};

export const razorpayWebhook = async (req, res) => {
  console.log("webhook ");
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const digest = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== digest) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // const event = JSON.parse(req.body).event;
    const event = req.body.event;

    if (event === "payment.captured") {
      // const payment = JSON.parse(req.body).payload.payment.entity;
      const payment = req.body.payload.payment.entity;

      console.log("💰 Payment Captured:", payment.amount / 100);
    }

    res.json({ status: "ok", ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
};