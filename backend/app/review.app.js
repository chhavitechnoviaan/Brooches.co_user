import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const addReview = async (body) => {
  const {
    userId,
    orderId,
    productId,
    rating,
    review,
  } = body;

  // Check delivered order
  const order = await Order.findOne({
    _id: orderId,
    userId,
    orderStatus: "Delivered",
  });

  if (!order) {
    throw new Error("Delivered order not found");
  }

  // Check product exists in order
  const orderedProduct = order.items.find(
    (item) =>
      item.productId.toString() === productId
  );

  if (!orderedProduct) {
    throw new Error(
      "Product not found in order"
    );
  }

  // Check already reviewed
  const existingReview =
    await Review.findOne({
      userId,
      orderId,
      productId,
    });

  if (existingReview) {
    throw new Error(
      "Review already submitted"
    );
  }

  const newReview =
    await Review.create({
      userId,
      orderId,
      productId,
      rating,
      review,
    });

  // Recalculate rating
  const reviews = await Review.find({
    productId,
  });

  const totalRating = reviews.reduce(
    (sum, item) =>
      sum + item.rating,
    0
  );

  const avgRating =
    totalRating / reviews.length;

  await Product.findByIdAndUpdate(
    productId,
    {
      averageRating: Number(
        avgRating.toFixed(1)
      ),
      totalReviews:
        reviews.length,
    }
  );

  return newReview;
};

export const getReviews = async (
  productId
) => {
  return await Review.find({
    productId,
  })
    .populate(
      "userId",
      "name profileImage"
    )
    .sort({
      createdAt: -1,
    });
};