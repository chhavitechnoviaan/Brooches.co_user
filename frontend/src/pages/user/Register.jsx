import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registerImage from "../../assets/images/black5.png";
import Swal from "sweetalert2";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD CHECK
    if (formData.password !== formData.confirmPassword) {

      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
        confirmButtonColor: "#8b6a2c",
      });

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
      );

      console.log(response.data);

      // USER ALREADY EXISTS
      if (
        response.data.message ===
        "This Email Already Exits . Please Login"
      ) {

        Swal.fire({
          icon: "success",
          title: "User Already Exists",
          text: "Redirecting to Login Page...",
          confirmButtonColor: "#8b6a2c",
        }).then(() => {

          navigate("/login");

        });

        return;
      }

      // REGISTER SUCCESS
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User registered successfully",
        confirmButtonColor: "#8b6a2c",
      }).then(() => {

        navigate("/login");

      });

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong",
        confirmButtonColor: "#8b6a2c",
      });

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-[1450px] grid grid-cols-1 lg:grid-cols-2 bg-white shadow-[0_15px_60px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* LEFT FORM SECTION */}
        <div className="flex items-center justify-center px-8 md:px-16 py-20 order-2 lg:order-1">

          <div className="w-full max-w-[520px]">

            {/* HEADER */}
            <div className="mb-14">

              <p className="uppercase tracking-[4px] text-[13px] text-[#9a7a2f] font-medium">
                BROOCHES.CO
              </p>

              <h1
                className="mt-4 text-[58px] leading-none text-[#111]"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                Create Account
              </h1>

              <p className="mt-5 text-[17px] text-[#5d5d5d] leading-[1.8]">
                Become part of our exclusive luxury community and
                explore timeless handcrafted collections.
              </p>

            </div>

            {/* FORM */}
            <form
              className="space-y-7"
              onSubmit={handleSubmit}
            >

              {/* FULL NAME */}
              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
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

              {/* EMAIL */}
              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
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

              {/* PHONE */}
              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
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
                  placeholder="Create password"
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
                    placeholder="Create password"
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
              {/* CONFIRM PASSWORD */}
              {/* <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
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
              {/* CONFIRM PASSWORD */}
              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
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
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
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
                    {showConfirmPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>

                </div>

              </div>
              {/* TERMS */}
              <label className="flex items-start gap-3 text-[14px] leading-[1.7] text-[#666] cursor-pointer">

                <input type="checkbox" className="mt-1" required />

                <span>
                  I agree to the{" "}
                  <span className="text-[#8b6a2c]">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-[#8b6a2c]">
                    Privacy Policy
                  </span>
                </span>

              </label>

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
                {loading ? "Creating..." : "Create Account"}
              </button>

            </form>

            {/* LOGIN LINK */}
            <div className="mt-10 text-center">

              <p className="text-[#666] text-[15px]">
                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-[#8b6a2c] hover:opacity-70 transition font-medium"
                >
                  Sign In
                </Link>

              </p>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative hidden lg:block order-1 lg:order-2">

          <img
            src={registerImage}
            alt="Luxury Register"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute bottom-16 left-14 text-white max-w-[460px]">

            <p className="uppercase tracking-[4px] text-[13px] text-[#f1d48a] mb-5">
              Luxury Membership
            </p>

            <h2
              className="text-[64px] leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
              }}
            >
              Begin Your Journey Into Elegance
            </h2>

            <p className="mt-6 text-[17px] leading-[1.8] text-[#f4f4f4]">
              Discover exclusive handcrafted brooches, premium collections,
              and personalized luxury experiences curated for timeless beauty.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}