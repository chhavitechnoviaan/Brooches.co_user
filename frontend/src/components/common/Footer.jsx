import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#f7f7f5] text-[#1f2d3d] px-6 sm:px-10 md:px-16 lg:px-24 py-14 md:py-20">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

        {/* Brand */}
        <div className="text-center sm:text-left">

          <h2
            className="text-[28px] sm:text-[34px] md:text-[38px] leading-none tracking-tight mb-6 md:mb-10"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            BROOCHES.CO
          </h2>

          <p className="text-[14px] sm:text-[15px] leading-[20px] max-w-[380px] text-[#23364a] font-light mx-auto sm:mx-0">
            Curating architectural precision and heritage craftsmanship in the world’s most exquisite brooch collection.
          </p>

          <div className="mt-8 md:mt-12 font-light">

            <h4 className="uppercase tracking-[3px] md:tracking-[4px] text-[12px] md:text-[14px] text-[#9a6b16] font-medium mb-3">
              Contact Us
            </h4>

            <p className="text-[15px] sm:text-[16px] md:text-[18px] mb-2">
              concierge@brooches.co
            </p>

            <p className="text-[15px] sm:text-[16px] md:text-[18px]">
              +1 (800) BROOCHES
            </p>

          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">

          <h4 className="uppercase tracking-[3px] md:tracking-[4px] text-[12px] md:text-[14px] text-[#9a6b16] font-medium mb-4">
            Quick Links
          </h4>

          <ul className="space-y-2 text-[15px] sm:text-[16px] md:text-[18px] font-light">

            <li><Link to="/" className="hover:text-black">Home</Link></li>
            <li><Link to="/" className="hover:text-black">Our Story</Link></li>

          </ul>

        </div>

        {/* Categories */}
        <div className="text-center sm:text-left">

          <h4 className="uppercase tracking-[3px] md:tracking-[4px] text-[12px] md:text-[14px] text-[#9a6b16] font-medium mb-4">
            Categories
          </h4>

          <ul className="space-y-2 text-[15px] sm:text-[16px] md:text-[18px] font-light">

            <li><Link to="/explore/royal-collection" className="hover:text-black">Royal Collection</Link></li>
            <li><Link to="/explore/vintage-archive" className="hover:text-black">Vintage Archive</Link></li>
            <li><Link to="/explore/wedding-luxe" className="hover:text-black">Wedding Luxe</Link></li>
            <li><Link to="/explore/minimalist-pins" className="hover:text-black">Minimalist Pins</Link></li>
            <li><Link to="/explore/limited-edition" className="hover:text-black">Limited Edition</Link></li>

          </ul>

        </div>

        {/* Support */}
        <div className="text-center sm:text-left">

          <h4 className="uppercase tracking-[3px] md:tracking-[4px] text-[12px] md:text-[14px] text-[#9a6b16] font-medium mb-4">
            Support
          </h4>

          <ul className="space-y-2 text-[15px] sm:text-[16px] md:text-[18px] font-light">

            <li>Shipping & Returns</li>
            <li>Care Guide</li>
            <li>Bespoke Inquiry</li>
            <li>Privacy Policy</li>

          </ul>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">

        <p className="uppercase tracking-[3px] md:tracking-[4px] text-[10px] sm:text-[12px] text-gray-400 text-center sm:text-left">
          © 2026 BROOCHES.CO. Crafted with elegance.
        </p>

      </div>
    </footer>
  );
}