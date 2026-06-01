import {
  addReview as addReviewService,
  getReviews,
} from "../app/review.app.js";

import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const result = await addReviewService(req.body);

    return res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const result = await getReviews(
      req.params.productId
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};