
import React, { useEffect, useState } from "react";
import {
  Check,
  Lock,
  Heart,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import {
  removeFromCart,
  setCart,
} from "../../redux/slices/cartSlice";
import {
  addToWishlist,
} from "../../redux/slices/wishlistSlice";
import placeholder from "../../assets/images/placeholder.jpg";

const deliveryOptions = [
  {
    id: 1,
    title: "Standard",
    time: "5-8 business days",
    price: 0,
  },
  {
    id: 2,
    title: "Express",
    time: "1-2 business days",
    price: 25,
  },
  {
    id: 3,
    title: "Priority",
    time: "Same day delivery",
    price: 45,
  },
];

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid #d9d4cf",
    borderRadius: 0,
    boxShadow: "none",
    minHeight: "48px",
    paddingLeft: "0px",
    cursor: "pointer",
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: "0px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
    fontSize: "16px",
    fontFamily: '"Cormorant Garamond", serif',
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#111827",
    fontSize: "18px",
    fontFamily: '"Cormorant Garamond", serif',
  }),

  input: (provided) => ({
    ...provided,
    color: "#111827",
    fontSize: "18px",
    fontFamily: '"Cormorant Garamond", serif',
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    borderRadius: "18px",
    overflow: "hidden",
    marginTop: "10px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "#f5efe6"
      : "white",
    color: "#111827",
    fontSize: "17px",
    padding: "14px 18px",
    cursor: "pointer",
    fontFamily: '"Cormorant Garamond", serif',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#8b6b08",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

export default function CartSummary() {
  const normalizeAddress = (address) => {
    if (!address) return address;

    const countryObj = Country.getAllCountries().find(
      (c) => c.name === address.country
    );

    if (!countryObj) return address;

    const stateList = State.getStatesOfCountry(countryObj.isoCode);

    const stateObj = stateList.find(
      (s) =>
        s.name === address.state ||
        s.isoCode === address.state
    );

    return {
      ...address,
      state: stateObj?.name || address.state,
    };
  };
  const dispatch = useDispatch();
  const location = useLocation();

  // ========================
  // USER
  // ========================

  const storedUser =
    localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;
  const userId = user?.id;

  const isLoggedIn = !!user;

  // ========================
  // REDUX
  // ========================

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  // ========================
  // STATES
  // ========================

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [showLoginPopup, setShowLoginPopup] =
    useState(false);

  const [selectedMode, setSelectedMode] =
    useState("default");

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [selectedDelivery, setSelectedDelivery] =
    useState(1);

  const [activeStep, setActiveStep] =
    useState(isLoggedIn ? 2 : 1);

  const [addressCompleted, setAddressCompleted] =
    useState(false);

  const [savedAddresses, setSavedAddresses] =
    useState([]);

  const [selectedAddressId, setSelectedAddressId] =
    useState("");

  const [showNewAddressForm, setShowNewAddressForm] =
    useState(false);

  const [countries, setCountries] =
    useState([]);

  const [states, setStates] =
    useState([]);

  const [cities, setCities] =
    useState([]);

  const [couponCode, setCouponCode] =
    useState("");

  const [couponDiscount, setCouponDiscount] =
    useState(0);

  const [appliedCoupon, setAppliedCoupon] =
    useState(null);

  const [coupons, setCoupons] =
    useState([]);
  const [couponLoading, setCouponLoading] = useState(false);
  const [shippingData, setShippingData] =
    useState({
      fullName: "",
      mobile: "",
      alternateMobile: "",
      email: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      address: "",
      landmark: "",
      addressType: "Home",
      isDefault: false,
    });

  // ========================
  // TOTALS
  // ========================

  const subtotal = cartItems.reduce((total, item) => {
    const price =
      typeof item.price === "number"
        ? item.price
        : Number(String(item.price || 0).replace(/[₹,]/g, ""));

    return total + price * item.quantity;
  }, 0);

  const shipping =
    deliveryOptions.find(
      (option) =>
        option.id === selectedDelivery
    )?.price || 0;

  const discount = couponDiscount;

  const finalTotal =
    subtotal + shipping - discount;

  // ========================
  // EFFECTS
  // ========================

  useEffect(() => {

    setCountries(
      Country.getAllCountries()
    );

  }, []);

  useEffect(() => {

    if (isLoggedIn) {

      fetchCart();
      fetchAddresses();

    }

  }, [isLoggedIn]);

  useEffect(() => {

    if (cartItems.length > 0) {

      fetchApplicableCoupons();

    }

  }, [cartItems, subtotal]);

  useEffect(() => {

    if (!isLoggedIn) {

      const timer = setTimeout(() => {

        setShowLoginPopup(true);

      }, 3000);

      return () => clearTimeout(timer);

    }

  }, [isLoggedIn]);

  // ========================
  // API FUNCTIONS
  // ========================
// const validatePincode = async (pincode) => {
//   try {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/pincode/${pincode}`
//     );

//     return response.data?.status === "Success";
//   } catch (error) {
//     console.log("Pincode validation error:", error);
//     return false;
//   }
// };

const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!userId) return;

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/cart/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      dispatch(setCart(response.data.cartItems));
    }
  } catch (error) {
    console.log("fetchCart error:", error);
  }
};

const fetchAddresses = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/address/user-addresses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {

      setSavedAddresses(
        response.data.addresses
      );

      if (
        response.data.addresses.length > 0
      ) {

        const defaultAddress =
          response.data.addresses.find(
            (item) => item.isDefault
          ) || response.data.addresses[0];

        setSelectedAddressId(
          defaultAddress._id
        );

        setShippingData(normalizeAddress(defaultAddress));
        const countryObj =
          Country.getAllCountries().find(
            (country) =>
              country.name === defaultAddress.country
          );

        if (countryObj) {

          const stateList =
            State.getStatesOfCountry(
              countryObj.isoCode
            );

          setStates(stateList);

          const stateObj =
            stateList.find(
              (state) =>
                state.name === defaultAddress.state
            );

          if (stateObj) {

            setCities(
              City.getCitiesOfState(
                countryObj.isoCode,
                stateObj.isoCode
              )
            );
          }
        }

        setAddressCompleted(true);

      }

    }

  } catch (error) {

    console.log(error);

  }

};

const fetchApplicableCoupons =
  async () => {

    try {

      const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/coupons/applicable`,
          {
            subtotal,
            products: cartItems,
            isFirstOrder: true,
          }
        );

      if (response.data.success) {

        setCoupons(
          response.data.coupons
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

// ========================
// HANDLERS
// ========================

const handleChange = (e) => {

  const {
    name,
    value,
    type,
    checked,
  } = e.target;

  setShippingData({
    ...shippingData,
    [name]:
      type === "checkbox"
        ? checked
        : value,
  });

};

// const handleApplyCoupon =
//   async () => {
const handleApplyCoupon = async (code = couponCode) => {
  if (couponLoading) return;

  setCouponLoading(true);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/coupons/apply`,
      {
        couponCode: code,
        subtotal,
        userId,
        products: cartItems,
        isFirstOrder: true,
      }
    );

    if (response.data.success) {
      setCouponDiscount(response.data.discount);
      setAppliedCoupon(response.data.coupon);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: error.response?.data?.message,
    });
  } finally {
    setCouponLoading(false);
  }
};

