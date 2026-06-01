import Settings from "../models/Settings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


// GET SETTINGS
export const getSettings = async (req, res) => {
  try {

    const admin = await User.findById(req.user.id);

    let settings = await Settings.findOne();

    if (!settings) {

      settings = await Settings.create({
        storeName: "Brooches Luxury",
        adminEmail: admin.email,
        phone: admin.phone,
      });

    }

    res.status(200).json({
      success: true,
      settings,
      admin,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// UPDATE SETTINGS
// export const updateSettings = async (req, res) => {

//   try {

//     const {
//       storeName,
//       adminEmail,
//       phone,
//       password,
//       shippingCharge,
//       currency,
//       notifications,
//       securityAlerts,
//     } = req.body;

//     // FIND ADMIN
//     const admin = await User.findById(req.user.id);

//     // UPDATE USER
//     admin.email = adminEmail;
//     admin.phone = phone;

//     if (password && password.trim() !== "") {

//       const hashedPassword =
//         await bcrypt.hash(password, 10);

//       admin.password = hashedPassword;

//     }

//     await admin.save();

//     // FIND SETTINGS
//     let settings = await Settings.findOne();

//     settings.storeName = storeName;
//     settings.adminEmail = adminEmail;
//     settings.phone = phone;
//     settings.shippingCharge = shippingCharge;
//     settings.currency = currency;
//     settings.notifications = notifications;
//     settings.securityAlerts = securityAlerts;

//     await settings.save();

//     res.status(200).json({
//       success: true,
//       message: "Settings updated successfully",
//       settings,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// };
export const updateSettings = async (req, res) => {

  try {

    const admin = await User.findById(req.user.id);

    const settings = await Settings.findOne();

    // ===== USER UPDATE =====

    if (
      req.body.name &&
      req.body.name !== admin.name
    ) {
      admin.name = req.body.name;
    }

    if (
      req.body.phone &&
      req.body.phone !== admin.phone
    ) {
      admin.phone = req.body.phone;
    }

    if (
      req.body.password &&
      req.body.password.trim() !== ""
    ) {

      const hashedPassword =
        await bcrypt.hash(req.body.password, 10);

      admin.password = hashedPassword;
    }

    await admin.save();

    // ===== SETTINGS UPDATE =====

    if (
      req.body.storeName &&
      req.body.storeName !== settings.storeName
    ) {
      settings.storeName = req.body.storeName;
    }

    if (
      req.body.phone &&
      req.body.phone !== settings.phone
    ) {
      settings.phone = req.body.phone;
    }

    if (
      req.body.shippingCharge !== undefined &&
      req.body.shippingCharge !== settings.shippingCharge
    ) {
      settings.shippingCharge =
        req.body.shippingCharge;
    }

    if (
      req.body.currency &&
      req.body.currency !== settings.currency
    ) {
      settings.currency = req.body.currency;
    }

    if (
      req.body.notifications !== settings.notifications
    ) {
      settings.notifications =
        req.body.notifications;
    }

    if (
      req.body.securityAlerts !== settings.securityAlerts
    ) {
      settings.securityAlerts =
        req.body.securityAlerts;
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Only changed fields updated",
      admin,
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};