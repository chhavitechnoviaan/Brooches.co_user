import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    // ADD TO CART
    addToCart: (state, action) => {

      const existingItem = state.cartItems.find(
        (item) => item.productId ===
action.payload.productId
      );

      if (existingItem) {

        existingItem.quantity += action.payload.quantity || 1;

      } else {

        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });

      }
    },

    // REMOVE
    removeFromCart: (state, action) => {

      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );

    },

    // INCREASE
    increaseQuantity: (state, action) => {

      const item = state.cartItems.find(
        (item) => item.productId === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

    },

    // DECREASE
    decreaseQuantity: (state, action) => {

      const item = state.cartItems.find(
        (item) => item.productId === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

    },

    // CLEAR CART
    clearCart: (state) => {
      state.cartItems = [];
    },
  // SET CART
    setCart: (state, action) => {
      state.cartItems = action.payload;

      localStorage.setItem(
        "cartItems",
        JSON.stringify(action.payload)
      );
    },

  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
setCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems:
//     JSON.parse(localStorage.getItem("cartItems")) || [],
// };

// const cartSlice = createSlice({
//   name: "cart",

//   initialState,

//   reducers: {
//     // ADD TO CART
//     addToCart: (state, action) => {
//       const item = action.payload;

//       const existingItem = state.cartItems.find(
//         (product) => product.id === item.id
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.cartItems.push({
//           ...item,
//           quantity: 1,
//         });
//       }

//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify(state.cartItems)
//       );
//     },

//     // REMOVE
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(
//         (item) => item.id !== action.payload
//       );

//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify(state.cartItems)
//       );
//     },

//     // INCREASE
//     increaseQuantity: (state, action) => {
//       const item = state.cartItems.find(
//         (product) => product.id === action.payload
//       );

//       if (item) {
//         item.quantity += 1;
//       }

//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify(state.cartItems)
//       );
//     },

//     // DECREASE
//     decreaseQuantity: (state, action) => {
//       const item = state.cartItems.find(
//         (product) => product.id === action.payload
//       );

//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }

//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify(state.cartItems)
//       );
//     },

//     // CLEAR
//     clearCart: (state) => {
//       state.cartItems = [];

//       localStorage.removeItem("cartItems");
//     },

//     // SET CART
//     setCart: (state, action) => {
//       state.cartItems = action.payload;

//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify(action.payload)
//       );
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
//   clearCart,
//   setCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;