const handleRemoveItem = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/cart/remove`,
      {
        data: {
          userId,
          productId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      dispatch(setCart(response.data.cartItems));
    }
  } catch (error) {
    console.log("remove item error:", error);
  }
};

const handleUpdateQuantity = async (productId, quantity) => {
  if (quantity < 1) return;

  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/cart/update`,
      {
        userId,
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      dispatch(setCart(response.data.cartItems));
    }
  } catch (error) {
    console.log("update qty error:", error);
  }
};
const handleSaveAddress =
  async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/address/add`,
          shippingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (response.data.success) {

        Swal.fire({
          icon: "success",
          title: "Address Saved",
        });

        fetchAddresses();

        setShowNewAddressForm(false);

      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });

    }

  };
// ========================
// API FUNCTIONS
// ========================


const handleContinueToPayment = async () => {

  if (cartItems.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Cart Empty",
      text: "Please add items to cart",
    });
    return;
  }

  const requiredFields = [
    "fullName",
    "mobile",
    "email",
    "country",
    "state",
    "city",
    "zipCode",
    "address",
  ];

  for (const field of requiredFields) {
    if (!shippingData[field]) {
      Swal.fire({
        icon: "warning",
        title: "Missing Field",
        text: `Please fill ${field}`,
      });
      return;
    }
  }

  // EMAIL VALIDATION
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      shippingData.email
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  }

  // INDIA MOBILE VALIDATION
  if (
    shippingData.country?.toLowerCase() ===
    "india"
  ) {

    if (!/^[6-9]\d{9}$/.test(shippingData.mobile)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10 digit mobile number",
      });
      return;
    }

    // INDIA PINCODE VALIDATION
    if (!/^\d{6}$/.test(shippingData.zipCode)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Pincode",
        text: "Pincode must contain exactly 6 digits",
      });
      return;
    }

    // const validPincode = await validatePincode(
    //   shippingData.zipCode
    // );

    // if (!validPincode) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid Pincode",
    //     text: "This pincode does not exist",
    //   });
    //   return;
    // }
  }
if (!/^\d{6}$/.test(shippingData.zipCode)) {
  Swal.fire({
    icon: "error",
    title: "Invalid Pincode",
    text: "Pincode must be 6 digits only",
  });
  return;
}
  setAddressCompleted(true);
  setActiveStep(3);
};

const handlePlaceOrder = async () => {

  if (!userId) {
    Swal.fire({
      icon: "error",
      title: "Login Required",
    });
    return;
  }
  if (placingOrder) return;

  if (cartItems.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Cart Empty",
      text: "Cannot place order with empty cart",
    });
    return;
  }

  // REQUIRED FIELDS
  const requiredFields = [
    "fullName",
    "mobile",
    "email",
    "country",
    "state",
    "city",
    "zipCode",
    "address",
  ];

  for (const field of requiredFields) {
    if (!shippingData[field]) {
      Swal.fire({
        icon: "warning",
        title: "Missing Field",
        text: `Please fill ${field}`,
      });
      return;
    }
  }

  // EMAIL VALIDATION
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      shippingData.email
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  }

  // INDIA VALIDATION
  if (
    shippingData.country?.toLowerCase() ===
    "india"
  ) {

    if (!/^[6-9]\d{9}$/.test(shippingData.mobile)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Please enter a valid 10 digit mobile number",
      });
      return;
    }

    if (!/^\d{6}$/.test(shippingData.zipCode)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Pincode",
        text: "Pincode must contain exactly 6 digits",
      });
      return;
    }
if (!/^\d{6}$/.test(shippingData.zipCode)) {
  Swal.fire({
    icon: "error",
    title: "Invalid Pincode",
    text: "Pincode must be 6 digits only",
  });
  return;
}
    // const validPincode = await validatePincode(
    //   shippingData.zipCode
    // );

    // if (!validPincode) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid Pincode",
    //     text: "This pincode does not exist",
    //   });
    //   return;
    // }
  }

  try {

    setPlacingOrder(true);
    setLoading(true);

    const token =
      localStorage.getItem("token");
    const cleanShippingAddress = normalizeAddress(shippingData);
    const response =
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/place-order`,
        {
          user: user?.id,
          items: cartItems,
          shippingAddress: cleanShippingAddress,
          subtotal,
          shipping,
          discount,
          totalAmount: finalTotal,
          paymentMethod,
          couponCode:
            appliedCoupon?.couponName || "",
          discountAmount:
            couponDiscount || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    if (response.data.success) {

      await fetchCart();

      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text:
          "Your order has been placed successfully",
      });

      setActiveStep(4);
    }

  } catch (error) {

    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Order Failed",
      text:
        error.response?.data?.message ||
        "Something went wrong",
    });

  } finally {

    setLoading(false);
    setPlacingOrder(false);

  }
};
const handleRazorpayPayment =
  async () => {
    if (!window.Razorpay) {
      Swal.fire({
        icon: "error",
        title: "Payment SDK not loaded",
      });
      return;
    }
    try {

      const amount = finalTotal;

      const { data } =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/payment/capturePayment`,
          {
            amount,
            currency: "INR",
          }
        );

      if (!data.success) {

        alert("Order creation failed");

        return;

      }

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: data.data.amount,

        currency: data.data.currency,

        name: "BROOCHES.CO",

        description: "Order Payment",

        order_id: data.data.id,

        handler:
          async function (response) {

            const verifyResponse =
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/payment/verifyPayment`,
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }
              );

            if (
              verifyResponse.data.success
            ) {

              alert(
                "Payment Successful"
              );

              handlePlaceOrder();

            } else {

              alert(
                "Payment Verification Failed"
              );

            }

          },

        prefill: {
          name:
            shippingData.fullName,

          email:
            shippingData.email,

          contact:
            shippingData.mobile,
        },

        theme: {
          color: "#8b6b08",
        },
      };

      const razor =
        new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);

    }

  };

// ========================
// STEPS
// ========================

