// import Product from "../models/Product.js";
// import fs from "fs";
// import path from "path";

// import {
//   createNotification,
// } from "../services/notificationService.js";

// // ========================================
// // CREATE PRODUCT
// // ========================================

// export const createProduct = async (
//   req,
//   res
// ) => {
//   try {

//     const baseUrl =
//       process.env.BASE_URL;
//     console.log(process.env.BASE_URL);
//     // IMAGE URLS
//     const imageUrls =
//       req.files?.map(
//         (file) =>
//           `${baseUrl}/uploads/products/${file.filename}`
//       ) || [];

//     // CREATE PRODUCT
//     const product = new Product({
//       ...req.body,

//       tags: JSON.parse(
//         req.body.tags || "[]"
//       ),

//       variants: JSON.parse(
//         req.body.variants || "[]"
//       ),

//       extraFields: JSON.parse(
//         req.body.extraFields || "[]"
//       ),

//       images: imageUrls,
//     });

//     await product.save();

//     // LOW STOCK NOTIFICATION
//     if (
//       product.stockQty <= 5
//     ) {

//       await createNotification({
//         title: "Low Stock Alert",

//         message: `${product.product} stock is very low`,

//         category: "Inventory",

//         priority: "high",

//         relatedId:
//           product._id,

//         type: "LOW_STOCK",
//       });

//     }

//     res.status(201).json({
//       success: true,
//       product,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// // ========================================
// // GET PRODUCTS
// // ========================================

// export const getProducts = async (
//   req,
//   res
// ) => {
//   try {

//     const products =
//       await Product.find().sort({
//         createdAt: -1,
//       });

//     res.status(200).json({
//       success: true,
//       products,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// // ========================================
// // UPDATE PRODUCT
// // ========================================

// export const updateProduct = async (
//   req,
//   res
// ) => {
//   try {

//     const product =
//       await Product.findById(
//         req.params.id
//       );

//     if (!product) {

//       return res.status(404).json({
//         success: false,
//         message:
//           "Product not found",
//       });

//     }

//     const baseUrl =
//       process.env.BASE_URL;

//     let imageUrls =
//       product.images;

//     // ====================================
//     // NEW IMAGES
//     // ====================================

//     if (
//       req.files &&
//       req.files.length > 0
//     ) {

//       // DELETE OLD IMAGES
//       product.images.forEach(
//         (img) => {

//           const filename =
//             img.split(
//               "/uploads/products/"
//             )[1];

//           if (!filename) return;

//           const filePath =
//             path.join(
//               process.cwd(),
//               "uploads",
//               "products",
//               filename
//             );

//           if (
//             fs.existsSync(filePath)
//           ) {

//             fs.unlinkSync(filePath);

//           }
//         }
//       );

//       // NEW IMAGE URLS
//       imageUrls =
//         req.files.map(
//           (file) =>
//             `${baseUrl}/uploads/products/${file.filename}`
//         );
//     }

//     // ====================================
//     // UPDATE PRODUCT
//     // ====================================

//     const updatedProduct =
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         {
//           ...req.body,

//           tags: JSON.parse(
//             req.body.tags || "[]"
//           ),

//           variants: JSON.parse(
//             req.body.variants || "[]"
//           ),

//           extraFields: JSON.parse(
//             req.body.extraFields ||
//             "[]"
//           ),

//           images: imageUrls,
//         },
//         {
//           new: true,
//         }
//       );

//     // ====================================
//     // LOW STOCK NOTIFICATION
//     // ====================================

//     if (
//       updatedProduct.stockQty <= 5
//     ) {

//       await createNotification({
//         title: "Low Stock Alert",

//         message: `${updatedProduct.product} stock is very low`,

//         category: "Inventory",

//         priority: "high",

//         relatedId:
//           updatedProduct._id,

//         type: "LOW_STOCK",
//       });

//     }

//     res.status(200).json({
//       success: true,
//       product:
//         updatedProduct,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// // ========================================
// // DELETE PRODUCT
// // ========================================

// export const deleteProduct = async (
//   req,
//   res
// ) => {
//   try {

//     const product =
//       await Product.findById(
//         req.params.id
//       );

//     if (!product) {

//       return res.status(404).json({
//         success: false,
//         message:
//           "Product not found",
//       });

//     }

//     // ====================================
//     // DELETE IMAGES
//     // ====================================

//     product.images.forEach(
//       (img) => {

//         const filename =
//           img.split(
//             "/uploads/products/"
//           )[1];

//         if (!filename) return;

//         const filePath =
//           path.join(
//             process.cwd(),
//             "uploads",
//             "products",
//             filename
//           );

//         if (
//           fs.existsSync(filePath)
//         ) {

//           fs.unlinkSync(filePath);

//         }
//       }
//     );

//     // DELETE PRODUCT
//     await Product.findByIdAndDelete(
//       req.params.id
//     );

//     res.status(200).json({
//       success: true,
//       message:
//         "Product Deleted Successfully",
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };


