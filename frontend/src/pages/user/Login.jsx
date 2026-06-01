import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import loginImage from "../../assets/images/Elysian.png";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath =
    location.state?.from || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        // "https://ecommerce-production-f584.up.railway.app/api/auth/login",
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // EMAIL DOES NOT EXIST
      if (
        response.data.status === true &&
        response.data.message ===
        "This Email Does Not Exits . Please Register"
      ) {

        Swal.fire({
          icon: "warning",
          title: "Email Not Found",
          text: response.data.message,
          timer: 3000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/register");
        }, 3000);

        return;
      }

      // LOGIN SUCCESS
      if (response.data.success === true) {

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome Back!",
          timer: 2000,
          showConfirmButton: false,
        });

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          response.data.token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        // // REDIRECT HOME
        // setTimeout(() => {
        //   navigate(redirectPath);
        // }, 2000);
        setTimeout(() => {
          // ADMIN LOGIN
          if (response.data.user.role === "admin") {
            navigate("/admin-dashboard");
          }

          // USER LOGIN
          else {
            navigate(redirectPath);
          }

        }, 2000);
      }

    } catch (error) {

      // INVALID PASSWORD
      if (
        error.response?.data?.message ===
        "Invalid email or password"
      ) {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
          confirmButtonColor: "#8b6a2c",
        });

      } else {

        // OTHER ERRORS
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong",
          text:
            error.response?.data?.message ||
            "Please try again later",
          confirmButtonColor: "#8b6a2c",
        });

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white shadow-[0_15px_60px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* LEFT IMAGE SECTION */}
        <div className="relative hidden lg:block">

          <img
            src={loginImage}
            alt="Luxury Brooch"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-16 left-14 text-white max-w-[450px]">

            <p className="uppercase tracking-[4px] text-[13px] text-[#f3d98c] mb-5">
              Welcome Back
            </p>

            <h2
              className="text-[64px] leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
              }}
            >
              Enter the World of Timeless Elegance
            </h2>

            <p className="mt-6 text-[17px] leading-[1.8] text-[#f5f5f5]">
              Access your exclusive collections, wishlist, orders,
              and luxury experiences curated only for you.
            </p>

          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="flex items-center justify-center px-8 md:px-16 py-20">

          <div className="w-full max-w-[480px]">

            {/* Heading */}
            <div className="mb-14">

              <p className="uppercase tracking-[4px] text-[13px] text-[#9a7a2f] font-medium">
                BROOCHES.CO
              </p>

              <h1
                className="mt-4 text-[56px] leading-none text-[#111]"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                Sign In
              </h1>

              <p className="mt-5 text-[17px] text-[#5c5c5c] leading-[1.8]">
                Sign in to continue your luxury shopping experience.
              </p>

            </div>

            {/* FORM */}
            <form
              className="space-y-8"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}
              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-[62px]
                    border
                    border-[#ddd6cc]
                    bg-[#faf9f7]
                    px-6
                    text-[15px]
                    outline-none
                    focus:border-[#9a7a2f]
                    transition-all
                  "
                />

              </div>

              {/* PASSWORD */}
              {/* <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-[62px]
                    border
                    border-[#ddd6cc]
                    bg-[#faf9f7]
                    px-6
                    text-[15px]
                    outline-none
                    focus:border-[#9a7a2f]
                    transition-all
                  "
                />

              </div> */}
              {/* PASSWORD */}
              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="
        w-full
        h-[62px]
        border
        border-[#ddd6cc]
        bg-[#faf9f7]
        px-6
        pr-14
        text-[15px]
        outline-none
        focus:border-[#9a7a2f]
        transition-all
      "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2
        text-[#777]
        hover:text-[#8b6a2c]
        transition
      "
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* OPTIONS */}
              <div className="flex items-center justify-between text-[14px]">

                <label className="flex items-center gap-3 text-[#666] cursor-pointer">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="text-[#8b6a2c] hover:opacity-70 transition"
                >
                  <Link
                    to="/forgot-password"
                    className="text-[#8b6a2c] hover:opacity-70 transition"
                  >
                    Forgot Password?
                  </Link>
                </button>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-[62px]
                  bg-[#8b6a2c]
                  text-white
                  uppercase
                  tracking-[3px]
                  text-[13px]
                  hover:bg-black
                  transition-all
                  duration-500
                "
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-10 text-center">

              <p className="text-[#666] text-[15px]">
                Don’t have an account?{" "}

                <Link
                  to="/register"
                  className="text-[#8b6a2c] hover:opacity-70 transition font-medium"
                >
                  Create Account
                </Link>

              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}