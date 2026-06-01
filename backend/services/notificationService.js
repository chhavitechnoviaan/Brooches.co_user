import Notification from "../models/Notification.js";

export const createNotification =
  async ({
    title,
    message,
    category,
    priority = "normal",
    relatedId = "",
    type = "",
  }) => {

    try {

      await Notification.create({
        title,
        message,
        category,
        priority,
        relatedId,
        type,
      });

    } catch (error) {

      console.log(
        "Notification Error:",
        error.message
      );
    }
  };