// export const getSingleProduct = async (
//   req,
//   res
// ) => {
//   try {

//     const product =
//       await Product.findById(
//         req.params.id
//       );

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       product,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };


import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import {
  createNotification,
} from "../services/notificationService.js";
import {
  getMarkupFromState,
  applyLocationPricing,
} from "../utils/applyLocationPricing.js";

export const createProduct = async (
  req,
  res
) => {
  try {

    let imageUrls = [];

    // ====================================
    // UPLOAD IMAGES TO CLOUDINARY
    // ====================================

    if (
      req.files &&
      req.files.length > 0
    ) {

      for (const file of req.files) {

        const result =
          await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString(
              "base64"
            )}`,
            {
              folder: "products",
            }
          );

        imageUrls.push(
          result.secure_url
        );
      }
    }

    // ====================================
    // CREATE PRODUCT
    // ====================================

    const product =
      new Product({
        ...req.body,

        tags: JSON.parse(
          req.body.tags || "[]"
        ),

        variants: JSON.parse(
          req.body.variants || "[]"
        ),

        extraFields:
          JSON.parse(
            req.body.extraFields ||
            "[]"
          ),

        images: imageUrls,
      });

    await product.save();

    // ====================================
    // LOW STOCK NOTIFICATION
    // ====================================

    if (
      product.stockQty <= 5
    ) {

      await createNotification({
        title:
          "Low Stock Alert",

        message: `${product.product} stock is very low`,

        category:
          "Inventory",

        priority: "high",

        relatedId:
          product._id,

        type:
          "LOW_STOCK",
      });

    }

    res.status(201).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};
// export const getProducts = async (
//   req,
//   res
// ) => {

//   try {

//     const products =
//       await Product.find().sort({
//         createdAt: -1,
//       });

//     res.status(200).json({
//       success: true,
//       products,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message:
//         error.message,
//     });

//   }
// };

export const getProducts = async (
  req,
  res
) => {
  try {

    const markup =
      await getMarkupFromState(
        req.query.state
      );

    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    const updatedProducts =
      applyLocationPricing(
        products,
        markup
      );

    res.status(200).json({
      success: true,
      products:
        updatedProducts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
export const getFilteredProducts =
  async (req, res) => {

    try {

      const {
        productType,
        category,
      } = req.params;

      const formattedProductType =
        productType
          .replace(/-/g, " ")
          .trim();

      const formattedCategory = decodeURIComponent(category)
        .replace(/-/g, " ")
        .trim();
      const query = {

        productType: {

          $regex:
            new RegExp(
              `^${formattedProductType}$`,
              "i"
            ),

        },

      };

      if (
        formattedCategory !==
        "all"
      ) {

        query.category = {

          $regex:
            new RegExp(
              `^${formattedCategory}$`,
              "i"
            ),

        };

      }

      console.log(query);

      // const products =
      //   await Product.find(
      //     query
      //   ).sort({
      //     createdAt: -1,
      //   });
      console.log(
        "State From Query:",
        req.query.state
      );

      const markup =
        await getMarkupFromState(
          req.query.state
        );

      console.log(
        "Markup Returned:",
        markup
      );

      const products =
        await Product.find(query)
          .sort({
            createdAt: -1,
          });

      const updatedProducts =
        applyLocationPricing(
          products,
          markup
        );

      console.log(
        "First Product Before:",
        products[0]?.salePrice
      );

      console.log(
        "First Product After:",
        updatedProducts[0]?.salePrice
      );

      res.status(200).json({
        success: true,
        products:
          updatedProducts,
      });


    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };
export const getSingleProduct =
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {

        return res
          .status(404)
          .json({
            success: false,
            message:
              "Product not found",
          });

      }

      res.status(200).json({
        success: true,
        product,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

export const updateProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });

    }

    let imageUrls =
      product.images;

    // ====================================
    // NEW IMAGES
    // ====================================

    if (
      req.files &&
      req.files.length > 0
    ) {

      // DELETE OLD CLOUDINARY IMAGES

      for (const img of product.images) {

        const splitUrl =
          img.split("/");

        const imageName =
          splitUrl[
            splitUrl.length - 1
          ].split(".")[0];

        await cloudinary.uploader.destroy(
          `products/${imageName}`
        );
      }

      // UPLOAD NEW IMAGES

      imageUrls = [];

      for (const file of req.files) {

        const result =
          await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString(
              "base64"
            )}`,
            {
              folder: "products",
            }
          );

        imageUrls.push(
          result.secure_url
        );
      }
    }

    // ====================================
    // UPDATE PRODUCT
    // ====================================

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,

          tags: JSON.parse(
            req.body.tags ||
            "[]"
          ),

          variants:
            JSON.parse(
              req.body
                .variants ||
              "[]"
            ),

          extraFields:
            JSON.parse(
              req.body
                .extraFields ||
              "[]"
            ),

          images:
            imageUrls,
        },
        {
          new: true,
        }
      );

    // ====================================
    // LOW STOCK NOTIFICATION
    // ====================================

    if (
      updatedProduct.stockQty <=
      5
    ) {

      await createNotification({
        title:
          "Low Stock Alert",

        message: `${updatedProduct.product} stock is very low`,

        category:
          "Inventory",

        priority:
          "high",

        relatedId:
          updatedProduct._id,

        type:
          "LOW_STOCK",
      });

    }

    res.status(200).json({
      success: true,
      product:
        updatedProduct,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};
export const deleteProduct = async (
  req,
  res
) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {

      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });

    }

    // ====================================
    // DELETE CLOUDINARY IMAGES
    // ====================================

    for (const img of product.images) {

      const splitUrl =
        img.split("/");

      const imageName =
        splitUrl[
          splitUrl.length - 1
        ].split(".")[0];

      await cloudinary.uploader.destroy(
        `products/${imageName}`
      );
    }

    // DELETE PRODUCT

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

