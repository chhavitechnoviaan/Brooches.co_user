import React, { useState } from "react";
import {
  FiShield,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
  FiPhone,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiKey,
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsGem } from "react-icons/bs";
import img from "../../assets/images/login.png";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      errs.mobile = "Valid 10-digit mobile number required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Valid email is required";
    if (!formData.password || formData.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
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
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  const inputClass =
    "flex-1 bg-transparent outline-none text-[13px] text-black placeholder:text-[#6d665d] focus:placeholder:text-[#4a4540] transition";

  const wrapperClass =
    "relative flex items-center border-b border-[#c5bfb8] focus-within:border-[#8b6b08] transition-all duration-300 pb-1";

  const labelClass =
    "block text-[10px] uppercase tracking-[2px] font-semibold text-black mb-2";

  return (
    <div
      className="min-h-screen bg-[#f8f6f3] flex items-center justify-center p-4 sm:p-6"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="w-full max-w-[980px] grid grid-cols-1 lg:grid-cols-2 shadow-2xl overflow-hidden">

        <div className="hidden lg:flex relative min-h-[680px]">
          <div className="absolute inset-0 opacity-80">
            <img src={img} alt="brooch" className="w-full h-full object-cover " />
          </div>
          <div className="absolute bottom-10 left-14 z-10">
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

        <div className="bg-[#fbf9f7] p-6 sm:p-8 overflow-y-auto space-y-5 max-h-screen lg:max-h-none">

          <div className="lg:hidden flex items-center gap-2 mb-5">
            <BsGem size={18} className="text-[#8b6b08]" />
            <span
              className="text-[#8b6b08] text-lg"
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
            Create Account
          </h2>
          <p className="text-sm text-black mb-3 font-serif" >
            Register for the Brooches Luxury Admin ecosystem.
          </p>

          <div className="inline-flex items-center gap-2 border border-black px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b6b08] animate-pulse" />
            <span className="text-[10px] font-serif uppercase font-semibold tracking-[1.5px] text-black">
              OTP Verification Active
            </span>
          </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">

                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className={wrapperClass}>
                    <span className="text-[#6d665d] mr-2">
                      <FiUser size={14} />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                      <FiAlertCircle size={10} /> {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Mobile Number</label>
                  <div className={wrapperClass}>
                    <span className="text-[#6d665d] mr-2">
                      <FiPhone size={14} />
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className={inputClass}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                      <FiAlertCircle size={10} /> {errors.mobile}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Email Address</label>
                  <div className={wrapperClass}>
                    <span className="text-[#6d665d] mr-2">
                      <FiMail size={14} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className={inputClass}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                      <FiAlertCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Password</label>
                  <div className={wrapperClass}>
                    <span className="text-[#6d665d] mr-2">
                      <FiLock size={14} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#6d665d] hover:text-[#8b6b08] transition"
                    >
                      {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                      <FiAlertCircle size={10} /> {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className={wrapperClass}>
                    <span className="text-[#6d665d] mr-2">
                      <FiKey size={14} />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-[#6d665d] hover:text-[#8b6b08] transition"
                    >
                      {showConfirmPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                      <FiAlertCircle size={10} /> {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setRememberSession(!rememberSession)}
                    className={`w-4 h-4 border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      rememberSession
                        ? "bg-[#8b6b08] border-[#8b6b08]"
                        : "border-[#3a3530]"
                    }`}
                  >
                    {rememberSession && (
                      <FiCheckCircle size={10} className="text-white" />
                    )}
                  </div>
                  <span className="text-[11px] font-serif text-black">
                    I agree to Terms & Conditions
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[50px] sm:h-[56px] bg-[#8b6b08] text-white uppercase tracking-[2px] text-[12px] font-semibold transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FiShield size={15} />
                    Create Account
                    <FiArrowRight size={15} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between pt-1">
                <p className="text-sm font-serif font-medium text-black">Already have an account?</p>
                <button
                  onClick={() => navigate('/admin-login')}
                  type="button"
                  className="text-xs sm:text-sm text-[#8b6b08] font-serif font-semibold uppercase tracking-[1px] transition flex items-center gap-1"
                >
                  Sign In →
                </button>
              </div>

             
            </form>
      
        </div>
      </div>
    </div>
  );
}