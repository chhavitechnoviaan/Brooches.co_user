import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ShoppingBag,
  Trash2,
  Heart,
} from "lucide-react";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import {
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

import {
  addToCart,
} from "../../redux/slices/cartSlice";

export default function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <Navbar />

      <div className="max-w-[1450px] mx-auto px-6 lg:px-10 py-16 mt-10">
        {/* TOP HEADER */}
        <div className="flex items-center justify-between mb-14 border-b border-[#e8e1d8] pb-8">
          <div>
            <h1
              className="text-[58px] leading-none text-[#1c1c1c]"
              style={{
                fontFamily:
                  '"Cormorant Garamond", serif',
              }}
            >
              Wishlist
            </h1>

            <p className="mt-3 text-[#7a746d] tracking-[2px] uppercase text-[13px]">
              Luxury Pieces You Loved
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-3 border border-[#e7ddd2] rounded-full">
            <Heart
              size={18}
              className="text-[#9b7a28]"
              fill="#9b7a28"
            />

            <span className="text-[14px] text-[#444]">
              {wishlistItems.length} Saved
            </span>
          </div>
        </div>

        {/* EMPTY */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 bg-white border border-[#ebe4da]">
            <Heart
              size={70}
              strokeWidth={1.2}
              className="text-[#c8b8a2]"
            />

            <h2
              className="text-[42px] mt-6 text-[#1f1f1f]"
              style={{
                fontFamily:
                  '"Cormorant Garamond", serif',
              }}
            >
              Your Wishlist is Empty
            </h2>

            <p className="mt-3 text-[#77706a] text-[16px]">
              Add your favorite jewelry pieces here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white
                  border
                  border-[#ebe4da]
                  p-5
                  flex
                  flex-col
                  lg:flex-row
                  gap-6
                  hover:shadow-xl
                  transition-all
                  duration-500
                "
              >
                {/* IMAGE */}
                <div className="w-full lg:w-[280px] overflow-hidden bg-[#f3f0eb]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      h-[320px]
                      object-cover
                      hover:scale-105
                      transition-all
                      duration-700
                    "
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2
                      className="
                        text-[42px]
                        text-[#1c1c1c]
                        leading-none
                      "
                      style={{
                        fontFamily:
                          '"Cormorant Garamond", serif',
                      }}
                    >
                      {item.name}
                    </h2>

                    <div className="flex items-center gap-4 mt-5">
                      <span className="text-[24px] text-[#111]">
                        {item.price}
                      </span>

                      {item.oldPrice && (
                        <span className="line-through text-[#8c857e] text-[18px]">
                          {item.oldPrice}
                        </span>
                      )}
                    </div>

                    {item.finish && (
                      <div className="mt-5 inline-block border border-[#d8c8b0] px-4 py-2 text-[12px] tracking-[2px] uppercase text-[#8b6b08]">
                        {item.finish}
                      </div>
                    )}

                    <p className="mt-6 text-[#6f6962] leading-7 max-w-[700px]">
                      Crafted with timeless elegance and
                      premium detailing for a luxurious
                      statement look.
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap items-center gap-4 mt-10">
                    {/* ADD TO CART */}
                    <button
                      onClick={() =>
                        dispatch(addToCart(item))
                      }
                      className="
                        h-[56px]
                        px-8
                        bg-[#111]
                        text-white
                        uppercase
                        tracking-[2px]
                        text-[12px]
                        hover:bg-[#9b7a28]
                        transition-all
                        duration-300
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <ShoppingBag size={17} />
                      Add To Cart
                    </button>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        dispatch(
                          removeFromWishlist(
                            item.id
                          )
                        )
                      }
                      className="
                        h-[56px]
                        w-[56px]
                        border
                        border-[#e2d5c7]
                        text-[#444]
                        hover:bg-red-500
                        hover:text-white
                        hover:border-red-500
                        transition-all
                        duration-300
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}