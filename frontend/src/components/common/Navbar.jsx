import React, {
  useState,
  useEffect,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import axios from "axios";

import Account from "../../pages/user/Account";

import {
  setCart,
} from "../../redux/slices/cartSlice";

const Navbar = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showBadges, setShowBadges] =
    useState(false);

  const [showBrooches, setShowBrooches] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [mobileBadges, setMobileBadges] =
    useState(false);

  const [mobileBrooches, setMobileBrooches] =
    useState(false);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  // ====================================
  // FETCH CART
  // ====================================

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const storedUser =
          localStorage.getItem("user");

        const user = storedUser
          ? JSON.parse(storedUser)
          : null;
        if (!user) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cart/${user.id}`
        );

        if (
          response.data.success
        ) {

          dispatch(
            setCart(
              response.data.cartItems
            )
          );
        }

      } catch (error) {

        console.log(error);

      }
    };

    fetchCart();

  }, [dispatch]);

  // ====================================
  // CATEGORIES
  // ====================================

  const categoriesBadges = [
    "New Arrival",
    "Pop Culture & Fandom",
    "Gaming & Anime",
    "Music & Band",
    "Motivational & Quotes",
    "Travel & Adventure",
    "Aesthetic & Minimal",
    "Custom & Personalize",
  ];

  const categoriesBroaches = [
    "New Arrival",
    "Floral & Botanical",
    "Vintage & Antique",
    "Animal & Nature",
    "Geometric & Abstract",
    "Festive & Seasonal",
    "Pearl & Crystal",
    "Luxury Statement",
  ];

  // ====================================
  // TOTAL CART ITEMS
  // ====================================

  const totalCartItems =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f6f3] border-b border-[#e7e1d9]">

      {/* MAIN NAVBAR */}
      <div className="max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-10 py-4 lg:py-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6 lg:gap-20">

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() =>
              setMobileMenu(true)
            }
            className="lg:hidden"
          >

            <Menu
              size={28}
              strokeWidth={1.7}
            />

          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="text-[24px] sm:text-[28px] lg:text-3xl font-normal whitespace-nowrap"
            style={{
              fontFamily:
                '"Bodoni Moda", serif',
            }}
          >
            BROOCHES.CO
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8">

            {/* HOME */}
            <Link
              to="/"
              className="text-[#8b6a2c] text-[15px] uppercase tracking-[2px] font-medium"
            >
              Home
            </Link>

            {/* BADGES */}
            <div
              className="relative"
              onMouseEnter={() =>
                setShowBadges(true)
              }
              onMouseLeave={() =>
                setShowBadges(false)
              }
            >

              <div className="flex items-center gap-2 cursor-pointer">

                <span className="text-[15px] tracking-[2px] text-[#333] uppercase">
                  Badges
                </span>

                <ChevronDown size={15} />

              </div>

              {showBadges && (

                <div className="absolute top-full left-0 pt-2 z-50">

                  <div className="w-[270px] bg-white shadow-2xl border border-[#ece7df] py-4 rounded-md">

                    {categoriesBadges.map(
                      (item, index) => (

                        <Link
                          key={index}
                          to={`/explore/badges/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-6 py-3 text-[14px] tracking-[1px] text-[#444] hover:bg-[#f7f3ee] hover:text-[#8b6a2c] transition-all duration-300"
                        >
                          {item}
                        </Link>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* BROOCHES */}
            <div
              className="relative"
              onMouseEnter={() =>
                setShowBrooches(true)
              }
              onMouseLeave={() =>
                setShowBrooches(false)
              }
            >

              <div className="flex items-center gap-2 cursor-pointer">

                <span className="text-[15px] tracking-[2px] text-[#333] uppercase">
                  Brooches
                </span>

                <ChevronDown size={15} />

              </div>

              {showBrooches && (

                <div className="absolute top-full left-0 pt-2 z-50">

                  <div className="w-[270px] bg-white shadow-2xl border border-[#ece7df] py-4 rounded-md">

                    {categoriesBroaches.map(
                      (item, index) => (

                        <Link
                          key={index}
                          to={`/explore/brooches/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-6 py-3 text-[14px] tracking-[1px] text-[#444] hover:bg-[#f7f3ee] hover:text-[#8b6a2c] transition-all duration-300"
                        >
                          {item}
                        </Link>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

            {/* CONTACT */}
            <Link
              to="/contact"
              className="text-[15px] tracking-[2px] text-[#333] uppercase"
            >
              Contact Us
            </Link>

          </nav>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">

          {/* SEARCH */}
          <button>

            <Search
              size={22}
              strokeWidth={1.7}
            />

          </button>

          {/* ACCOUNT */}
          <div className="scale-[0.9] sm:scale-100">

            <Account />

          </div>

          {/* CART */}
          <button
            className="relative"
            onClick={() =>
              navigate("/cartsummary")
            }
          >

            <ShoppingBag
              size={22}
              strokeWidth={1.7}
            />

            {totalCartItems > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  bg-[#8b6a2c]
                  text-white
                  text-[10px]
                  rounded-full
                  min-w-[18px]
                  h-[18px]
                  px-1
                  flex
                  items-center
                  justify-center
                  font-medium
                "
              >
                {totalCartItems}
              </span>

            )}

          </button>

        </div>

      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-[85%] max-w-[340px] bg-white z-[100] shadow-2xl transition-all duration-500 ${
          mobileMenu
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* TOP */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#ece7df]">

          <h2
            className="text-[24px]"
            style={{
              fontFamily:
                '"Bodoni Moda", serif',
            }}
          >
            BROOCHES.CO
          </h2>

          <button
            onClick={() =>
              setMobileMenu(false)
            }
          >

            <X size={28} />

          </button>

        </div>

        {/* MENU */}
        <div className="px-5 py-6 flex flex-col">

          {/* HOME */}
          <Link
            to="/"
            onClick={() =>
              setMobileMenu(false)
            }
            className="py-4 border-b border-[#f1ece5] uppercase tracking-[2px] text-[14px]"
          >
            Home
          </Link>

          {/* BADGES */}
          <button
            onClick={() =>
              setMobileBadges(
                !mobileBadges
              )
            }
            className="flex items-center justify-between py-4 border-b border-[#f1ece5]"
          >

            <span className="uppercase tracking-[2px] text-[14px]">
              Badges
            </span>

            <ChevronDown
              size={18}
              className={`transition-all duration-300 ${
                mobileBadges
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {mobileBadges && (

            <div className="pl-3 pb-3">

              {categoriesBadges.map(
                (item, index) => (

                  <Link
                    key={index}
                    to={`/explore/badges/${item
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    onClick={() =>
                      setMobileMenu(
                        false
                      )
                    }
                    className="block py-3 text-[13px] text-[#555]"
                  >
                    {item}
                  </Link>

                )
              )}

            </div>

          )}

          {/* BROOCHES */}
          <button
            onClick={() =>
              setMobileBrooches(
                !mobileBrooches
              )
            }
            className="flex items-center justify-between py-4 border-b border-[#f1ece5]"
          >

            <span className="uppercase tracking-[2px] text-[14px]">
              Brooches
            </span>

            <ChevronDown
              size={18}
              className={`transition-all duration-300 ${
                mobileBrooches
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {mobileBrooches && (

            <div className="pl-3 pb-3">

              {categoriesBroaches.map(
                (item, index) => (

                  <Link
                    key={index}
                    to={`/explore/brooches/${item
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    onClick={() =>
                      setMobileMenu(
                        false
                      )
                    }
                    className="block py-3 text-[13px] text-[#555]"
                  >
                    {item}
                  </Link>

                )
              )}

            </div>

          )}

          {/* CONTACT */}
          <Link
            to="/contact"
            onClick={() =>
              setMobileMenu(false)
            }
            className="py-4 border-b border-[#f1ece5] uppercase tracking-[2px] text-[14px]"
          >
            Contact Us
          </Link>

        </div>

      </div>

      {/* OVERLAY */}
      {mobileMenu && (

        <div
          onClick={() =>
            setMobileMenu(false)
          }
          className="fixed inset-0 bg-black/40 z-[90] lg:hidden"
        />

      )}

    </header>

  );
};

export default Navbar;