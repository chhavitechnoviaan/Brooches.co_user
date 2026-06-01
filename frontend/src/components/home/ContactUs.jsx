import React, { useState } from 'react';
import contact from "../../assets/banners/contact.png";
import mapImage from "../../assets/images/map.png";
import broach1 from "../../assets/images/broach1.png";
import broach2 from "../../assets/images/broach2.png";
import broach3 from "../../assets/images/broach3.png";
import broach4 from "../../assets/images/broach4.png";
import broach5 from "../../assets/images/broach5.png";
import { Heart } from "lucide-react";
import Footer from "../common/Footer"
import Navbar from "../common/Navbar"
import axios from "axios";
import Swal from "sweetalert2";

const ContactUs = () => {
  // Accordion toggle state ke liye
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we provide secure, insured white-glove delivery to over 120 countries worldwide. Each shipment is meticulously tracked."
    },
    {
      question: "How do I care for my brooch?",
      answer: "To preserve your brooch's timeless brilliance, keep it away from perfumes and moisture. Store it individually in its original velvet-lined box and clean gently with a lint-free cloth."
    },
    {
      question: "Can I request a custom design?",
      answer: "Absolutely. Our master artisans specialize in bringing your unique vision to life. You can select 'Custom Design' from the inquiry dropdown to begin your bespoke consultation."
    }
  ];

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      phone: "",
      inquiryType:
        "Product Inquiry",
      subject: "",
      message: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/contact/create`,
          formData
        );

        if (res.data.success) {

          Swal.fire({
            icon: "success",
            title:
              "Inquiry Sent Successfully",
            text:
              "Our team will contact you soon.",
            confirmButtonColor:
              "#735C00",
          });

          setFormData({
            fullName: "",
            email: "",
            phone: "",
            inquiryType:
              "Product Inquiry",
            subject: "",
            message: "",
          });
        }

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text:
            error.response?.data
              ?.message ||
            "Try again later",
        });
      }
    };
  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen flex flex-col justify-between selection:bg-stone-200">

      {/* Hero Section Container (With Dynamic Background Asset) */}
      <div
        className="relative w-full flex flex-col"
        style={{
          backgroundImage: `url(${contact})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: "bolder"
        }}
      >
        {/* Background Subtle Luxury Blur Overlay */}
        <div className="absolute inset-0 bg-white/40 z-0"></div>
        <Navbar />

        {/* 2. Hero Content Core Text Body */}
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 md:px-0 max-w-3xl mx-auto pt-24 pb-44">
          {/* <h1 className="text-5xl md:text-[74px] font-normal text-stone-900 leading-[1.15] tracking-tight mb-6"> */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[74px] font-normal text-stone-900 leading-[1.15] tracking-tight mb-6">
            Connect With Timeless <br /> Luxury
          </h1>

          {/* <p className="font-sans text-xs md:text-[18px] text-stone-950 max-w-xl leading-relaxed tracking-wide mb-10 font-light"> */}
          <p className="font-sans text-xs sm:text-sm md:text-[18px] text-stone-950 max-w-xl leading-relaxed tracking-wide mb-10 font-light">
            Our concierge team is here to assist you with elegance and care. Experience personalized service tailored to your exquisite taste.
          </p>

          <button className="font-sans text-[11px] uppercase tracking-[0.2em] text-amber-900 border border-amber-900/40 px-8 py-3.5 hover:bg-[#735C00] hover:text-white transition-all duration-500 ease-in-out bg-transparent">
            Talk to our team
          </button>
        </main>
      </div>

      {/* 3. Info Cards Section (Perfect Image-Overlap Blend Grid with Inner Radial Soft Gradient) */}
      {/* <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 -mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"> */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-12 -mt-24 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* Phone Contact Box */}
        <div className="bg-gradient-to-b from-white/95 to-white/75 backdrop-blur-xl border border-stone-200/50 p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:border-[#735C00]/40 hover:shadow-[0_20px_40px_rgba(115,92,0,0.06)] group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="#735C00" className="w-7 h-7 mb-5 transition-transform duration-300 group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.145-.44.02-1.27.397-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          <h3 className="font-serif text-[20px] font-normal text-stone-800 mb-3 tracking-wide">Phone</h3>
          <p className="font-sans text-sm md:text-[15px] tracking-widest text-stone-500 font-light group-hover:text-stone-900 transition-colors duration-300">+91 98765 43210</p>
        </div>

        {/* Email Contact Box */}
        {/* <div className="bg-gradient-to-b from-white/95 to-white/75 backdrop-blur-xl border border-stone-200/50 p-8 md:p-10 lg:p-12flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:border-[#735C00]/40 hover:shadow-[0_20px_40px_rgba(115,92,0,0.06)] group cursor-pointer"> */}
        <div className="bg-gradient-to-b from-white/95 to-white/75 backdrop-blur-xl border border-stone-200/50 p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:border-[#735C00]/40 hover:shadow-[0_20px_40px_rgba(115,92,0,0.06)] group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="#735C00" className="w-7 h-7 mb-5 transition-transform duration-300 group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <h3 className="font-serif text-[20px] font-normal text-stone-800 mb-3 tracking-wide">Email</h3>
          <p className="font-sans text-sm md:text-[15px] tracking-wider text-stone-500 font-light group-hover:text-stone-900 transition-colors duration-300">support@brooches.co</p>
        </div>

        {/* Working Hours Contact Box */}
        <div className="bg-gradient-to-b from-white/95 to-white/75 backdrop-blur-xl border border-stone-200/50 p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:border-[#735C00]/40 hover:shadow-[0_20px_40px_rgba(115,92,0,0.06)] group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.1" stroke="#735C00" className="w-7 h-7 mb-5 transition-transform duration-300 group-hover:scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="font-serif text-[20px] font-normal text-stone-800 mb-3 tracking-wide">Working Hours</h3>
          <p className="font-sans text-sm md:text-[15px] tracking-wide text-stone-500 font-light group-hover:text-stone-900 transition-colors duration-300">Mon–Sat / 10 AM – 8 PM</p>
        </div>
      </div>

      {/* 4. Form & Concierge Layout Container Module */}
      {/* <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24 mt-24"> */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24 mt-24">

        {/* Left Grid Side Section: Premium Send an Inquiry Panel */}
        <div className="lg:col-span-6 bg-white p-6 md:p-10 lg:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.02)] border border-stone-100/80 rounded-[4px]">
          <h2 className="font-serif text-4xl text-stone-900 font-normal mb-1 tracking-wide">Send an Inquiry</h2>
          <div className="w-12 h-[1.5px] bg-amber-800/60 mb-12"></div>

          {/* <form className="space-y-10" onSubmit={(e) => e.preventDefault()}> */}
          <form
            className="space-y-10"
            onSubmit={handleSubmit}
          >
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-8 md:gap-y-10">
              {/* Full Name Form Field */}
              <div className="flex flex-col border-b border-stone-200/80 py-1 focus-within:border-stone-900 transition-colors duration-300">
                <label className="font-sans text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Full Name</label>
                {/* <input type="text" className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1" /> */}
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col border-b border-stone-200/80 py-1 focus-within:border-stone-900 transition-colors duration-300">
                <label className="font-sans text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Email Address</label>
                {/* <input type="email" className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1" />
                 */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1"
                />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col border-b border-stone-200/80 py-1 focus-within:border-stone-900 transition-colors duration-300">
                <label className="font-sans text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Phone</label>
                {/* <input type="tel" className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1" /> */}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1"
                />
              </div>

              {/* Dropdown Type Box Selector Element */}
              <div className="flex flex-col border-b border-stone-200/80 py-1 focus-within:border-stone-900 transition-colors relative">
                <label className="font-sans text-[10px] uppercase tracking-widest text-[#735C00] font-bold mb-1">Inquiry Type</label>
                {/* <select className="bg-transparent border-none outline-none font-sans text-xs uppercase tracking-wider text-stone-800 pt-1.5 appearance-none cursor-pointer pr-6">
                  <option>Product Inquiry</option>
                  <option>Order Assistance</option>
                  <option>Returns & Exchange</option>
                  <option>Custom Jewelry Layout</option>
                </select> */}
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="bg-transparent border-none outline-none font-sans text-xs uppercase tracking-wider text-stone-800 pt-1.5 appearance-none cursor-pointer pr-6"
                >
                  <option value="Product Inquiry">
                    Product Inquiry
                  </option>

                  <option value="Order Assistance">
                    Order Assistance
                  </option>

                  <option value="Returns & Exchange">
                    Returns & Exchange
                  </option>

                  <option value="Custom Jewelry Layout">
                    Custom Jewelry Layout
                  </option>

                  <option value="Collaboration">
                    Collaboration
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
                <div className="absolute right-0 bottom-3 pointer-events-none text-stone-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subject Input Row Area */}
            <div className="flex flex-col border-b border-stone-200/80 py-1 focus-within:border-stone-900 transition-colors duration-300">
              <label className="font-sans text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Subject</label>
              {/* <input type="text" className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1" /> */}
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1"
              />
            </div>

            {/* Message Block Area */}
            <div className="flex flex-col border-b border-stone-200/80 py-1 focus-within:border-stone-900 transition-colors duration-300 pb-12">
              <label className="font-sans text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Message</label>
              {/* <input type="text" className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1" /> */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="bg-transparent border-none outline-none font-sans text-sm text-stone-900 pt-1 resize-none"
              />
            </div>

            {/* Form Submit Control Button */}
            <button type="submit" className="w-full bg-[#5A5A5A] hover:bg-stone-900 text-white font-sans text-xl uppercase tracking-[0.2em] py-4.5  font-bold transition-colors duration-300 shadow-sm">
              Send Message
            </button>
          </form>
        </div>

        {/* Right Grid Side Section: Concierge Capabilities & FAQs list panel wrapper */}
        <div className="lg:col-span-6 space-y-12 lg:pl-4 pt-2">

          {/* Concierge Services List Elements Block */}
          <div>
            <h2 className="font-serif text-3xl text-stone-900 font-normal mb-8 tracking-wide">Concierge Services</h2>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10"> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-8 md:gap-y-10">

              {/* Order Assistance */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-1 rounded-md transition-all duration-300 group-hover:text-[#735C00] group-hover:scale-110 group-hover:translate-x-1 text-stone-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-5 h-5 mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125a1.125 1.125 0 0 0 1.125-1.125V9.75M16.5 18.75V18a2.25 2.25 0 0 0-2.25-2.25H6.108m11.142-3.142 3.142-3.142a2.25 2.25 0 0 0 .658-1.589V7.95a2.25 2.25 0 0 0-2.25-2.25h-5.354a2.25 2.25 0 0 0-2.25 2.25v1.323M16.5 13.5h3.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-[17px] text-stone-900 font-semibold mb-1 transition-colors duration-300 group-hover:text-[#735C00]">Order Assistance</h4>
                  <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">Real-time tracking and delivery coordination for your precious pieces.</p>
                </div>
              </div>

              {/* Returns & Refunds */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-1 rounded-md transition-all duration-300 group-hover:text-[#735C00] group-hover:scale-110 group-hover:translate-x-1 text-stone-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-5 h-5 mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-[17px] text-stone-900 font-semibold mb-1 transition-colors duration-300 group-hover:text-[#735C00]">Returns & Refunds</h4>
                  <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">Seamless and discreet return services handled by our specialists.</p>
                </div>
              </div>

              {/* Product Consultation */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-1 rounded-md transition-all duration-300 group-hover:text-[#735C00] group-hover:scale-110 group-hover:translate-x-1 text-stone-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-5 h-5 mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-[17px] text-stone-900 font-semibold mb-1 transition-colors duration-300 group-hover:text-[#735C00]">Product Consultation</h4>
                  <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">Expert guidance on gemstone quality and metal selection.</p>
                </div>
              </div>

              {/* Styling Advice */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-1 rounded-md transition-all duration-300 group-hover:text-[#735C00] group-hover:scale-110 group-hover:translate-x-1 text-stone-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-5 h-5 mt-0.5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif text-[17px] text-stone-900 font-semibold mb-1 transition-colors duration-300 group-hover:text-[#735C00]">Styling Advice</h4>
                  <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">Curated suggestions for gala appearances and daily luxury.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Solid Geometric Split Divider Line */}
          <div className="w-full h-[0.5px] bg-stone-200"></div>


          <div className="mt-24">

            <h2
              // className="text-[42px] text-black mb-10"
              className="text-2xl md:text-3xl lg:text-[42px] text-black mb-10"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
              }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-1">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-stone-200/40 py-3">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left py-2 group focus:outline-none"
                  >
                    <span className="font-sans text-sm text-stone-900 font-normal tracking-wide group-hover:text-[#735C00] transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span className="text-stone-400 transition-transform duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`w-4 h-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-[#735C00]' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </button>

                  <div className={`grid transition-all duration-300 ease-in-out ${openFaq === index ? 'grid-rows-[1fr] opacity-100 pt-2 pb-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                    <div className="overflow-hidden font-sans text-xs md:text-[13.5px] text-stone-500 font-light leading-relaxed tracking-wide pr-6">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Elegant Layout Tail Blank Footer Buffer */}
      <div className="h-20 w-full bg-[#FCFBF9] border-t border-stone-200/20 mt-auto"></div>

      <section className="w-full bg-[#f5f3f1] py-12 md:py-20 px-6 md:px-20">

        <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-40">

          {/* LEFT */}
          <div>
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#8B6B1F] font-light">
              The Flagship
            </span>

            <h2
              className="text-[55px] leading-none text-black mt-10 mb-10"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 400,
              }}
            >
              Boutique Location
            </h2>

            <p className="text-[15px] leading-[1.2] text-stone-600">
              123 Avenue Montaigne, Paris, France.
              <br />
              Experience the full collection in a space designed for quiet
              contemplation of beauty.
            </p>

            <div className="w-full h-[1px] bg-[#d8cdb7] mt-14"></div>
          </div>

          {/* RIGHT */}
          <div>

            <span className="text-[11px] tracking-[0.35em] uppercase text-[#8B6B1F] font-light">
              Corporate
            </span>

            <h2
              className="text-[55px] leading-none text-black mt-10 mb-10"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 400,
              }}
            >
              Headquarters
            </h2>

            <p className="text-[15px] leading-[1.2] text-stone-600">
              Emerald Heights, Floor 42, Mayfair, London.
              <br />
              The creative pulse where our artisans and designers bring
              timeless visions to life.
            </p>

            <div className="w-full h-[1px] bg-[#d8cdb7] mt-14"></div>
          </div>
        </div>
      </section>

      <div className="h-24 bg-[#FAF9F6]"></div>


      {/* LUXURY MAP SECTION */}
      <section
        className="relative w-full h-[400px] md:h-[550px] lg:h-[660px]overflow-hidden border-t border-stone-200"
        style={{
          backgroundImage: `url(${mapImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Soft Luxury Overlay */}
        <div className="absolute inset-0 bg-[#f8f6f2]/20 backdrop-[1px]"></div>

        {/* Floating Card */}
        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-10">

          <div className="w-[90%] md:w-[420px] bg-[#f7f5f2]/95 border border-[#d8cfbf] rounded-[14px] p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-sm">

            {/* Heading */}
            <h2
              className="text-[42px] text-[#1a1a1a] leading-none mb-8"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 400,
              }}
            >
              Visit Our Boutique
            </h2>

            {/* Description */}
            <p className="text-[16px] leading-[1.8] text-stone-600 font-light max-w-[340px]">
              Step into a world of curated elegance. Walk-ins are welcome,
              though we recommend appointments for custom consultations.
            </p>

            {/* CTA */}
            <button className="group mt-12 flex items-center gap-4 uppercase tracking-[0.22em] text-[13px] font-semibold text-[#8a6a12] hover:gap-6 transition-all duration-500">

              Get Directions

              <span className="transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* <div className="min-h-screen bg-[#efeded] flex flex-col"> */}
<div className="w-full bg-[#efeded]">
        <section className="flex flex-col items-center justify-center pt-28 pb-20">
          <h1
            className="
        text-[48px]
        tracking-wide
        text-[#0e1a2b]
        font-serif
        leading-none
      "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            The World of Brooches
          </h1>

          <p
            className="
        mt-4
        text-[15px]
        tracking-[6px]
        text-[#a67c1b]
        uppercase
      "
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Follow us on Instagram @broochesco
          </p>
        </section>


        <section className="w-full">
          {/* <div className="grid grid-cols-5 h-[320px]"> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 h-auto md:h-[320px]">

            {[broach1, broach2, broach3, broach4, broach5].map(
              (img, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden cursor-pointer"
                >

                  <img
                    src={img}
                    alt="demo"
                    className="
              
                w-full h-40 sm:h-48 md:h-full object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-110
              "
                  />


                  <div
                    className="
                absolute inset-0
                bg-black/10
                opacity-0
                group-hover:opacity-100
                transition
                duration-500
              "
                  />


                  <div
                    className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-500
              "
                  >
                    <div
                      className="
                  bg-white/90
                  p-3
                  rounded-full
                  shadow-lg
                  backdrop-blur-sm
                  scale-75
                  group-hover:scale-100
                  transition-all
                  duration-500
                "
                    >
                      <Heart
                        className="text-[#A67C1B]"
                        size={22}
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
      <section className="w-full bg-[#f3efef] border-y border-[#ddd] py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">

          {/* Heading */}
          <h2
            className="
            text-2xl md:text-3xl lg:text-[40px]
            leading-none
            text-[#0f172a]
            tracking-wide
          "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Join the World of Timeless Luxury
          </h2>

          {/* Description */}
          <p
            className="
            mt-10
            text-[15px]
            leading-[32px]
            text-[#3b4556]
            max-w-3xl
            mx-auto
          "
            style={{
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Subscribe to receive exclusive invitations to atelier
            events, early access to new collections, and styling
            stories from our artisans.
          </p>

          {/* Form */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4">

            {/* Input */}
            <input
              type="email"
              placeholder="Your Email Address"
              className="
              w-full md:w-[540px] h-[50px] md:h-[58px] px-5 md:px-8 text-sm md:text-[22px]
              bg-transparent
              border
              border-[#d7d7d7]
              rounded-xl
              outline-none
              text-[#5d6778]
              placeholder:text-[#7b8596]
              focus:border-[#a67c1b]
              transition-all
              duration-300
            "
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            />

            {/* Button */}
            <button
              className="
              h-[50px] md:h-[58px] px-10 md:px-14 text-sm md:text-[22px]
              rounded-xl
              bg-[#6b6b6b]
              text-white
              tracking-wide
              uppercase
              transition-all
              duration-300
              hover:bg-[#555]
              hover:scale-[1.02]
              active:scale-[0.98]
            "
              style={{
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>


  );
};




export default ContactUs;