// ====================================
// GET PRODUCTS BY PRIMARY COLLECTION
// ====================================

export const getProductsByCollection =
  async (req, res) => {

    try {

      const { collection } =
        req.params;

      const formattedCollection =
        collection
          .replace(/-/g, " ")
          .trim();

      // const products =
      //   await Product.find({
      //     primaryCollection: {
      //       $regex:
      //         new RegExp(
      //           `^${formattedCollection}$`,
      //           "i"
      //         ),
      //     },
      //   }).sort({
      //     createdAt: -1,
      //   });

      // res.status(200).json({
      //   success: true,
      //   products,
      // });
      const markup =
        await getMarkupFromState(
          req.query.state
        );

      const products =
        await Product.find({
          primaryCollection: {
            $regex:
              new RegExp(
                `^${formattedCollection}$`,
                "i"
              ),
          },
        }).sort({
          createdAt: -1,
        });

      const updatedProducts =
        applyLocationPricing(
          products,
          markup
        );

      res.status(200).json({
        success: true,
        products:
          updatedProducts,
      });
    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };

// ======================================
// GET NEW ARRIVAL CATEGORY PRODUCTS
// ======================================

export const getNewArrivalProducts =
  async (req, res) => {

    try {

      // const products =
      //   await Product.find({
      //     category:
      //       "New Arrival",
      //   }).sort({
      //     createdAt: -1,
      //   });

      // res.status(200).json({
      //   success: true,
      //   products,
      // });
      const markup =
        await getMarkupFromState(
          req.query.state
        );

      const products =
        await Product.find({
          category:
            "New Arrival",
        }).sort({
          createdAt: -1,
        });

      const updatedProducts =
        applyLocationPricing(
          products,
          markup
        );

      res.status(200).json({
        success: true,
        products:
          updatedProducts,
      });
    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };


export const getTrendingProducts =
  async (req, res) => {

    try {
      const markup =
        await getMarkupFromState(
          req.query.state
        );

      const products =
        await Product.find()
          .sort({
            soldCount: -1,
          })
          .limit(8);

      const updatedProducts =
        applyLocationPricing(
          products,
          markup
        );

      res.status(200).json({
        success: true,
        products:
          updatedProducts,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };