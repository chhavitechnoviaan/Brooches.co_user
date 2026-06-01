import express from "express";

import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
  markAllRead,
  clearNotifications,
  // getNotificationDetails
} from "../controllers/notificationController.js";

const router = express.Router();

router.get(
  "/",
  getNotifications
);

router.put(
  "/read/:id",
  markNotificationRead
);

router.put(
  "/read-all",
  markAllRead
);

router.delete(
  "/:id",
  deleteNotification
);

router.delete(
  "/clear/all",
  clearNotifications
);

// router.get(
//   "/getNotificationDetails",
//   getNotificationDetails
// );

export default router;