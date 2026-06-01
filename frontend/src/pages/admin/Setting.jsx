import React, { useState } from "react";
import {
  FiSettings,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiBell,
  FiCreditCard,
  FiTruck,
  FiGlobe,
  FiShield,
  FiImage,
  FiCheckCircle,
} from "react-icons/fi";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  useEffect(() => {
    fetchSettings();
  }, []);
  const navigate = useNavigate();
  const [settingsData, setSettingsData] = useState({
    storeName: "",
    adminEmail: "",
    name: "",
    phone: "",
    password: "",
    shippingCharge: "",
    currency: "INR",
    notifications: true,
    securityAlerts: true,
  });

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setSettingsData({
        storeName: data.settings.storeName,
        adminEmail: data.admin.email,
        phone: data.admin.phone,
        name: data.admin.name,
        password: "",
        shippingCharge: data.settings.shippingCharge,
        currency: data.settings.currency,
        notifications: data.settings.notifications,
        securityAlerts: data.settings.securityAlerts,
      });

    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettingsData({
      ...settingsData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        settingsData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Settings Updated Successfully",
        confirmButtonColor: "#8b6b08",
      });

      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-black text-2xl sm:text-3xl font-bold">
            Settings Management
          </h1>

          <p className="text-[#8b6b08] text-sm sm:text-base mt-2 font-medium">
            Manage luxury dashboard preferences and controls
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] p-5 sm:p-6 h-fit">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-14 h-14 rounded-full bg-[#8b6b08]/10 border border-[#8b6b08]/20 flex items-center justify-center">
                <FiSettings className="text-[#8b6b08] text-2xl" />
              </div>

              <div>
                <h2 className="text-black text-xl font-bold">
                  Dashboard Settings
                </h2>

                <p className="text-[#8b6b08] text-sm font-medium">
                  Configure your platform
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Store Name
                </label>

                <div className="relative">
                  <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="storeName"
                    value={settingsData.storeName}
                    onChange={handleChange}
                    placeholder="Store Name"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Admin Name
                </label>

                <div className="relative">

                  <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="name"
                    value={settingsData.name}
                    onChange={handleChange}
                    placeholder="Admin Name"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />

                </div>
              </div>
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Admin Email
                </label>

                <div className="relative">
                  <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="email"
                    // name="adminEmail"
                    name="email"
                    value={settingsData.adminEmail}
                    onChange={handleChange}
                    placeholder="Admin Email"
                    disabled
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <FiPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="phone"
                    value={settingsData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <div>
                {/* <label className="text-black text-sm font-semibold block mb-2">
                  Change Password
                </label>

                <div className="relative">
                  <FiLock className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="password"
                    name="password"
                    value={settingsData.password}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div> */}
                <div>
                  <label className="text-black text-sm font-semibold block mb-2">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="w-full flex items-center gap-3 bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 hover:border-[#8b6b08] transition"
                  >
                    <FiLock className="text-[#8b6b08]" />

                    <span className="text-[#8c8c8c]">
                      Reset Password
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Shipping Charge
                </label>

                <div className="relative">
                  <FiTruck className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="shippingCharge"
                    value={settingsData.shippingCharge}
                    onChange={handleChange}
                    placeholder="Shipping Charge"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Currency
                </label>

                <div className="relative">
                  <FiCreditCard className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <select
                    name="currency"
                    value={settingsData.currency}
                    onChange={handleChange}
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8b6b08] text-[#f8f6f3] py-3 rounded-xl font-semibold shadow-[0_0_30px_rgba(139,107,8,0.25)]"
              >
                SAVE SETTINGS
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#8b6b08]/10 border border-[#8b6b08]/20 flex items-center justify-center">
                  <FiBell className="text-[#8b6b08] text-xl" />
                </div>

                <div>
                  <h2 className="text-black text-lg sm:text-xl font-bold">
                    Notification Settings
                  </h2>

                  <p className="text-[#8b6b08] text-sm font-medium">
                    Manage alerts and notifications
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl p-4">
                  <div>
                    <h3 className="text-black font-semibold">
                      Email Notifications
                    </h3>

                    <p className="text-[#5f5f5f] text-sm mt-1">
                      Receive order and customer updates
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settingsData.notifications}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#8b6b08]"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl p-4">
                  <div>
                    <h3 className="text-black font-semibold">
                      Security Alerts
                    </h3>

                    <p className="text-[#5f5f5f] text-sm mt-1">
                      Login and device activity alerts
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="securityAlerts"
                    checked={settingsData.securityAlerts}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#8b6b08]"
                  />
                </div>


              </div>
            </div>


          </div>
        </div>
      </div >
    </div >
  );
}