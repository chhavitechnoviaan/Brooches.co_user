import React, { useState, useRef } from "react";
import {
  FiShield,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiPhone,
  FiFileText,
  FiGlobe,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiKey,
} from "react-icons/fi";
import img from "../../assets/images/login.png";
import { MdOutlineVerified, MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsShieldLock, BsGem } from "react-icons/bs";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const broochImg = "https://placehold.co/700x900/0a0a0a/8b6b08?text=✦";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [active, setActive] = useState("otp");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtp, setShowOtp] = useState(false);

  const inputRefs = useRef([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validate = () => {
    const errs = {};

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Valid email is required";

    if (
      active === "password" &&
      (!formData.password || formData.password.length < 8)
    ) {
      errs.password = "Password must be at least 8 characters";
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    console.log("formdata", formData);

    setLoading(true);

    setTimeout(() => {
      setShowOtp(true);
    }, 5000);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div
      className="min-h-screen bg-[#f8f6f3] flex items-center justify-center p-4 sm:p-6"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="w-full max-w-[980px] grid grid-cols-1 lg:grid-cols-2 shadow-2xl overflow-hidden  border-[#1e1e1e]">
        <div className="hidden lg:flex  relative  ">
          <div className="absolute bottom-0 h-full inset-0 opacity-80 ">
            {" "}
            <img src={img} className="w-full h-full object-cover" />
          </div>

          <div className="absolute bottom-10 left-14 z-10 ">
            <h1
              className="text-[38px] leading-tight text-[#efc238] mb-3"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              BROOCHES
            </h1>
            <p
              className="text-base text-white font-semibold leading-[1.6] max-w-[240px]"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              The Digital Atelier for High-Stakes Luxury Asset Management.
            </p>
          </div>
        </div>

        <div className="bg-[#fbf9f7] p-6   sm:p-8 overflow-y-auto max-h-screen lg:max-h-none space-y-5">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <BsGem size={18} className="text-[#8b6b08]" />
            <span
              className="text-[#c6a35d] text-lg"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Brooches
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <FiShield size={13} className="text-[#8b6b08]" />
            <span className="text-[10px] uppercase font-semibold tracking-[2.5px] text-[#8b6b08]">
              Secure Portal
            </span>
          </div>

          <h2
            className="text-3xl sm:text-[36px] text-black mb-1"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Admin Login
          </h2>
          <p className="text-sm sm:text-base text-black mb-1 font-serif">
            Authorized access for the Brooches Luxury Brooches Admin ecosystem.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#] border border-black px-3 py-1.5 rounded-lg mb-6">
            <span
              className={`text-xs uppercase font-serif font-semibold tracking-[1.5px]  px-2 py-1 rounded-lg ${
                active === "otp" ? "text-white bg-[#8b6b08]" : "text-black"
              }`}
              onClick={() => setActive("otp")}
            >
              {" "}
              Otp{" "}
            </span>
            <span
              className={`text-xs uppercase font-serif font-semibold tracking-[1.5px] text-black px-2 py-1 rounded-lg ${
                active === "password" ? "text-white bg-[#8b6b08]" : "text-black"
              }`}
              onClick={() => setActive("password")}
            >
              Password
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1  gap-x-5 gap-y-5 mb-5">
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-[2px] text-black mb-2">
                  Email
                </label>

                <div className="relative flex items-center  border-[#2a2520] focus-within:border-[#8b6b08] transition-all duration-300">
                  <span className="text-[#6d665d] mr-2">
                    <FiMail size={14} />
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    // className="flex-1 bg-transparent  outline-none text-[13px] text-black placeholder:text-[#6d665d] focus:placeholder:text-[#4a4540] transition"
                    className="flex-1 bg-transparent outline-none text-[13px] text-black placeholder:text-[#6d665d] focus:placeholder:text-[#4a4540] transition"
                  />
                </div>

                {errors.email && (
                  <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                    <FiAlertCircle size={10} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {active === "password" && (
              <div className="grid grid-cols-1  gap-x-5 gap-y-5 mb-6 ">
                <div className="">
                  <label className="block text-[10px] uppercase tracking-[2px] text-black mb-2">
                    Password
                  </label>
                  <div className="relative flex items-center  border-[#2a2520] focus-within:border-[#8b6b08] transition-all duration-300">
                    <span className="text-[#6d665d] mr-2">
                      <FiLock size={14} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className="flex-1 bg-transparent  outline-none text-[13px] text-black placeholder:text-[#6d665d] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#3a3530] hover:text-[#8b6b08] transition pb-1"
                    >
                      {showPassword ? (
                        <FiEyeOff size={14} className="text-[#6d665d]" />
                      ) : (
                        <FiEye size={14} className="text-[#6d665d]" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                      <FiAlertCircle size={10} /> {errors.password}
                    </p>
                  )}
                </div>
              </div>
            )}

            {showOtp && active === "otp" && (
              <div className="mb-4 gap-2  flex ">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`${"border-2 border-transparent focus:border-[#8b6b08] "} w-full aspect-square max-w-[48px] 
                sm:max-w-[56px] md:max-w-[40px]
                text-center text-base sm:text-lg font-bold bg-[#f1e8db] rounded-lg sm:rounded-xl 
                focus:bg-white outline-none transition-all placeholder-[#8b6b08]`}
                    placeholder="•"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRememberSession(!rememberSession)}
                  className={`w-4 h-4 border flex items-center justify-center transition-all duration-200 ${
                    rememberSession
                      ? "bg-[#8b6b08] border-[#8b6b08]"
                      : "border-[#3a3530]"
                  }`}
                >
                  {rememberSession && (
                    <FiCheckCircle size={10} className="text-white" />
                  )}
                </div>
                <span className="text-[11px] text-black">Remember Session</span>
              </label>
              <button
                type="button"
                className="text-[11px] text-black transition uppercase tracking-[1px]"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[50px] sm:h-[56px] bg-[#8b6b08] text-white uppercase tracking-[2px] text-[12px] font-semibold  transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <FiLock size={15} />
                  Secure Login
                  <FiArrowRight size={15} />
                </>
              )}
            </button>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-black font-serif">
                Dont have an account?
              </p>
              <button
                onClick={() => navigate("/admin-signup")}
                type="button"
                className="text-xs sm:text-sm text-[#8b6b08] font-serif font-semibold uppercase tracking-[1px]  transition flex items-center gap-1"
              >
                Sign up →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
