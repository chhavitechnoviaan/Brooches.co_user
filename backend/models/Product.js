import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  material: String,
  gemstone: String,
  stock: Number,
});

const extraFieldSchema = new mongoose.Schema({
  label: String,
  value: String,
});

const productSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },

    urlSlug: String,

    skuCode: String,

    craftsmanshipDetails: String,

    // ADD THIS
    productType: {
      type: String,
      default: "BROOCHES",
    },

    // ADD THIS
    category: {
      type: String,
      default: "New Arrival",
    },

    primaryCollection: String,

    tags: [String],

    featuredOnHomepage: Boolean,

    newArrivalBadge: Boolean,

    limitedEditionSeries: Boolean,

    weight: String,

    insuranceVal: String,

    regularPrice: Number,

    salePrice: Number,

    inventoryStatus: String,

    stockQty: Number,

    trackQuantities: Boolean,

    currency: String,

    seoDescription: String,

    variants: [variantSchema],

    extraFields: [extraFieldSchema],

    images: [String],

    soldCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// export default mongoose.model("Product", productSchema);
const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);
export default Product;
