import express from "express";

import {
  getAllCustomers,
  getCustomerStats,
} from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/all-customers",
  getAllCustomers
);

router.get(
  "/customer-stats",
  getCustomerStats
);

export default router;