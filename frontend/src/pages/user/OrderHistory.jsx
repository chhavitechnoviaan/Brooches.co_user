import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Clock3,
  Download,
  Eye,
  MapPin,
  Package,
  RotateCcw,
  Search,
  ShoppingBag,
  Star,
  Truck,
  StarIcon,
} from "lucide-react";
import {
  useParams,
} from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function OrderHistory() {

  const [orders, setOrders] =
    useState([]);

  const [openOrder, setOpenOrder] =
    useState(null);

  const [filter, setFilter] =
    useState("all");

  const [search, setSearch] =
    useState("");

  // const [reviewData, setReviewData] = useState({
  //   productId: "",
  //   orderId: "",
  //   rating: 5,
  //   review: "",
  // });
  const [reviewData, setReviewData] = useState({});

  const [submittingReview, setSubmittingReview] =
    useState(false);

  const [reviews, setReviews] = useState({});

  const { userId } = useParams();

  // LOGIN USER
  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  // FINAL USER ID
  const finalUserId =
    userId ||
    storedUser?._id ||
    storedUser?.id;

  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      if (!finalUserId) return;

      // const res = await axios.post(
      //   "http://localhost:5000/api/orders/user",
      //   {
      //     userId: finalUserId,
      //   }
      // );

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/user/${finalUserId}`
      );
      setOrders(res.data.orders);

    } catch (error) {

      console.log(error);

    }
  };

  const submitReview = async (orderId, productId, data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reviews/add`,
        {
          userId: finalUserId,
          orderId,
          productId,
          rating: data.rating,
          review: data.review,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Review submitted successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      // clear only this product
      setReviewData((prev) => ({
        ...prev,
        [productId]: {},
      }));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit review",
      });
    }
  };

  const getProductReviews = async (
    productId
  ) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/product/${productId}`
      );

      setReviews((prev) => ({
        ...prev,
        [productId]: res.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    fetchOrders();

  }, [finalUserId]);

  // DELIVERY DATE
  const getDeliveryDate = (
    createdAt
  ) => {

    const date = new Date(createdAt);

    date.setDate(date.getDate() + 5);

    return date.toDateString();
  };

  // FILTER + SEARCH
  const filteredOrders = useMemo(() => {

    let filtered = [...orders];

    // LATEST FIRST
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    const now = new Date();

    // WEEK FILTER
    if (filter === "week") {

      filtered = filtered.filter(
        (order) => {

          const orderDate =
            new Date(order.createdAt);

          const diff =
            (now - orderDate) /
            (1000 * 60 * 60 * 24);

          return diff <= 7;
        }
      );
    }

    // MONTH FILTER
    if (filter === "month") {

      filtered = filtered.filter(
        (order) => {

          const orderDate =
            new Date(order.createdAt);

          return (
            orderDate.getMonth() ===
            now.getMonth() &&
            orderDate.getFullYear() ===
            now.getFullYear()
          );
        }
      );
    }

    // YEAR FILTER
    if (filter === "year") {

      filtered = filtered.filter(
        (order) => {

          const orderDate =
            new Date(order.createdAt);

          return (
            orderDate.getFullYear() ===
            now.getFullYear()
          );
        }
      );
    }

    // SEARCH
    if (search) {

      filtered = filtered.filter(
        (order) =>
          order.items.some((item) =>
            item.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )
      );
    }

    return filtered;

  }, [orders, filter, search]);

  // TOTAL SPENT
  const totalSpent = orders.reduce(
    (acc, order) =>
      acc + order.totalAmount,
    0
  );

  // TOTAL PRODUCTS
  const totalItems = orders.reduce(
    (acc, order) =>
      acc + order.items.length,
    0
  );

  return (
    // <div className="min-h-screen bg-[#f8f6f3]">
    <div className="pt-8 md:pt-10 lg:pt-8 pb-10 md:pb-16 lg:pb-16 px-3 sm:px-4 md:px-5">

      <Navbar />

      <div className="pt-20 pb-20 px-5">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          {/* <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12"> */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 md:gap-8 mb-8 md:mb-12">

            <div>

              <p className="uppercase tracking-[4px] text-[#9c7c54] text-[12px] mb-3">
                Customer Dashboard
              </p>

              <h1
                // className="text-5xl text-[#2f221b]"
                className="text-3xl sm:text-4xl md:text-5xl text-[#2f221b]"
                style={{
                  fontFamily:
                    '"Cormorant Garamond", serif',
                }}
              >
                Order History
              </h1>

            </div>

            {/* SEARCH */}
            {/* <div className="relative w-full lg:w-[350px]"> */}
            <div className="relative w-full md:max-w-[400px] lg:w-[350px]">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search your orders"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full h-[52px] rounded-full border border-[#e5d8c6] bg-white pl-12 pr-5 outline-none"
              />
            </div>
          </div>

          {/* STATS */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            {/* <div className="bg-white rounded-[30px] p-7 border border-[#eadfce]"> */}
            <div className="bg-white rounded-2xl md:rounded-[30px] p-5 md:p-7 border border-[#eadfce]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Orders
                  </p>

                  <h2 className="text-4xl font-semibold text-[#2f221b] mt-2">
                    {orders.length}
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-[#f6eee3] flex items-center justify-center">

                  <ShoppingBag className="text-[#8b6a2c]" />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-7 border border-[#eadfce]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Products
                  </p>

                  <h2 className="text-4xl font-semibold text-[#2f221b] mt-2">
                    {totalItems}
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-[#f6eee3] flex items-center justify-center">

                  <Package className="text-[#8b6a2c]" />

                </div>
              </div>
            </div>

            <div className="bg-white rounded-[30px] p-7 border border-[#eadfce]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Spent
                  </p>

                  <h2 className="text-4xl font-semibold text-[#2f221b] mt-2">
                    ₹ {totalSpent}
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-full bg-[#f6eee3] flex items-center justify-center">

                  <Star className="text-[#8b6a2c]" />

                </div>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          {/* <div className="flex flex-wrap items-center gap-3 mb-10"> */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
            {[
              "all",
              "week",
              "month",
              "year",
            ].map((item) => (

              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }
                // className={`px-5 py-2 rounded-full text-sm transition-all duration-300 capitalize
                className={`px-4 md:px-5 py-2 text-xs md:text-sm rounded-full transition-all duration-300 capitalize
                  
                  ${filter === item
                    ? "bg-[#8b6a2c] text-white"
                    : "bg-white border"
                  }
                `}
              >
                {item === "all"
                  ? "All Orders"
                  : `This ${item}`}
              </button>
            ))}
          </div>

          {/* EMPTY */}
          {filteredOrders.length ===
            0 && (

              // <div className="bg-white rounded-[30px] p-16 text-center border border-[#eadfce]">
              <div className="
bg-white
rounded-2xl
md:rounded-[30px]
p-8
md:p-16
text-center
border
border-[#eadfce]
">
                <Package
                  size={60}
                  className="mx-auto text-[#8b6a2c]"
                />

                <h2 className="text-xl md:text-3xl mt-6 text-[#2f221b]">
                  No Orders Found
                </h2>

                <p className="text-gray-500 mt-3">
                  No orders available.
                </p>
              </div>
            )}

          {/* ORDER LIST */}
          {/* <div className="space-y-8"> */}
          <div className="space-y-4 md:space-y-8">
            {filteredOrders.map(
              (order) => (

                <div
                  key={order._id}
                  className="bg-white rounded-[28px] border border-[#eadfce] overflow-hidden"
                >

                  {/* TOP */}
                  <div
                    // onClick={() =>
                    //   setOpenOrder(
                    //     openOrder ===
                    //       order._id
                    //       ? null
                    //       : order._id
                    //   )
                    // }
                    onClick={() => {
                      if (
                        openOrder !== order._id
                      ) {
                        order.items.forEach((item) =>
                          getProductReviews(
                            item.productId
                          )
                        );
                      }

                      setOpenOrder(
                        openOrder === order._id
                          ? null
                          : order._id
                      );
                    }}
                    className="cursor-pointer p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-[#faf7f2] transition-all duration-300"
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      <img
                        src={
                          order.items[0]
                            ?.image
                        }
                        alt=""
                        className="w-20 h-20 rounded-2xl object-cover border"
                      />

                      <div>

                        <h2 className="text-base md:text-lg font-semibold text-[#2f221b]">
                          {
                            order.items[0]
                              ?.name
                          }
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {
                            order.items
                              .length
                          } item(s)
                        </p>

                        <div className="flex items-center gap-2 mt-2 text-gray-500">

                          <CalendarDays size={14} />

                          <p className="text-sm">
                            {new Date(
                              order.createdAt
                            ).toDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}
                    {/* <div className="flex items-center gap-6 flex-wrap"> */}
                    <div
                      className="
  flex
  flex-wrap
  items-center
  gap-3
  md:gap-6
  w-full
  xl:w-auto
  "
                    >

                      {/* DELIVERY */}
                      <div>

                        <p className="text-xs uppercase tracking-[2px] text-gray-400">
                          Delivery
                        </p>

                        <h3 className="text-sm font-medium mt-1">
                          {getDeliveryDate(
                            order.createdAt
                          )}
                        </h3>
                      </div>

                      {/* STATUS */}
                      <div>

                        <span
                          className={`px-4 py-2 rounded-full text-xs font-medium

                          ${order.orderStatus ===
                              "Delivered"
                              ? "bg-green-100 text-green-700"

                              : order.orderStatus ===
                                "Shipped"
                                ? "bg-blue-100 text-blue-700"

                                : order.orderStatus ===
                                  "Confirmed"
                                  ? "bg-yellow-100 text-yellow-700"

                                  : "bg-orange-100 text-orange-700"
                            }
                        `}
                        >
                          {
                            order.orderStatus
                          }
                        </span>
                      </div>

                      {/* TOTAL */}
                      <div>

                        <p className="text-xs uppercase tracking-[2px] text-gray-400">
                          Total
                        </p>

                        <h3 className="text-sm font-semibold mt-1">
                          ₹ {
                            order.totalAmount
                          }
                        </h3>
                      </div>

                      {/* ACTIONS */}
                      {/* <div className="flex items-center gap-3"> */}
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <button className="
w-8 h-8
md:w-10 md:h-10
rounded-full
border
flex
items-center
justify-center
hover:bg-[#faf7f2]
">

                          <Eye size={18} />

                        </button>

                        {/* <button className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[#faf7f2]">

                          <Download size={18} />

                        </button> */}

                        <button className="
w-8 h-8
md:w-10 md:h-10
rounded-full
border
flex
items-center
justify-center
hover:bg-[#faf7f2]
">

                          <RotateCcw size={18} />

                        </button>

                        <div>

                          {openOrder ===
                            order._id ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS */}
                  {openOrder ===
                    order._id && (

                      <div className="border-t border-[#eee] p-6">

                        {/* PRODUCTS */}
                        <div className="space-y-5">

                          {/* {order.items.map(
                            (
                              item,
                              index
                            ) => (

                              <div
                                key={index}
                                // className="flex items-center gap-4 border-b pb-5"
                                className="
flex
flex-col
sm:flex-row
sm:items-center
gap-4
border-b
pb-5
"
                              >

                                <img
                                  src={
                                    item.image
                                  }
                                  alt=""
                                  // className="w-16 h-16 rounded-xl object-cover border"
                                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl object-cover border"
                                />

                                <div className="flex-1">

                                  <h3 className="font-medium text-[#2f221b]">
                                    {
                                      item.name
                                    }
                                  </h3>

                                  <div className="flex gap-4 text-sm text-gray-500 mt-1">

                                    <p>
                                      Qty :
                                      {
                                        item.quantity
                                      }
                                    </p>

                                    <p>
                                      ₹ {
                                        item.price
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>



                            )
                          )} */}

                          {order.items.map((item, index) => (

                            <div
                              key={index}
                              className="
      flex
      flex-col
      gap-4
      border-b
      pb-5
    "
                            >

                              {/* Product Details */}

                              <div
                                className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        gap-4
      "
                              >
                                <img
                                  src={item.image}
                                  alt=""
                                  className="
          w-16 h-16
          md:w-20 md:h-20
          rounded-xl
          md:rounded-2xl
          object-cover
          border
        "
                                />

                                <div className="flex-1">

                                  <h3 className="font-medium text-[#2f221b]">
                                    {item.name}
                                  </h3>

                                  <div className="flex gap-4 text-sm text-gray-500 mt-1">

                                    <p>
                                      Qty : {item.quantity}
                                    </p>

                                    <p>
                                      ₹ {item.price}
                                    </p>

                                  </div>

                                </div>
                              </div>

                              {/* Review Section */}

                              {order.orderStatus === "Delivered" && (

                                <div className="mt-2 border-t pt-4">

                                  <h4 className="font-semibold mb-3">
                                    Write Review
                                  </h4>

                                  {/* Rating */}

                                  <div className="flex gap-2 mb-3">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                      <button
                                        key={star}
                                        type="button"
                                        // onClick={() =>
                                        //   setReviewData({
                                        //     ...reviewData,
                                        //     rating: star,
                                        //     productId: item.productId,
                                        //     orderId: order._id,
                                        //   })
                                        // }
                                        onClick={() =>
                                          setReviewData((prev) => ({
                                            ...prev,
                                            [item.productId]: {
                                              ...(prev[item.productId] || {}),
                                              rating: star,
                                              productId: item.productId,
                                              orderId: order._id,
                                            },
                                          }))
                                        }
                                      >
                                        <Star
                                          size={20}
                                          fill={
                                            reviewData.productId === item.productId &&
                                              reviewData.rating >= star
                                              ? "#facc15"
                                              : "none"
                                          }
                                          className="text-yellow-500"
                                        />
                                      </button>

                                    ))}

                                  </div>

                                  {/* Review Text */}

                                  <textarea
                                    rows="3"
                                    placeholder="Write your review..."
                                    className="
            w-full
            border
            rounded-xl
            p-3
            text-sm
            outline-none
          "
                                    // value={
                                    //   reviewData.productId === item.productId
                                    //     ? reviewData.review
                                    //     : ""
                                    // }
                                    // onChange={(e) =>
                                    //   setReviewData({
                                    //     ...reviewData,
                                    //     productId: item.productId,
                                    //     orderId: order._id,
                                    //     review: e.target.value,
                                    //   })
                                    // }
                                    value={
                                      reviewData[item.productId]?.review || ""
                                    }
                                    onChange={(e) =>
                                      setReviewData((prev) => ({
                                        ...prev,
                                        [item.productId]: {
                                          ...(prev[item.productId] || {}),
                                          review: e.target.value,
                                          productId: item.productId,
                                          orderId: order._id,
                                        },
                                      }))
                                    }
                                  />

                                  <button
                                    type="button"
                                    // onClick={() =>
                                    //   submitReview(
                                    //     order._id,
                                    //     item.productId
                                    //   )
                                    // }
                                    onClick={() =>
                                      submitReview(
                                        order._id,
                                        item.productId,
                                        reviewData[item.productId]
                                      )
                                    }
                                    disabled={submittingReview}
                                    className="
            mt-3
            px-5
            py-2
            bg-[#8b6a2c]
            text-white
            rounded-xl
            hover:bg-[#735621]
            transition
          "
                                  >
                                    {submittingReview
                                      ? "Submitting..."
                                      : "Submit Review"}
                                  </button>

                                  {reviews[item.productId]?.length > 0 && (
                                    <div className="mt-6">

                                      <h4 className="font-semibold mb-3">
                                        Customer Reviews
                                      </h4>

                                      <div className="space-y-4">

                                        {reviews[item.productId].map((review) => (

                                          <div
                                            key={review._id}
                                            className="bg-gray-50 rounded-xl p-4"
                                          >

                                            <div className="flex items-center justify-between">

                                              <h5 className="font-medium">
                                                {review.userId?.name}
                                              </h5>

                                              <div className="flex">
                                                {[...Array(review.rating)].map((_, i) => (
                                                  <Star
                                                    key={i}
                                                    size={14}
                                                    fill="#facc15"
                                                    className="text-yellow-500"
                                                  />
                                                ))}
                                              </div>

                                            </div>

                                            <p className="text-sm text-gray-600 mt-2">
                                              {review.review}
                                            </p>

                                          </div>

                                        ))}

                                      </div>
                                    </div>
                                  )}
                                </div>

                              )}

                            </div>

                          ))}
                        </div>

                        {/* TRACKING */}
                        <div className="mt-10">

                          {/* <div className="flex justify-between mb-5"> */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                            <div className="flex flex-col items-center flex-1">

                              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">

                                <Clock3
                                  size={18}
                                  className="text-orange-600"
                                />

                              </div>

                              <p className="mt-2 text-xs text-gray-600">
                                Processing
                              </p>
                            </div>

                            <div className="flex flex-col items-center flex-1">

                              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">

                                <Package
                                  size={18}
                                  className="text-yellow-600"
                                />

                              </div>

                              <p className="mt-2 text-xs text-gray-600">
                                Confirmed
                              </p>
                            </div>

                            <div className="flex flex-col items-center flex-1">

                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                                <Truck
                                  size={18}
                                  className="text-blue-600"
                                />

                              </div>

                              <p className="mt-2 text-xs text-gray-600">
                                Shipped
                              </p>
                            </div>

                            <div className="flex flex-col items-center flex-1">

                              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">

                                <Package
                                  size={18}
                                  className="text-green-600"
                                />

                              </div>

                              <p className="mt-2 text-xs text-gray-600">
                                Delivered
                              </p>
                            </div>
                          </div>

                          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8b6a2c] to-[#d0a96e] rounded-full"
                              style={{
                                width:
                                  order.orderStatus ===
                                    "Processing"
                                    ? "25%"
                                    : order.orderStatus ===
                                      "Confirmed"
                                      ? "50%"
                                      : order.orderStatus ===
                                        "Shipped"
                                        ? "75%"
                                        : "100%",
                              }}
                            />
                          </div>
                        </div>
                        {/* TRACK ORDER */}

                        {order.awbNumber && (

                          <div className="mt-8 bg-[#faf7f2] rounded-2xl p-5 border border-[#eadfce]">

                            <div className="flex items-center gap-2 mb-4">

                              <Truck size={18} />

                              <h2 className="font-semibold">
                                Shipment Tracking
                              </h2>

                            </div>

                            <div className="space-y-3 text-sm">

                              <div className="flex justify-between">

                                <span className="text-gray-500">
                                  AWB Number
                                </span>

                                <span className="font-medium">
                                  {order.awbNumber}
                                </span>

                              </div>

                              <div className="flex justify-between">

                                <span className="text-gray-500">
                                  Courier
                                </span>

                                <span className="font-medium">
                                  {order.courierName || "Assigned"}
                                </span>

                              </div>

                              <div className="flex justify-between">

                                <span className="text-gray-500">
                                  Tracking Number
                                </span>

                                <span className="font-medium">
                                  {order.trackingNumber}
                                </span>

                              </div>

                              {order.trackingUrl && (

                                <a
                                  href={order.trackingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#8b6a2c] text-white rounded-xl hover:bg-[#735621]"
                                >
                                  <Truck size={16} />
                                  Track Shipment
                                </a>

                              )}

                            </div>

                          </div>

                        )}
                        {/* ADDRESS + SUMMARY */}
                        {/* <div className="grid md:grid-cols-2 gap-6 mt-10"> */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10">
                          {/* ADDRESS */}
                          {/* <div className="bg-[#faf7f2] rounded-2xl p-5"> */}
                          <div className="bg-[#faf7f2] rounded-xl md:rounded-2xl p-4 md:p-5">
                            <div className="flex items-center gap-2 mb-4">

                              <MapPin size={18} />

                              <h2 className="font-semibold">
                                Shipping Address
                              </h2>

                            </div>

                            <div className="text-sm text-gray-600 leading-7">

                              <p>
                                {
                                  order.shippingAddress
                                    ?.fullName
                                }
                              </p>

                              <p>
                                {
                                  order.shippingAddress
                                    ?.address
                                }
                              </p>

                              <p>
                                {
                                  order.shippingAddress
                                    ?.city
                                }
                                ,
                                {
                                  order.shippingAddress
                                    ?.state
                                }
                              </p>

                              <p>
                                {
                                  order.shippingAddress
                                    ?.country
                                }
                                -
                                {
                                  order.shippingAddress
                                    ?.zipCode
                                }
                              </p>

                              <p>
                                Mobile :
                                {
                                  order.shippingAddress
                                    ?.mobile
                                }
                              </p>

                            </div>
                          </div>

                          {/* SUMMARY */}
                          <div className="bg-[#faf7f2] rounded-2xl p-5">

                            <h2 className="font-semibold mb-4">
                              Order Summary
                            </h2>

                            <div className="space-y-3 text-sm">

                              <div className="flex justify-between">
                                <span>
                                  Subtotal
                                </span>

                                <span>
                                  ₹ {
                                    order.subtotal
                                  }
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span>
                                  Shipping
                                </span>

                                <span>
                                  ₹ {
                                    order.shipping
                                  }
                                </span>
                              </div>

                              <div className="flex justify-between">
                                <span>
                                  Discount
                                </span>

                                <span>
                                  ₹ {
                                    order.discount
                                  }
                                </span>
                              </div>

                              <div className="border-t pt-3 flex justify-between font-semibold">

                                <span>
                                  Total
                                </span>

                                <span>
                                  ₹ {
                                    order.totalAmount
                                  }
                                </span>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
