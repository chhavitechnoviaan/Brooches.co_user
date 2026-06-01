import express from "express";

import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getFilteredProducts,
  getProductsByCollection,
  getNewArrivalProducts,
  getTrendingProducts
} from "../controllers/productController.js";
import {
  upload,
} from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("images", 8),
  createProduct
);
// GET SINGLE PRODUCT
router.get("/all", getProducts);
router.get(
  "/new-arrivals",
  getNewArrivalProducts
);
router.get(
  "/trending",
  getTrendingProducts
);
router.get("/:id", getSingleProduct);

router.delete("/delete/:id", deleteProduct);
router.put(
  "/update/:id",
  upload.array("images", 8),
  updateProduct
);
router.get(
  "/filter/:productType/:category",
  getFilteredProducts
);
router.get(
  "/collection/:collection",
  getProductsByCollection
);

export default router;

