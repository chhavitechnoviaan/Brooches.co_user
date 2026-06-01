import React, { useState, useEffect } from "react";
import {
  FiTag,
  FiDollarSign,
  FiCalendar,
  FiBox,
  FiPercent,
  FiCheckCircle,
} from "react-icons/fi";
import { MdDescription } from "react-icons/md";
import {
  getProductsAPI,
} from "../../services/productService";

import {
  getCouponsAPI,
  createCouponAPI,
  deleteCouponAPI,
} from "../../services/couponApi";
const productCategories = {
  BROOCHES: [
    "New Arrival",
    "Floral & Botanical",
    "Vintage & Antique",
    "Animal & Nature",
    "Geometric & Abstract",
    "Festive & Seasonal",
    "Pearl & Crystal",
    "Luxury Statement",
  ],

  BADGES: [
    "New Arrival",
    "Pop Culture & Fandom",
    "Gaming & Anime",
    "Music & Band",
    "Motivational & Quotes",
    "Travel & Adventure",
    "Aesthetic & Minimal",
    "Custom & Personalize",
  ],
};

export default function CouponManagement() {
  const [couponData, setCouponData] =
    useState({
      couponName: "",
      description: "",
      discountValue: "",
      discountType: "PERCENTAGE",
      minimumOrder: "",
      expiryDate: "",
      usageLimit: "",
      usageLimitType: "UNLIMITED",

      applicableType: "ALL",

      // applicableProducts: [],
      productType: "",
      selectedCategories: [],
    });

  const [coupons, setCoupons] = useState([]);
  useEffect(() => {

    fetchCoupons();

    fetchProducts();

  }, []);
  const [products, setProducts] =
    useState([]);
  const fetchCoupons = async () => {

    try {

      const data =
        await getCouponsAPI();

      setCoupons(data.coupons);

    } catch (error) {

      console.log(error);
    }
  };
  const fetchProducts = async () => {

    try {

      const data =
        await getProductsAPI();

      setProducts(data.products);

    } catch (error) {

      console.log(error);
    }
  };
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setCouponData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };
  const deleteCoupon = async (id) => {

    await deleteCouponAPI(id);

    fetchCoupons();
  };
  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   try {

  //     await createCouponAPI({
  //       ...couponData,

  //       discountValue:
  //         Number(couponData.discount),

  //       minimumOrder:
  //         Number(couponData.minimumOrder),

  //       usageLimit:
  //         Number(couponData.usageLimit),
  //     });

  //     fetchCoupons();

  //   } catch (error) {

  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createCouponAPI({
        ...couponData,

        discountValue:
          Number(
            couponData.discountValue
          ),

        minimumOrder:
          Number(
            couponData.minimumOrder
          ),

        // usageLimit:
        //   Number(
        //     couponData.usageLimit
        //   ),
        usageLimit:
  couponData.usageLimitType ===
  "LIMITED"
    ? Number(couponData.usageLimit)
    : 0,
      });

      fetchCoupons();

    } catch (error) {

      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#f8f6f3] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-black text-2xl sm:text-3xl font-bold">
            Coupon Management
          </h1>

          <p className="text-[#8b6b08] text-sm sm:text-base mt-2 font-medium">
            Create and manage discount coupons for products
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] p-5 sm:p-6 h-fit">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-14 h-14 rounded-full bg-[#8b6b08]/10 border border-[#8b6b08]/20 flex items-center justify-center">
                <FiTag className="text-[#8b6b08] text-2xl" />
              </div>

              <div>
                <h2 className="text-black text-xl font-bold">
                  Create Coupon
                </h2>

                <p className="text-[#8b6b08] text-sm font-medium">
                  Add new discount offer
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Coupon Name
                </label>

                <div className="relative">
                  <FiTag className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="couponName"
                    value={couponData.couponName}
                    onChange={handleChange}
                    placeholder="Enter coupon code"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Coupon  Discription
                </label>

                <div className="relative">
                  <MdDescription className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="description"
                    value={couponData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Discount
                </label>

                <div className="relative">
                  <FiPercent className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="discountValue"
                    value={couponData.discountValue}
                    onChange={handleChange}
                    placeholder="10% OFF or ₹100 OFF"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Discount Type
                </label>

                <select
                  name="discountType"
                  value={couponData.discountType}
                  onChange={handleChange}
                  className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none"
                >
                  <option value="PERCENTAGE">
                    Percentage
                  </option>

                  <option value="FIXED">
                    Fixed Amount
                  </option>
                </select>
              </div>
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Minimum Order
                </label>

                <div className="relative">
                  <FiDollarSign className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="minimumOrder"
                    value={couponData.minimumOrder}
                    onChange={handleChange}
                    placeholder="₹999"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              {/* <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Product
                </label>

                <div className="relative">
                  <FiBox className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="product"
                    value={couponData.product}
                    onChange={handleChange}
                    placeholder="Product name"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div> */}
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Applicable On
                </label>

                <select
                  name="applicableType"
                  value={couponData.applicableType}
                  onChange={handleChange}
                  className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none"
                >
                  <option value="ALL">
                    All Products
                  </option>

                  <option value="SPECIFIC">
                    Specific Products
                  </option>
                </select>
              </div>

              {/* {
                couponData.applicableType ===
                "SPECIFIC" && (

                  <div>

                    <label className="text-black text-sm font-semibold block mb-2">
                      Select Products
                    </label>

                    <select
                      multiple
                      className="w-full h-[150px] bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl p-3 outline-none"
                      onChange={(e) => {

                        const values =
                          Array.from(
                            e.target.selectedOptions,
                            (option) =>
                              option.value
                          );

                        setCouponData({
                          ...couponData,
                          applicableProducts:
                            values,
                        });
                      }}
                    >

                      {products.map((item) => (

                        <option
                          key={item._id}
                          value={item._id}
                        >
                          {item.product}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              } */}
              {
  couponData.applicableType ===
    "SPECIFIC" && (

    <div className="space-y-5">

      {/* PRODUCT TYPE */}

      <div>

        <label className="text-black text-sm font-semibold block mb-2">
          Product Type
        </label>

        <select
          name="productType"
          value={couponData.productType}
          onChange={handleChange}
          className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none"
        >
          <option value="">
            Select Product Type
          </option>

          <option value="BROOCHES">
            BROOCHES
          </option>

          <option value="BADGES">
            BADGES
          </option>
        </select>
      </div>

      {/* CATEGORIES */}

      {
        couponData.productType && (

          <div>

            <label className="text-black text-sm font-semibold block mb-2">
              Select Categories
            </label>

            {/* <select
              multiple
              className="w-full h-[180px] bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl p-3 outline-none"
              onChange={(e) => {

                const values =
                  Array.from(
                    e.target.selectedOptions,
                    (option) =>
                      option.value
                  );

                setCouponData({
                  ...couponData,

                  selectedCategories:
                    values,
                });
              }}
            >

              {
                productCategories[
                  couponData.productType
                ]?.map((category) => (

                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))
              }

            </select> */}
<div className="space-y-3">

  {
    productCategories[
      couponData.productType
    ]?.map((category) => (

      <label
        key={category}
        className="flex items-center gap-3 cursor-pointer bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3"
      >

        <input
          type="checkbox"
          checked={couponData.selectedCategories.includes(category)}

          onChange={(e) => {

            if (e.target.checked) {

              setCouponData({
                ...couponData,

                selectedCategories: [
                  ...couponData.selectedCategories,
                  category,
                ],
              });

            } else {

              setCouponData({
                ...couponData,

                selectedCategories:
                  couponData.selectedCategories.filter(
                    (item) =>
                      item !== category
                  ),
              });
            }
          }}
        />

        <span className="text-black text-sm font-medium">
          {category}
        </span>

      </label>
    ))
  }

</div>
          </div>
        )
      }

    </div>
  )
}
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Expiry Date
                </label>

                <div className="relative">
                  <FiCalendar className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="date"
                    name="expiryDate"
                    value={couponData.expiryDate}
                    onChange={handleChange}
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Usage Type
                </label>

                <select
                  name="usageLimitType"
                  value={couponData.usageLimitType}
                  onChange={handleChange}
                  className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none"
                >
                  <option value="UNLIMITED">
                    Unlimited
                  </option>

                  <option value="FIRST_ORDER_ONLY">
                    First Order Only
                  </option>

                  <option value="LIMITED">
                    Limited Uses
                  </option>
                </select>
              </div>
              {/* <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Usage Limit
                </label>

                <input
                  type="number"
                  name="usageLimit"
                  value={couponData.usageLimit}
                  onChange={handleChange}
                  placeholder="100"
                  className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                />
              </div> */}
              {
                couponData.usageLimitType ===
                "LIMITED" && (

                  <div>

                    <label className="text-black text-sm font-semibold block mb-2">
                      Usage Limit
                    </label>

                    <input
                      type="number"
                      name="usageLimit"
                      value={couponData.usageLimit}
                      onChange={handleChange}
                      placeholder="100"
                      className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                )
              }
              <button
                type="submit"
                className="w-full bg-[#8b6b08] text-[#f8f6f3] py-3 rounded-xl font-semibold shadow-[0_0_30px_rgba(139,107,8,0.25)]"
              >
                CREATE COUPON
              </button>

            </form>
          </div>

          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-7">
              <div>
                <h2 className="text-black text-xl sm:text-2xl font-bold">
                  Active Coupons
                </h2>

                <p className="text-[#8b6b08] text-sm font-medium mt-1">
                  Available discount offers
                </p>
              </div>

              <div className="bg-[#8b6b08]/10 text-[#8b6b08] px-4 py-2 rounded-xl font-semibold text-sm">
                {coupons.length} Coupons
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {coupons.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f8f6f3] border border-[#d9d2c5] rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-black text-lg font-bold">
                        {item.couponName}
                      </h3>


                      <p className="text-[#8b6b08] text-sm font-semibold mt-1">
                        {item.discount}
                      </p>

                      <p className="text-gray-500 text-sm mt-2">
                        {item.description}
                      </p>
                    </div>


                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <FiCheckCircle />
                      {item.status}
                    </div>
                  </div>



                  <div className="space-y-3">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#5f5f5f] text-sm">
                        Minimum Order
                      </span>

                      <span className="text-black text-sm font-semibold">
                        {item.minimumOrder}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-[#5f5f5f] text-sm">
                        Product
                      </span>

                      <span className="text-black text-sm font-semibold">
                        {item.product}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-[#5f5f5f] text-sm">
                        Expiry
                      </span>

                      <span className="text-black text-sm font-semibold">
                        {item.expiryDate}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-[#5f5f5f] text-sm">
                        Usage Limit
                      </span>

                      <span className="text-black text-sm font-semibold">
                        {item.usageLimit}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-6 border border-[#8b6b08]/20 text-[#8b6b08] py-2.5 rounded-xl font-semibold bg-[#8b6b08]/5">
                    APPLY COUPON
                  </button>
                  <button
                    onClick={() => deleteCoupon(item._id)}
                    className="w-full mt-3 bg-red-500 text-white py-2 rounded-xl"
                  >
                    Delete Coupon
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}