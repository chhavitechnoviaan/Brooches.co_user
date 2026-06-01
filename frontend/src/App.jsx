import React, { useEffect } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "./redux/slices/cartSlice";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import Account from "./pages/user/Account";
import TrackOrder from "./pages/user/TrackOrder";
import OrderHistory from "./pages/user/OrderHistory";
import ContactUs from "./components/home/ContactUs";
import ExploreNow from "./components/home/ExploreNow";
import ProductCart from "./components/product/ProductCart";
import CartSummary from "./components/cart/CartSummary";
import Wishlist from "./components/account/WishlistSection";
// import AdminSignup from './pages/admin/AdminSignup'
import AdminDashboard from './pages/admin/AdminDashboard'
// import AdminLogin from "./pages/admin/AdminLogin";
const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const user = JSON.parse(
  //         localStorage.getItem("user")
  //       );
  //       if (!user?._id) return;
  //       const response = await axios.get(
  //         `http://localhost:5000/api/cart/${user.id}`
  //       );
  //       if (response.data.success) {
  //         dispatch(
  //           setCart(response.data.items)
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchCart();
  // }, [dispatch]);

  return (
    <>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<ContactUs />}
        />

        {/* EXPLORE */}
        <Route
          path="/explore"
          element={<ExploreNow />}
        />

        <Route
          path="/explore/:category"
          element={<ExploreNow />}
        />
        <Route
          path="/explore/:productType/:category"
          element={<ExploreNow />}
        />
        <Route
          path="/explore/collection/:collection"
          element={<ExploreNow />}
        />
<Route
  path="/explore/new-arrivals"
  element={<ExploreNow />}
/>
        {/* PRODUCT */}
        <Route
          path="/productcart"
          element={<ProductCart />}
        />

        <Route
          path="/productcart/:id"
          element={<ProductCart />}
        />

        {/* CART */}
        <Route
          path="/cartsummary"
          element={<CartSummary />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* ACCOUNT */}
        <Route
          path="/account"
          element={<Account />}
        />

        {/* WISHLIST */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* TRACK ORDERS */}
        <Route
          path="/track-orders"
          element={<TrackOrder />}
        />

        {/* ORDER HISTORY */}
        <Route
          path="/ordershistory"
          element={<OrderHistory />}
        />

        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
        {/* <Route path="/admin-signup" element={<AdminSignup />} /> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/customer-orders/:userId"
          element={<OrderHistory />}
        />
      </Routes>
    </>
  );
};

export default App;