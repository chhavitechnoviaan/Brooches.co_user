import React, { useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiClock,
  FiGift,
  FiTarget,
  FiMessageSquare,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  // GET USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
  };

// const menuItems = [
//   {
//     icon: <FiClock size={18} />,
//     label: "Order History",
//     path: "/ordershistory",
//   },
//   {
//     icon: <FiGift size={18} />,
//     label: "Gift Card Balance",
//     path: "/gift-card",
//   },
//   {
//     icon: <FiTarget size={18} />,
//     label: "Track Order",
//     path: "/track-orders",
//   },
//   { 
//     icon: <FiMessageSquare size={18} />,
//     label: "Contact Us",
//     path: "/contact",
//   },
// ];
  const menuItems = [
  {
    icon: <FiClock size={18} />,
    label: "Order History",
    path: "/ordershistory",
  },
  // {
  //   icon: <FiGift size={18} />,
  //   label: "Gift Card Balance",
  //   path: "/gift-card",
  // },
  {
    icon: <FiTarget size={18} />,
    label: "Track Order",
    path: "/track-orders",
  },
  {
    icon: <FiMessageSquare size={18} />,
    label: "Contact Us",
    path: "/contact",
  },

  // ADMIN ONLY
  ...(user?.role === "admin"
    ? [
        {
          icon: <FiUser size={18} />,
          label: "Admin Dashboard",
          path: "/admin-dashboard",
        },
      ]
    : []),
];
return (
    <div className="relative" ref={dropdownRef}>
      {/* USER ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-[46px]
          h-[46px]
          rounded-full
          border border-[#d9c7ae]
          bg-[#f8f5f1]
          flex items-center justify-center
          hover:bg-[#ede5dc]
          transition-all duration-300
          shadow-sm
        "
      >
        <FiUser
          size={20}
          className="text-[#5c4433]"
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute right-0 top-[65px]
            w-[340px]
            bg-[#faf7f2]
            rounded-[30px]
            border border-[#eadfce]
            shadow-[0_25px_80px_rgba(0,0,0,0.12)]
            overflow-hidden
            z-50
            backdrop-blur-xl
          "
        >
          {/* NOT LOGIN */}
          {!user ? (
            <div className="p-8">
              <p className="uppercase tracking-[4px] text-[11px] text-[#9c7c54] mb-3">
                Luxury Experience
              </p>

              <h2
                className="text-[42px] leading-none text-[#2f221b]"
                style={{
                  fontFamily:
                    '"Cormorant Garamond", serif',
                }}
              >
                Welcome
              </h2>

              <p className="text-[#7a6d64] mt-4 text-[15px] leading-[1.9]">
                Sign in to access your orders,
                wishlist and exclusive collections.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                {/* LOGIN */}
                <Link
                  to="/login"
                  className="
                    h-[56px]
                    rounded-full
                    bg-[#8b6a2c]
                    text-white
                    flex items-center justify-center
                    uppercase
                    tracking-[3px]
                    text-[12px]
                    hover:bg-[#2b1d17]
                    transition-all duration-500
                  "
                >
                  Sign In
                </Link>

                {/* REGISTER */}
                <Link
                  to="/register"
                  className="
                    h-[56px]
                    rounded-full
                    border border-[#d9c7ae]
                    text-[#5c4433]
                    flex items-center justify-center
                    uppercase
                    tracking-[3px]
                    text-[12px]
                    hover:bg-[#f1e7dc]
                    transition-all duration-500
                  "
                >
                  Create Account
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* USER CARD */}
              <div
                className="
                  relative
                  overflow-hidden
                  px-7 py-8
                  bg-gradient-to-br
                  from-[#3e2b22]
                  via-[#7a5637]
                  to-[#c6a16b]
                  text-white
                "
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                <div className="relative flex items-center gap-4">
                  <div
                    className="
                      w-16 h-16
                      rounded-full
                      bg-white/15
                      border border-white/30
                      flex items-center justify-center
                      backdrop-blur-md
                    "
                  >
                    <FiUser size={24} />
                  </div>

                  <div>
                    <p className="uppercase tracking-[3px] text-[10px] opacity-80 mb-1">
                      Premium Member
                    </p>

                    <h2
                      className="text-[32px] leading-none"
                      style={{
                        fontFamily:
                          '"Cormorant Garamond", serif',
                      }}
                    >
                      {user.name}
                    </h2>

                    <p className="text-[13px] opacity-90 mt-2">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* MENU */}
              <div className="p-4">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                 <Link
  to={item.path}
  key={index}
                      className="
                        group
                        w-full
                        flex items-center justify-between
                        px-4 py-4
                        rounded-2xl
                        hover:bg-[#f1e7dc]
                        transition-all duration-300
                      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            w-10 h-10
                            rounded-full
                            bg-white
                            border border-[#eadfce]
                            flex items-center justify-center
                            text-[#7a5637]
                            shadow-sm
                          "
                        >
                          {item.icon}
                        </div>

                        <span className="text-[15px] text-[#3c2d24] font-medium">
                          {item.label}
                        </span>
                      </div>

                      <FiChevronRight
                        className="
                          text-[#9f8666]
                          group-hover:translate-x-1
                          transition-all
                        "
                      />
                    </Link>
                  ))}
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="
                    mt-4
                    w-full
                    flex items-center justify-between
                    px-4 py-4
                    rounded-2xl
                    bg-red-50
                    hover:bg-red-100
                    transition-all duration-300
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-10 h-10
                        rounded-full
                        bg-white
                        flex items-center justify-center
                        text-red-500
                      "
                    >
                      <FiLogOut size={18} />
                    </div>

                    <span className="text-[15px] text-red-600 font-medium">
                      Log Out
                    </span>
                  </div>

                  <FiChevronRight className="text-red-400" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}