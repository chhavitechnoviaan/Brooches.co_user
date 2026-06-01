import Notification from "../models/Notification.js";

// GET ALL
export const getNotifications =
  async (req, res) => {

    try {

      const notifications =
        await Notification.find()
          .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        notifications,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


// MARK AS READ
export const markNotificationRead =
  async (req, res) => {

    try {

      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          read: true,
        }
      );

      res.status(200).json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
      });
    }
  };

// DELETE
export const deleteNotification =
  async (req, res) => {

    try {

      await Notification.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
      });
    }
  };

// MARK ALL READ
export const markAllRead =
  async (req, res) => {

    try {

      await Notification.updateMany(
        {},
        {
          read: true,
        }
      );

      res.status(200).json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
      });
    }
  };

// CLEAR ALL
export const clearNotifications =
  async (req, res) => {

    try {

      await Notification.deleteMany();

      res.status(200).json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
      });
    }
  };