import Cart from "../models/Cart.js";

// GET USER CART
export const getCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.params.userId,
    });

    // NO CART
    if (!cart) {

      return res.send({
        success: true,
        cartItems: [],
      });
    }

    // ONLY SHOW ACTIVE ITEMS
    const activeCartItems =
      cart.items.filter(
        (item) => item.orderPlaced !== true
      );

    res.send({
      success: true,
      cartItems: activeCartItems,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

// ADD TO CART
export const addToCart = async (req, res) => {

  try {

    const { userId, product } = req.body;

    if (!userId) {

      return res.status(400).send({
        success: false,
        message: "User ID Required",
      });
    }

    let cart = await Cart.findOne({
      user: userId,
    });

    // CREATE NEW CART
    if (!cart) {

      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // FIND EXISTING ACTIVE ITEM
    const existingItem =
      cart.items.find(
        (item) =>
          item.productId.toString() ===
            product.productId.toString() &&
          item.orderPlaced !== true
      );

    // UPDATE QUANTITY
    if (existingItem) {

      existingItem.quantity +=
        product.quantity || 1;

    } else {

      // ADD NEW ITEM
      cart.items.push({
        productId: product.productId,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: product.quantity || 1,
        orderPlaced: false,
        orderedAt: null,
      });
    }

    await cart.save();

    // RETURN ONLY ACTIVE ITEMS
    const activeCartItems =
      cart.items.filter(
        (item) => item.orderPlaced !== true
      );

    res.status(200).send({
      success: true,
      message: "Item Added To Cart",
      cartItems: activeCartItems,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Add To Cart Failed",
    });
  }
};

// UPDATE CART QUANTITY
export const updateCartQuantity = async (req, res) => {

  try {

    const {
      userId,
      productId,
      quantity,
    } = req.body;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {

      return res.status(404).send({
        success: false,
        message: "Cart Not Found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.productId.toString() ===
          productId.toString() &&
        item.orderPlaced !== true
    );

    if (!item) {

      return res.status(404).send({
        success: false,
        message: "Item Not Found",
      });
    }

    item.quantity = quantity;

    // REMOVE IF 0
    if (quantity <= 0) {

      cart.items = cart.items.filter(
        (item) =>
          item.productId.toString() !==
            productId.toString() &&
          item.orderPlaced !== true
      );
    }

    await cart.save();

    const activeCartItems =
      cart.items.filter(
        (item) => item.orderPlaced !== true
      );

    res.send({
      success: true,
      cartItems: activeCartItems,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Update Failed",
    });
  }
};

// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {

  try {

    const { userId, productId } =
      req.body;

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {

      return res.status(404).send({
        success: false,
        message: "Cart Not Found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !==
          productId.toString()
    );

    await cart.save();

    const activeCartItems =
      cart.items.filter(
        (item) => item.orderPlaced !== true
      );

    res.send({
      success: true,
      cartItems: activeCartItems,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
    });
  }
};

// CLEAR USER CART
export const clearUserCart = async (req, res) => {

  try {

    await Cart.findOneAndUpdate(
      {
        user: req.params.userId,
      },
      {
        items: [],
      }
    );

    res.send({
      success: true,
      cartItems: [],
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
    });
  }
};

