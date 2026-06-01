import express from "express";
import {
  getMarkupFromState,
} from "../controllers/locationController.js";

const router = express.Router();

router.get(
  "/:state",
  getMarkupFromState
);

export default router;