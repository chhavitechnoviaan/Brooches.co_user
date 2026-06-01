import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";
import resetImage from "../../assets/images/Elysian.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPassword() {

  const navigate = useNavigate();

  const { token } = useParams();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] = useState({
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

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    // PASSWORD MATCH CHECK
    if (
      formData.password !==
      formData.confirmPassword
    ) {

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
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        {
          password: formData.password,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text:
          response.data.message ||
          "Your password has been reset successfully",
        confirmButtonColor: "#8b6a2c",
      }).then(() => {

        navigate("/login");

      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Reset Failed",
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
            src={resetImage}
            alt="Reset Password"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute bottom-16 left-14 text-white max-w-[450px]">

            <p className="uppercase tracking-[4px] text-[13px] text-[#f3d98c] mb-5">
              Secure Recovery
            </p>

            <h2
              className="text-[64px] leading-none"
              style={{
                fontFamily:
                  '"Cormorant Garamond", serif',
              }}
            >
              Create Your New Password
            </h2>

            <p className="mt-6 text-[17px] leading-[1.8] text-[#f5f5f5]">
              Your account security matters. Choose a
              strong password to continue your luxury
              experience.
            </p>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-8 md:px-16 py-20">

          <div className="w-full max-w-[480px]">

            {/* HEADER */}
            <div className="mb-14">

              <p className="uppercase tracking-[4px] text-[13px] text-[#9a7a2f] font-medium">
                BROOCHES.CO
              </p>

              <h1
                className="mt-4 text-[56px] leading-none text-[#111]"
                style={{
                  fontFamily:
                    '"Cormorant Garamond", serif',
                }}
              >
                Reset Password
              </h1>

              <p className="mt-5 text-[17px] text-[#5c5c5c] leading-[1.8]">
                Enter your new password below.
              </p>

            </div>

            {/* FORM */}
            <form
              className="space-y-8"
              onSubmit={handleSubmit}
            >

              {/* PASSWORD */}
              <div>

                <label className="block mb-3 uppercase tracking-[3px] text-[11px] text-[#8a8a8a]">
                  New Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter new password"
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
                      setShowPassword(
                        !showPassword
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
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>

                </div>

              </div>

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
                    placeholder="Confirm password"
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
                {loading
                  ? "Updating..."
                  : "Reset Password"}
              </button>

            </form>

            {/* BACK */}
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