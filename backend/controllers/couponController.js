import Coupon from "../models/Coupon.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
export const createCoupon = async (
  req,
  res
) => {
  try {
    const coupon =
      await Coupon.create(req.body);
    res.status(201).json({
      success: true,
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET ALL COUPONS
export const getCoupons = async (req, res) => {

  try {

    const coupons = await Coupon.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      coupons,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// APPLY COUPON
export const applyCoupon = async (
  req,
  res
) => {
  try {

    const {
      couponCode,
      subtotal,
      userId,
      products,
      isFirstOrder,
    } = req.body;

    const coupon =
      await Coupon.findOne({
        couponName:
          couponCode.toUpperCase(),
      });

    if (!coupon) {

      return res.status(404).json({
        success: false,
        message: "Invalid Coupon",
      });
    }

    if (!coupon.isActive) {

      return res.status(400).json({
        success: false,
        message: "Coupon Inactive",
      });
    }

    if (
      coupon.expiryDate &&
      new Date() >
      new Date(coupon.expiryDate)
    ) {

      return res.status(400).json({
        success: false,
        message: "Coupon Expired",
      });
    }

    if (
      subtotal < coupon.minimumOrder
    ) {

      return res.status(400).json({
        success: false,
        message: `Minimum order should be ₹${coupon.minimumOrder}`,
      });
    }

    // FIRST ORDER CHECK

    if (
      coupon.usageLimitType ===
      "FIRST_ORDER_ONLY" &&
      !isFirstOrder
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Coupon only for first order",
      });
    }

    // LIMITED CHECK

    if (
      coupon.usageLimitType ===
      "LIMITED"
    ) {

      if (
        coupon.usedCount >=
        coupon.usageLimit
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Coupon usage limit reached",
        });
      }
    }

    // PRODUCT CHECK

   // =========================
// CATEGORY CHECK
// =========================

// if (
//   coupon.applicableType ===
//   "SPECIFIC"
// ) {

//   // cart product ids
//   const cartProductIds =
//     products.map(
//       (item) => item.productId
//     );

//   // fetch cart products
//   const cartProducts =
//     await Product.find({
//       _id: {
//         $in: cartProductIds,
//       },
//     });

//   // cart categories
//   const cartCategories =
//     cartProducts.map(
//       (product) => product.category
//     );

//   console.log(
//     "Cart Categories:",
//     cartCategories
//   );

//   console.log(
//     "Coupon Categories:",
//     coupon.applicableProducts
//   );

//   // category match
//   const matched =
//     coupon.applicableProducts.some(
//       (category) =>
//         cartCategories.includes(
//           category
//         )
//     );

//   if (!matched) {

//     return res.status(400).json({
//       success: false,
//       message:
//         "Coupon not applicable on selected categories",
//     });
//   }
// }



if (
  coupon.applicableType === "SPECIFIC"
) {

  const cartProductIds =
    products.map(
      (item) => item.productId
    );

  const objectIds =
    cartProductIds.map(
      (id) =>
        new mongoose.Types.ObjectId(id)
    );

  const cartProducts =
    await Product.find({
      _id: {
        $in: objectIds,
      },
    });

  console.log(cartProducts);

  const cartCategories =
    cartProducts.map(
      (product) => product.category
    );

  console.log(
    "Cart Categories:",
    cartCategories
  );

  console.log(
    "Coupon Categories:",
    coupon.applicableProducts
  );

  const matched =
    coupon.applicableProducts.some(
      (category) =>
        cartCategories.some(
          (cartCat) =>
            cartCat
              ?.trim()
              .toLowerCase() ===
            category
              ?.trim()
              .toLowerCase()
        )
    );

  if (!matched) {

    return res.status(400).json({
      success: false,
      message:
        "Coupon not applicable on selected categories",
    });
  }
}
    let discount = 0;

    if (
      coupon.discountType ===
      "PERCENTAGE"
    ) {

      discount =
        (subtotal *
          coupon.discountValue) /
        100;

    } else {

      discount =
        coupon.discountValue;
    }

    res.status(200).json({
      success: true,
      discount,
      coupon,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE COUPON
export const deleteCoupon = async (
  req,
  res
) => {
  try {

    await Coupon.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Coupon deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET APPLICABLE COUPONS
export const getApplicableCoupons = async (
  req,
  res
) => {
  try {

    const {
      subtotal,
      products,
      isFirstOrder,
    } = req.body;

    const coupons = await Coupon.find({
      isActive: true,
    });

    const allCoupons = [];

    for (const coupon of coupons) {

      let isApplicable = true;

      let reason = "";


      if (
        coupon.expiryDate &&
        new Date() >
        new Date(coupon.expiryDate)
      ) {

        isApplicable = false;

        reason = "Coupon Expired";
      }


      else if (
        subtotal < coupon.minimumOrder
      ) {

        isApplicable = false;

        reason =
          `Minimum order should be ₹${coupon.minimumOrder}`;
      }


      else if (
        coupon.usageLimitType ===
        "FIRST_ORDER_ONLY" &&
        !isFirstOrder
      ) {

        isApplicable = false;

        reason =
          "Only valid for first order";
      }


      else if (
        coupon.usageLimitType ===
        "LIMITED" &&
        coupon.usedCount >=
        coupon.usageLimit
      ) {

        isApplicable = false;

        reason =
          "Coupon usage limit reached";
      }

      else if (
        coupon.applicableType === "SPECIFIC"
      ) {

        // cart product ids
        const cartProductIds = products.map(
          (item) => item.productId
        );

        // fetch products from DB
        const cartProducts = await Product.find({
          _id: { $in: cartProductIds }
        });

        // categories from cart
        const cartCategories = cartProducts.map(
          (product) => product.category
        );

        console.log("Cart Categories:", cartCategories);
        console.log(
          "Coupon Categories:",
          coupon.applicableProducts
        );

        // match category
        const matched =
          coupon.applicableProducts.some(
            (category) =>
              cartCategories.includes(category)
          );

        if (!matched) {

          isApplicable = false;

          reason =
            "Not applicable on selected categories";
        }
      }

      let discount = 0;

      if (isApplicable) {

        if (
          coupon.discountType ===
          "PERCENTAGE"
        ) {

          discount =
            (subtotal *
              coupon.discountValue) / 100;

        } else {

          discount =
            coupon.discountValue;
        }
      }

      allCoupons.push({
        ...coupon._doc,

        calculatedDiscount:
          Math.floor(discount),

        isApplicable,

        reason,
      });
    }

    res.status(200).json({
      success: true,
      coupons: allCoupons,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};