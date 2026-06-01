import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/pincode/:pin
router.get("/:pin", async (req, res) => {
  try {
    const { pin } = req.params;

    if (!/^\d{6}$/.test(pin)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pincode format",
      });
    }

    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pin}`
    );

    const data = response?.data?.[0];

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }

    return res.json({
      success: true,
      status: data.Status,
      postOffices: data.PostOffice || [],
    });

  } catch (error) {
    console.log("Pincode API Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while validating pincode",
    });
  }
});

export default router;