import express from "express";
import {
  createAddress,
  getUserAddresses,
  deleteAddress,
} from "../controllers/addressController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  createAddress
);

router.get(
  "/user-addresses",
  authMiddleware,
  getUserAddresses
);

router.delete(
  "/delete/:id",
  authMiddleware,
  deleteAddress
);

export default router;