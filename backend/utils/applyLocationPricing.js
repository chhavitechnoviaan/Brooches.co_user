import LocationPricing from "../models/LocationPricing.js";

const normalize = (str = "") =>
  str.toString().trim().toLowerCase();

export const getMarkupFromState = async (state = "") => {
  try {
    if (!state) return 0;

    const cleanState = decodeURIComponent(state)
      .trim()
      .toLowerCase();

    const location = await LocationPricing.findOne({
      $expr: {
        $eq: [
          { $toLower: "$state" },
          cleanState
        ]
      }
    });

    return location?.markupPercentage || 0;

  } catch (error) {
    console.error(error);
    return 0;
  }
};
export const applyLocationPricing = (products = [], markup = 0) => {
  if (!Array.isArray(products)) return [];

  return products.map((product) => {
    const salePrice = Number(product.salePrice) || 0;
    const regularPrice = Number(product.regularPrice) || 0;

    const priceMultiplier = 1 + markup / 100;

    return {
      ...product.toObject(),

      salePrice: Math.round(salePrice * priceMultiplier),
      regularPrice: Math.round(regularPrice * priceMultiplier),

      originalSalePrice: salePrice,
      originalRegularPrice: regularPrice,

      markupPercentage: markup,
    };
  });
};