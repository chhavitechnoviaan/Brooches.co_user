import React from "react";
import { FiLogOut } from "react-icons/fi";

export default function LogoutConfirmation({setShowLogoutModal}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px] bg-[#fbf9f7] border border-[#8b6b08]/30 rounded-xl shadow-2xl px-6 sm:px-8 py-10 sm:py-12">
        
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-[#8b6b08]/10 border border-[#8b6b08]/30 flex items-center justify-center shadow-[0_0_40px_rgba(139,107,8,0.18)]">
            <FiLogOut className="text-[#8b6b08] text-2xl" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-xl leading-[42px] sm:text-3xl sm:leading-[50px] font-bold text-black">
            Logout Confirmation
          </h1>

          <h2 className="text-[#8b6b08] text-sm sm:text-lg font-semibold mb-5">
            Are you sure you want to logout?
          </h2>

          <p className="text-[#5f5f5f] text-xs sm:text-sm leading-7 max-w-[290px] mx-auto">
            You'll need to sign in again to access the luxury admin dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <button  onClick={() => setShowLogoutModal(false)} className="w-full px-3 py-2 rounded-lg border border-[#d7d1c3] text-black font-medium text-[15px] bg-[#f8f6f3]">
            CANCEL
          </button>

          <button className="w-full rounded-lg bg-[#8b6b08] text-[#f8f6f3] font-medium text-xs sm:text-sm shadow-[0_0_30px_rgba(139,107,8,0.35)]">
            CONFIRM LOGOUT
          </button>
        </div>

        <div className="mt-14 text-center">
          <p className="text-[#8b6b08] text-[12px] tracking-[2px] font-semibold">
            BROOCHES LUXURY ECOSYSTEM
          </p>
        </div>
      </div>
    </div>
  );
}