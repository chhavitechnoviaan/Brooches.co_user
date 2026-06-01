import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import forgotImage from "../../assets/images/Elysian.png";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );

      Swal.fire({
        icon: "success",
        title: "Reset Link Sent",
        text:
          response.data.message ||
          "Password reset link sent to your email",
        confirmButtonColor: "#8b6a2c",
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
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

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white shadow-[0_15px_60px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="relative hidden lg:block">

          <img
            src={forgotImage}
            alt="Forgot Password"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute bottom-16 left-14 text-white max-w-[450px]">

            <p className="uppercase tracking-[4px] text-[13px] text-[#f3d98c] mb-5">
              Secure Access
            </p>

            <h2
              className="text-[64px] leading-none"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
              }}
            >
              Recover Your Luxury Account
            </h2>

            <p className="mt-6 text-[17px] leading-[1.8] text-[#f5f5f5]">
              Enter your registered email address and we’ll send you
              a secure password reset link.
            </p>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-8 md:px-16 py-20">

          <div className="w-full max-w-[480px]">

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
                Forgot Password
              </h1>

              <p className="mt-5 text-[17px] text-[#5c5c5c] leading-[1.8]">
                Enter your email to receive a password reset link.
              </p>

            </div>

            <form
              className="space-y-8"
              onSubmit={handleSubmit}
            >

              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
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
                {loading
                  ? "Sending..."
                  : "Send Reset Link"}
              </button>

            </form>

            <div className="mt-10 text-center">

              <Link
                to="/login"
                className="text-[#8b6a2c] hover:opacity-70 transition font-medium"
              >
                Back To Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}