const steps =
  paymentMethod === "COD"
    ? [
      {
        id: 1,
        label: "Login",
        completed: isLoggedIn,
      },
      {
        id: 2,
        label: "Shipping",
        completed: activeStep > 2,
      },
      {
        id: 4,
        label: "Complete",
        completed: activeStep === 4,
      },
    ]
    : [
      {
        id: 1,
        label: "Login",
        completed: isLoggedIn,
      },
      {
        id: 2,
        label: "Shipping",
        completed: activeStep > 2,
      },
      {
        id: 3,
        label: "Payment",
        completed: activeStep > 3,
      },
      {
        id: 4,
        label: "Complete",
        completed: activeStep === 4,
      },
    ];


return (
  <div className="min-h-screen bg-[#f7f5f3] overflow-hidden">
    <Navbar />

    {/* LOGIN POPUP */}
    {showLoginPopup && !isLoggedIn && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="bg-white w-full max-w-[500px] rounded-[30px] p-12 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-[#f5ede2] flex items-center justify-center mb-8">
            <Lock
              size={38}
              className="text-[#8b6a2c]"
            />
          </div>

          <h2
            className="text-[52px]"
            style={{
              fontFamily:
                '"Cormorant Garamond", serif',
            }}
          >
            Please Login
          </h2>

          <p className="mt-5 text-gray-600">
            You need to sign in before
            checkout.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <Link
              to="/login"
              state={{
                from: location.pathname,
              }}
              className="h-[58px] rounded-full bg-[#8b6a2c] text-white flex items-center justify-center uppercase tracking-[3px] text-[12px]"
            >
              Login Now
            </Link>

            <Link
              to="/"
              className="h-[58px] rounded-full border border-[#dccbb5] flex items-center justify-center uppercase tracking-[3px] text-[12px]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )}

    <div
      className={`transition-all duration-500 ${showLoginPopup && !isLoggedIn
        ? "blur-sm pointer-events-none"
        : ""
        }`}
    >
      {/* STEPPER */}
      <div className="max-w-[1050px] mx-auto pt-20 mt-10">
        <div className="flex items-start justify-between relative">
          <div className="absolute top-[26px] left-[90px] right-[90px] h-[1px] bg-[#ddd6cf]" />

          {steps.map((step) => {
            const active =
              activeStep === step.id;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center min-w-[140px]"
              >
                <button
                  className={`w-[46px] h-[46px] rounded-full border flex items-center justify-center ${active || step.completed
                    ? "bg-[#8b6b08] border-[#8b6b08] text-white"
                    : "border-[#d1cbc4] text-[#64748b] bg-white"
                    }`}
                >
                  {step.completed ? (
                    <Check size={18} />
                  ) : (
                    step.id
                  )}
                </button>

                <span className="mt-6 uppercase text-[12px] tracking-[2px]">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-[1250px] mx-auto px-8 py-20 grid grid-cols-[1fr_380px] gap-20">

        {/* LEFT */}



        {/* LEFT */}
        <div>

          {/* EMPTY CART UI */}
          {cartItems.length === 0 ? (

            <div
              className="
        bg-white
        border
        border-[#ece7e2]
        rounded-[32px]
        p-14
        text-center
        min-h-[500px]
        flex
        flex-col
        items-center
        justify-center
      "
            >

              <div
                className="
          w-28
          h-28
          rounded-full
          bg-[#f8f3ea]
          flex
          items-center
          justify-center
          mb-8
        "
              >
                <Heart
                  size={42}
                  className="text-[#8b6b08]"
                />
              </div>

              <p className="uppercase tracking-[4px] text-[11px] text-[#9a7a2f] mb-4">
                Your Cart Is Empty
              </p>

              <h2
                className="
          text-[58px]
          leading-[62px]
          text-[#1f2937]
          max-w-[700px]
        "
                style={{
                  fontFamily:
                    '"Cormorant Garamond", serif',
                }}
              >
                Shop Something Beautiful
                <br />
                For Yourself Or Your Loved Ones
              </h2>

              <p className="mt-6 text-[#6b7280] text-[16px] leading-[30px] max-w-[600px]">
                Explore our premium collection and
                discover timeless pieces crafted
                with elegance, luxury and care.
              </p>

              <Link
                to="/explore"
                className="
          mt-10
          h-[62px]
          px-12
          rounded-full
          bg-[#111827]
          hover:bg-[#8b6b08]
          transition-all
          text-white
          uppercase
          tracking-[3px]
          text-[12px]
          flex
          items-center
          justify-center
        "
              >
                Shop Now
              </Link>

            </div>

          ) : (

            <>
              {/* ADDRESS OPTIONS */}
              {savedAddresses.length > 0 && (
                <div className="mb-8 bg-white border border-[#ece7e2] rounded-[24px] p-6">

                  <h3
                    className="text-[28px] mb-6"
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                    }}
                  >
                    Select Delivery Address
                  </h3>

                  <div className="flex flex-wrap gap-4">

                    {/* DEFAULT ADDRESS */}
                    <button
                      onClick={() => {
                        setSelectedMode("default");

                        const defaultAddress =
                          savedAddresses.find(
                            (item) => item.isDefault
                          ) || savedAddresses[0];

                        setShippingData(normalizeAddress(defaultAddress));

                        setSelectedAddressId(
                          defaultAddress._id
                        );

                        setAddressCompleted(true);

                        setShowNewAddressForm(false);
                      }}
                      className={`px-6 py-3 rounded-full border transition-all
              ${selectedMode === "default"
                          ? "bg-[#8b6b08] text-white border-[#8b6b08]"
                          : "border-[#d9d4cf]"
                        }`}
                    >
                      Use Default Address
                    </button>

                    {/* DIFFERENT ADDRESS */}
                    <button
                      onClick={() => {
                        setSelectedMode("different");

                        setAddressCompleted(false);

                        setShowNewAddressForm(false);
                      }}
                      className={`px-6 py-3 rounded-full border transition-all
              ${selectedMode === "different"
                          ? "bg-[#8b6b08] text-white border-[#8b6b08]"
                          : "border-[#d9d4cf]"
                        }`}
                    >
                      Select Different Address
                    </button>

                    {/* ADD NEW */}
                    <button
                      onClick={() => {
                        setSelectedMode("new");

                        setShowNewAddressForm(true);

                        setAddressCompleted(false);

                        setShippingData({
                          fullName: "",
                          mobile: "",
                          alternateMobile: "",
                          email: "",
                          country: "",
                          state: "",
                          city: "",
                          zipCode: "",
                          address: "",
                          landmark: "",
                          addressType: "Home",
                          isDefault: false,
                        });
                      }}
                      className={`px-6 py-3 rounded-full border transition-all
              ${selectedMode === "new"
                          ? "bg-[#8b6b08] text-white border-[#8b6b08]"
                          : "border-[#d9d4cf]"
                        }`}
                    >
                      Add New Address
                    </button>

                  </div>
                </div>
              )}

              {/* SAVED ADDRESSES */}
              {/* {savedAddresses.length > 0 && ( */}
              {savedAddresses.length > 0 &&
                selectedMode === "different" && (
                  <div className="mb-10">
                    <div className="flex justify-between items-center mb-5">
                      <h3
                        className="text-[30px]"
                        style={{
                          fontFamily:
                            "Cormorant Garamond, serif",
                        }}
                      >
                        Saved Addresses
                      </h3>

                      <button
                        onClick={() => {
                          setShowNewAddressForm(
                            true
                          );

                          setAddressCompleted(
                            false
                          );

                          setShippingData({
                            fullName: "",
                            mobile: "",
                            alternateMobile: "",
                            email: "",
                            country: "",
                            state: "",
                            city: "",
                            zipCode: "",
                            address: "",
                            landmark: "",
                            addressType:
                              "Home",
                            isDefault: false,
                          });
                        }}
                        className="text-[#8b6b08] uppercase text-[11px] tracking-[2px]"
                      >
                        + Add New
                      </button>
                    </div>

                    <div className="space-y-4">
                      {savedAddresses.map(
                        (item) => (
                          <div
                            key={item._id}
                            onClick={() => {
                              setSelectedAddressId(
                                item._id
                              );

                              setShippingData(normalizeAddress(item));

                              // setAddressCompleted(
                              //   true
                              // );
                              setAddressCompleted(true);
                              setSelectedMode("default");
                              setShowNewAddressForm(
                                false
                              );
                            }}
                            className={`border rounded-[20px] p-5 cursor-pointer ${selectedAddressId ===
                              item._id
                              ? "border-[#8b6b08] bg-[#faf5eb]"
                              : "border-[#e5dfd7]"
                              }`}
                          >
                            <div className="flex justify-between">
                              <div>
                                <p className="font-semibold">
                                  {
                                    item.fullName
                                  }
                                </p>

                                <p className="text-sm text-gray-600 mt-2">
                                  {
                                    item.address
                                  }
                                  , {item.city}
                                </p>

                                <p className="text-sm text-gray-600">
                                  {
                                    item.mobile
                                  }
                                </p>
                              </div>

                              <button
                                onClick={async (
                                  e
                                ) => {
                                  e.stopPropagation();

                                  const token =
                                    localStorage.getItem(
                                      "token"
                                    );

                                  await axios.delete(
                                    `${import.meta.env.VITE_API_URL}/api/address/delete/${item._id}`,
                                    {
                                      headers:
                                      {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  );

                                  fetchAddresses();
                                }}
                                className="text-red-500"
                              >
                                <Trash2
                                  size={18}
                                />
                              </button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* ADDRESS FORM */}
              {/* {(showNewAddressForm ||
              savedAddresses.length ===
              0)  */}
              {(showNewAddressForm ||
                savedAddresses.length === 0 ||
                selectedMode === "new") &&
                !addressCompleted && (
                  <div className="bg-white border border-[#ece7e2] rounded-[30px] p-10">
                    <h2
                      className="text-[48px] mb-10"
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                      }}
                    >
                      Delivery Address
                    </h2>

                    <div className="grid grid-cols-2 gap-10">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={
                          shippingData.fullName
                        }
                        onChange={
                          handleChange
                        }
                        className="border-b pb-3 outline-none"
                      />

                      <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        value={shippingData.mobile}
                        maxLength={10}
                        onChange={handleChange}
                        className="border-b pb-3 outline-none"
                      />

                      <input
                        type="text"
                        name="alternateMobile"
                        placeholder="Alternate Mobile"
                        value={
                          shippingData.alternateMobile
                        }
                        maxLength={10}
                        onChange={
                          handleChange
                        }
                        className="border-b pb-3 outline-none"
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={
                          shippingData.email
                        }
                        onChange={
                          handleChange
                        }
                        className="border-b pb-3 outline-none"
                      />

                      {/* COUNTRY */}
                      <Select
                        options={countries.map((country) => ({
                          value: country.name,
                          label: country.name,
                          isoCode: country.isoCode,
                        }))}
                        placeholder="Country"
                        styles={customSelectStyles}
                        onChange={(selected) => {

                          setShippingData({
                            ...shippingData,
                            country: selected?.value || "",
                            state: "",
                            city: "",
                          });

                          setStates(
                            State.getStatesOfCountry(
                              selected?.isoCode
                            )
                          );

                          setCities([]);
                        }}
                      />

                      {/* STATE */}
                      <Select
                        options={states.map((state) => ({
                          value: state.name,
                          label: state.name,
                          isoCode: state.isoCode,
                        }))}
                        placeholder="State"
                        styles={customSelectStyles}
                        onChange={(selected) => {

                          setShippingData({
                            ...shippingData,
                            state: selected?.value || "",
                            city: "",
                          });

                          const selectedCountry =
                            Country.getAllCountries().find(
                              (country) =>
                                country.name === shippingData.country
                            );

                          setCities(
                            City.getCitiesOfState(
                              selectedCountry?.isoCode,
                              selected?.isoCode
                            )
                          );
                        }}
                      />

                      {/* CITY */}
                      <Select
                        options={cities.map((city) => ({
                          value: city.name,
                          label: city.name,
                        }))}
                        placeholder="City"
                        styles={customSelectStyles}
                        onChange={(selected) => {
                          setShippingData({
                            ...shippingData,
                            city: selected?.value || "",
                          });
                        }}
                      />

                      {/* <input
                          type="text"
                          name="zipCode"
                          placeholder="Zip Code"
                          value={
                            shippingData.zipCode
                          }
                          onChange={
                            handleChange
                          }
                          className="border-b pb-3 outline-none"
                        /> */}
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={shippingData.zipCode}
                        maxLength={6}
                        onChange={handleChange}
                        className="border-b pb-3 outline-none"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Full Address"
                        value={
                          shippingData.address
                        }
                        onChange={
                          handleChange
                        }
                        className="border-b pb-3 outline-none col-span-2"
                      />

                      <input
                        type="text"
                        name="landmark"
                        placeholder="Landmark"
                        value={
                          shippingData.landmark
                        }
                        onChange={
                          handleChange
                        }
                        className="border-b pb-3 outline-none col-span-2"
                      />

                      {/* ADDRESS TYPE */}
                      <div className="col-span-2 flex gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setShippingData({
                              ...shippingData,
                              addressType:
                                "Home",
                            })
                          }
                          className={`px-6 py-3 rounded-full border ${shippingData.addressType ===
                            "Home"
                            ? "bg-[#8b6b08] text-white"
                            : ""
                            }`}
                        >
                          Home
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setShippingData({
                              ...shippingData,
                              addressType:
                                "Office",
                            })
                          }
                          className={`px-6 py-3 rounded-full border ${shippingData.addressType ===
                            "Office"
                            ? "bg-[#8b6b08] text-white"
                            : ""
                            }`}
                        >
                          Office
                        </button>
                      </div>

                      {/* DEFAULT */}
                      <div className="col-span-2 flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={
                            shippingData.isDefault
                          }
                          onChange={
                            handleChange
                          }
                        />

                        <label>
                          Set As Default
                          Address
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={
                        handleSaveAddress
                      }
                      className="mt-10 w-full h-[58px] rounded-full border border-[#8b6b08] text-[#8b6b08]"
                    >
                      Save Address
                    </button>

                    <button
                      onClick={
                        handleContinueToPayment
                      }
                      className="mt-5 w-full h-[60px] rounded-full bg-[#111827] text-white"
                    >
                      Continue To Payment
                    </button>
                  </div>
                )}

              {/* PAYMENT */}
              {addressCompleted && cartItems.length > 0 && (
                <div className="bg-white border border-[#ece7e2] rounded-[30px] p-10 mt-10">
                  <h2
                    className="text-[40px] mb-10"
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                    }}
                  >
                    Payment Method
                  </h2>

                  <div className="space-y-5">
                    <div
                      onClick={() =>
                        setPaymentMethod(
                          "COD"
                        )
                      }
                      className={`border rounded-[18px] p-6 cursor-pointer ${paymentMethod ===
                        "COD"
                        ? "border-[#8b6b08] bg-[#f8f3ea]"
                        : ""
                        }`}
                    >
                      Cash On Delivery
                    </div>

                    <div
                      onClick={() =>
                        setPaymentMethod(
                          "ONLINE"
                        )
                      }
                      className={`border rounded-[18px] p-6 cursor-pointer ${paymentMethod ===
                        "ONLINE"
                        ? "border-[#8b6b08] bg-[#f8f3ea]"
                        : ""
                        }`}
                    >
                      Online Payment
                    </div>
                  </div>

                  {/* <button
                  onClick={
                    handlePlaceOrder
                  }
                  disabled={loading}
                  className="mt-10 w-full h-[60px] rounded-full bg-[#111827] text-white"
                > */}
                  <button
                    onClick={() => {
                      if (paymentMethod === "ONLINE") {
                        handleRazorpayPayment();
                      } else {
                        handlePlaceOrder();
                      }
                    }}
                    // disabled={loading || cartItems.length === 0}
                    disabled={
                      loading ||
                      placingOrder ||
                      cartItems.length === 0
                    }
                    className="mt-10 w-full h-[60px] rounded-full bg-[#111827] text-white"
                  >
                    {/* {loading
                        ? "Placing Order..."
                        : "Place Order"} */}
                    {placingOrder
                      ? "Placing Order..."
                      : "Place Order"}
                  </button>
                </div>
              )}

            </>

          )}

        </div>
        {/* RIGHT */}
        <div>
          <div className="border border-[#ddd6cf] bg-white p-8 rounded-[30px] sticky top-10">
            <h2
              className="text-[34px] mb-8"
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
              }}
            >
              Order Summary
            </h2>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.productId || item._id}
                  className="flex gap-4 border rounded-[18px] p-4 bg-[#faf8f6]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[90px] h-[110px] rounded-[14px] object-cover"
                  />

                  <div className="flex-1">
                    <h3
                      className="text-[24px]"
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                      }}
                    >
                      {item.name}
                    </h3>

                    <p>{item.price}</p>

                    <div className="flex justify-between mt-4">
                      <div className="flex items-center gap-3 border rounded-full px-3 py-1 bg-white">
                        <button
                          onClick={() =>
                            // dispatch(
                            //   decreaseQuantity(
                            //     item.id
                            //   )
                            // )
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus
                            size={14}
                          />
                        </button>

                        <span>
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            // dispatch(
                            //   increaseQuantity(
                            //     item.id
                            //   )
                            // )
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus
                            size={14}
                          />
                        </button>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            // dispatch(
                            // removeFromCart(
                            //   item.id
                            // )
                            handleRemoveItem(item.productId)
                            // )
                          }
                          className="text-red-500"
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                        <button
                          onClick={() => {
                            dispatch(
                              addToWishlist(
                                {
                                  ...item,
                                  quantity: 1,
                                }
                              )
                            );

                            dispatch(
                              removeFromCart(
                                item.id
                              )
                            );
                          }}
                          className="text-[#8b6b08]"
                        >
                          <Heart
                            size={16}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="mt-6">

                <div className="flex gap-3">

                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value)
                    }
                    className="flex-1 border rounded-full px-5 h-[55px] outline-none"
                  />


                  {coupons.length > 0 && (

                    <div className="mt-5 space-y-3">

                      <p className="text-[13px] uppercase tracking-[2px] text-[#8b6b08]">
                        Available Coupons
                      </p>

                      {coupons.map((coupon) => (

                        <div
                          key={coupon._id}
                          className="border border-[#e7dfd4] rounded-[18px] p-4 bg-[#faf8f5]"
                        >

                          <div className="flex justify-between items-center">

                            <div>

                              <h4 className="font-semibold text-[#111827]">
                                {coupon.couponName}
                              </h4>

                              <p className="text-sm text-gray-500 mt-1">
                                {coupon.description}
                              </p>

                              <p className="text-sm text-green-600 mt-1">
                                Save ₹
                                {Math.floor(
                                  coupon.calculatedDiscount
                                )}
                              </p>

                            </div>

                            <button
                              onClick={() => {
                                setCouponCode(coupon.couponName);

                                handleApplyCoupon(
                                  coupon.couponName
                                );
                              }}
                              className="px-5 h-[42px] rounded-full bg-[#8b6b08] text-white text-sm"
                            >
                              Apply
                            </button>

                          </div>

                        </div>
                      ))}

                    </div>
                  )}

                  <button
                    onClick={() =>
                      handleApplyCoupon()
                    }
                    className="
    px-6
    rounded-full
    bg-[#8b6b08]
    text-white
    h-[55px]
  "
                  >
                    Apply
                  </button>

                </div>

                {appliedCoupon && (

                  <p className="text-green-600 mt-3 text-sm">

                    Coupon Applied:
                    {" "}
                    {appliedCoupon.couponName}

                  </p>
                )}

              </div> */}
            <div className="mt-6">

              {/* COUPON INPUT */}
              <div className="flex gap-3">

                <input
                  type="text"
                  placeholder="Enter Coupon"
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(e.target.value)
                  }
                  className="flex-1 border rounded-full px-5 h-[55px] outline-none"
                />

                <button
                  onClick={() =>
                    handleApplyCoupon(couponCode)
                  }
                  className="
        px-6
        rounded-full
        bg-[#8b6b08]
        text-white
      "
                >
                  Apply
                </button>

              </div>

              {/* APPLIED COUPON */}
              {appliedCoupon && (

                <p className="text-green-600 mt-3 text-sm">

                  Coupon Applied:
                  {" "}
                  {appliedCoupon.couponName}

                </p>
              )}

              {/* AVAILABLE COUPONS */}
              {coupons.length > 0 && (

                <div className="mt-5 space-y-3">

                  <p className="text-[13px] uppercase tracking-[2px] text-[#8b6b08]">
                    Available Coupons
                  </p>

                  {coupons.map((coupon) => (

                    <div
                      key={coupon._id}
                      className="
            border
            border-[#e7dfd4]
            rounded-[18px]
            p-4
            bg-[#faf8f5]
            flex
            items-center
            justify-between
          "
                    >

                      <div>

                        <h4 className="font-semibold text-[#111827]">
                          {coupon.couponName}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          {coupon.description}
                        </p>

                        <p className="text-sm text-green-600 mt-1">
                          Save ₹
                          {Math.floor(
                            coupon.calculatedDiscount || 0
                          )}
                        </p>

                      </div>

                      <button
                        onClick={() => {
                          setCouponCode(
                            coupon.couponName
                          );

                          handleApplyCoupon(
                            coupon.couponName
                          );
                        }}
                        className="
              px-5
              h-[42px]
              rounded-full
              bg-[#8b6b08]
              text-white
              text-sm
            "
                      >
                        Apply
                      </button>

                    </div>
                  ))}
                </div>
              )}

            </div>
            {/* TOTAL */}
            <div className="py-8">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>

                <span>
                  ₹
                  {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>

                <span>
                  ₹{shipping}
                </span>
              </div>

              <div className="flex justify-between mb-4 text-[#c2410c]">
                <span>Discount</span>

                <span>
                  -₹{discount}
                </span>
              </div>

              <div className="border-t pt-6 flex justify-between">
                <span
                  className="text-[32px]"
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                  }}
                >
                  Total
                </span>

                <span
                  className="text-[32px] text-[#8b6b08]"
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                  }}
                >
                  ₹
                  {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>
);
}
