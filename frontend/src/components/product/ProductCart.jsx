// import React, { useState } from "react";
// import {
//   Share2,
//   Minus,
//   Plus,
//   Star,
//   Award,
//   Hammer,
//   ShieldCheck,
//   Gift,
//   Heart,
//   ShoppingBag,
//   User,
//   Globe,
//   CircleDashed,
//   Mail,
// } from "lucide-react";
// import cart1 from "../../assets/images/cart1.png";
// import cart2 from "../../assets/images/cart2.png";
// import cart3 from "../../assets/images/cart3.png";
// import cart4 from "../../assets/images/cart4.png";
// import love1 from "../../assets/images/love1.png";
// import love2 from "../../assets/images/love2.png";
// import love3 from "../../assets/images/love3.png";
// import love4 from "../../assets/images/love4.png";
// import black1 from "../../assets/images/black1.png";
// import black2 from "../../assets/images/black2.png";
// import black3 from "../../assets/images/black3.png";
// import black4 from "../../assets/images/black4.png";
// import black5 from "../../assets/images/black5.png";
// import review1 from "../../assets/images/review1.png";
// import review2 from "../../assets/images/review2.png";
// import { useNavigate, useLocation } from "react-router-dom";
// import CartSummary from "../cart/CartSummary"
// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer"
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";
// import { addToWishlist } from "../../redux/slices/wishlistSlice";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect } from "react";


// export default function ProductCart() {
//   const [quantity, setQuantity] = useState(1);
//   // const location = useLocation();
//   const dispatch = useDispatch();
//   // const product = location.state?.product;
//   const navigate = useNavigate();
//   const reviews = [
//     {
//       id: 1,
//       date: "Oct 12, 2023",
//       text: `“Absolutely stunning. The photos don’t do justice
// to the way it catches the light in person.
// Exquisite packaging as well.”`,
//       user: "Eleanor V.",
//       avatar: review1,
//     },
//     {
//       id: 2,
//       date: "Nov 04, 2023",
//       text: `“Bought this for a gala and received so many
// compliments. The quality is on par with pieces
// ten times the price.”`,
//       user: "Sophia L.",
//       avatar: review2,
//     },
//   ];

//   const images = [
//     product?.image || cart1,
//     cart2,
//     cart3,
//     cart4,
//   ];

//   const finishes = [
//     "Silver Platinum",
//     "18k Gold Plate",
//     "Rose Blush",
//   ];


//   const products = [
//     {
//       id: 1,
//       name: "EMERALD LEAF BROOCH",
//       price: "₹1,899",
//       image: love1,
//     },
//     {
//       id: 2,
//       name: "CELESTIAL PEARL PIN",
//       price: "₹2,100",
//       image: love2,
//     },
//     {
//       id: 3,
//       name: "ART DECO GEOMETRIC",
//       price: "₹1,650",
//       image: love3,
//     },
//     {
//       id: 4,
//       name: "IRIDESCENT MONARCH",
//       price: "₹2,899",
//       image: love4,
//     },
//   ];
//   const navItems = [
//     "Collections",
//     "High Jewelry",
//     "The Atelier",
//     "Bespoke",
//     "Journal",
//   ];
//   const [selectedImage, setSelectedImage] = useState(
//     product?.image || images[0]
//   );
//   const [selectedFinish, setSelectedFinish] = useState(
//     "Silver Platinum"
//   );
//   const [activeTab, setActiveTab] = useState("description");
//   const images1 = [
//     black1,
//     black2,
//     black3,
//     black4,
//     black5
//   ];
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#f6f4f2] px-20 py-4 max-w-[1300px] mx-auto mt-10">
//         <div
//           className="flex items-center gap-5 text-[15px] text-[#5d5a57] mb-10"
//           style={{
//             fontFamily: "Montserrat, sans-serif",
//           }}>
//           <span className="hover:text-black cursor-pointer">
//             Home
//           </span>

//           <span className="text-[#b8b3ae]">/</span>

//           <span className="hover:text-black cursor-pointer">
//             Collections
//           </span>

//           <span className="text-[#b8b3ae]">/</span>

//           <span className="hover:text-black cursor-pointer">
//             Brooches
//           </span>

//           <span className="text-[#b8b3ae]">/</span>

//           <span className="font-semibold text-black">
//             Royal Crystal Brooch
//           </span>
//         </div>

//         {/* MAIN SECTION */}
//         <div className="grid grid-cols-[60px_1fr_560px] gap-5">

//           {/* THUMBNAILS */}
//           <div className="flex flex-col gap-5">
//             {images.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedImage(img)}
//                 className={`
//                 border
//                 overflow-hidden
//                 transition
//                 ${selectedImage === img
//                     ? "border-[#b29042]"
//                     : "border-[#d9d4cf]"
//                   }
//               `}
//               >
//                 <img
//                   src={img}
//                   alt=""
//                   className="w-[70px] h-[80px] object-cover hover:scale-110 transition duration-500"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* MAIN IMAGE */}
//           <div className="border border-[#d8d3ce] bg-[#f8f8f8] overflow-hidden h-[580px] flex items-center justify-center">
//             <img
//               src={selectedImage}
//               alt="product"
//               className="w-[100%] object-contain transition duration-700 hover:scale-110 cursor-zoom-in"
//             />
//           </div>

//           {/* PRODUCT DETAILS */}
//           <div className="pt-2">

//             {/* TOP */}
//             <div className="flex items-center justify-between mb-6">
//               <span
//                 className="bg-[#ebe4da] text-[#c6a35d] px-5 py-1 rounded-full text-[12px]"
//                 style={{
//                   fontFamily: "Montserrat, sans-serif",
//                 }}
//               >
//                 Limited Edition
//               </span>

//               <div className="flex items-center gap-3">
//                 <div className="flex text-[#a27b14]">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={15}
//                       fill="#a27b14"
//                       strokeWidth={0}
//                     />
//                   ))}
//                 </div>

//                 <span
//                   className="text-[15px] text-[#4d4a47]"
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   324 Reviews
//                 </span>
//               </div>
//             </div>

//             {/* TITLE */}
//             <h1
//               className="text-[38px] leading-none text-[#111827] mb-6"
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//               }}
//             >
//               {/* Royal Crystal Brooch */}
//               {product?.name}
//             </h1>

//             {/* PRICE */}
//             <div className="flex items-center gap-5 mb-8">
//               <span
//                 className="text-[20px] text-[#111827]"
//               // style={{
//               //   fontFamily: "Cormorant Garamond, serif",
//               // }}
//               >
//                 {/* ₹2,499 */}
//                 {product?.price}
//               </span>

//               <span className="line-through text-[#8f8b86] text-[20px]">
//                 {/* ₹3,299 */}
//                 {product?.oldPrice}
//               </span>

//               <span className="text-[#d94c3d] text-[16px]">
//                 {/* 25% OFF */}
//                 {product?.badge}
//               </span>
//             </div>

//             {/* DESCRIPTION */}
//             <p
//               className="text-[17px] leading-[1.2] text-[#55514d] max-w-[520px] mb-5"
//               style={{
//                 fontFamily: "Montserrat, sans-serif",
//               }}
//             >
//               An exquisite masterpiece from our Atelier,
//               featuring hand-set Austrian crystals in a
//               rhodium-plated vintage framework. Designed
//               for the discerning individual who appreciates
//               timeless Parisian elegance.
//             </p>

//             {/* BADGES */}
//             <div className="flex items-center gap-5 mb-8">
//               <div className="bg-[#e8dfd1] px-2 py-2 rounded-full text-[10px] flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-[#8f6b0d]" />
//                 1.5k Sold
//               </div>

//               <div className="bg-[#eef7ef] px-2 py-2 rounded-full text-[10px] text-[#4d8d5c] flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-[#4d8d5c]" />
//                 In Stock
//               </div>
//             </div>

//             {/* MATERIAL */}
//             <div className="mb-5">
//               <h3
//                 className="uppercase text-[15px] text-[#4d4a47] mb-5"
//                 style={{
//                   fontFamily: "Montserrat, sans-serif",
//                 }}
//               >
//                 Material Finish
//               </h3>

//               <div className="flex gap-2">
//                 {finishes.map((item) => (
//                   <button
//                     key={item}
//                     onClick={() => setSelectedFinish(item)}
//                     className={`
//                     px-4
//                     py-2
//                     border
//                     text-[16px]
//                     transition-all
//                     duration-300
//                     ${selectedFinish === item
//                         ? "border-[#8f6b0d]"
//                         : "border-[#d8d3ce]"
//                       }

//                     hover:border-[#8f6b0d]
//                   `}
//                     style={{
//                       fontFamily: "Montserrat, sans-serif",
//                     }}
//                   >
//                     {item}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* CART SECTION */}
//             <div className="flex gap-4 mt-5">

//               {/* QUANTITY */}
//               <div className="w-[140px] h-[50px] border border-[#d8d3ce] flex items-center justify-around">
//                 {/* <button>
//                   <Minus size={18} />
//                 </button>

//                 <span
//                   className="text-[18px]"
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   1
//                 </span>

//                 <button>
//                   <Plus size={18} />
//                 </button> */}
//                 <button
//                   onClick={() =>
//                     setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
//                   }
//                 >
//                   <Minus size={18} />
//                 </button>

//                 <span
//                   className="text-[18px]"
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   {quantity}
//                 </span>

//                 <button
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                 >
//                   <Plus size={18} />
//                 </button>
//               </div>

//               {/* ADD TO BAG */}
//               {/* <button
//                 className="
//                 flex-1
//                 border
//                 border-[#9b7a28]
//                 text-[#111]
//                 uppercase
//                 tracking-[1px]
//                 text-[15px]
//                 hover:bg-[#9b7a28]
//                 hover:text-white
//                 transition-all
//                 duration-300
//               "
//                 style={{
//                   fontFamily: "Montserrat, sans-serif",
//                 }}
//               >
//                 Add To Bag
//               </button> */}
//               <button
//                 onClick={() => {
//                   dispatch(
//                     addToCart({
//                       ...product,
//                       quantity,
//                       finish: selectedFinish,
//                     })
//                   );

//                   navigate("/cartsummary");
//                 }}
//                 className="
//     flex-1
//     border
//     border-[#9b7a28]
//     text-[#111]
//     uppercase
//     tracking-[1px]
//     text-[15px]
//     hover:bg-[#9b7a28]
//     hover:text-white
//     transition-all
//     duration-300
//   "
//                 style={{
//                   fontFamily: "Montserrat, sans-serif",
//                 }}
//               >
//                 Add To Bag
//               </button>
//             </div>

//             {/* BUY NOW */}
//             <button
//               onClick={() => {
//                 dispatch(
//                   addToCart({
//                     ...product,
//                     quantity,
//                     finish: selectedFinish,
//                   })
//                 );

//                 navigate("/cartsummary");
//               }}
//               className="
//     mt-5
//     w-full
//     h-[55px]
//     bg-[#111315]
//     text-white
//     uppercase
//     tracking-[1px]
//     text-[18px]
//     hover:bg-[#9b7a28]
//     transition-all
//     duration-300
//   "
//               style={{
//                 fontFamily: "Montserrat, sans-serif",
//               }}
//             >
//               Buy It Now
//             </button>

//             {/* BOTTOM ACTIONS */}
//             {/* <div className="flex items-center justify-center gap-14 mt-10">

//               <button className="flex items-center gap-3 text-[#55514d] hover:text-black transition">
//                 <Heart size={18} />

//                 <span
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   Add to Wishlist
//                 </span>
//               </button>

//               <button className="flex items-center gap-3 text-[#55514d] hover:text-black transition">
//                 <Share2 size={18} />

//                 <span
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   Share
//                 </span>
//               </button>
//             </div> */}
//             {/* BOTTOM ACTIONS */}
//             <div className="flex items-center justify-center gap-14 mt-10">

//               {/* WISHLIST */}
//               <button
//                 onClick={() => {
//                   dispatch(
//                     addToWishlist({
//                       ...product,
//                       quantity,
//                       finish: selectedFinish,
//                     })
//                   );

//                   navigate("/wishlist");
//                 }}
//                 className="
//     flex
//     items-center
//     gap-3
//     text-[#55514d]
//     hover:text-black
//     transition
//   "
//               >
//                 <Heart size={18} />

//                 <span
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   Add to Wishlist
//                 </span>
//               </button>

//               {/* SHARE */}
//               <button
//                 className="
//       flex
//       items-center
//       gap-3
//       text-[#55514d]
//       hover:text-black
//       transition
//     "
//               >
//                 <Share2 size={18} />

//                 <span
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   Share
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>



//       <section className="w-full bg-[#f6f3ef] py-10 px-8 md:px-16">
//         {/* TOP FEATURES */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-28 w-full max-w-[1200px] mx-auto">

//           {/* CARD */}
//           <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
//             <Award
//               size={34}
//               strokeWidth={1.5}
//               className="mx-auto text-[#c89c3d] mb-6"
//             />

//             <h3
//               className="text-[28px] text-[#1d1d1d] leading-none"
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//               }}
//             >
//               Premium Materials
//             </h3>

//             <p className="text-[14px] text-[#7b746d] mt-2 leading-2 font-light">
//               Grade A Austrian Crystals & Rhodium Plate
//             </p>
//           </div>

//           {/* CARD */}
//           <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
//             <Hammer
//               size={34}
//               strokeWidth={1.5}
//               className="mx-auto text-[#c89c3d] mb-6"
//             />

//             <h3
//               className="text-[28px] text-[#1d1d1d] leading-none"
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//               }}
//             >
//               Handmade Luxury
//             </h3>

//             <p className="text-[14px] text-[#7b746d] mt-2 leading-2 font-light">
//               Artisanal crafting for over 48 hours
//             </p>
//           </div>

//           {/* CARD */}
//           <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
//             <ShieldCheck
//               size={34}
//               strokeWidth={1.5}
//               className="mx-auto text-[#c89c3d] mb-6"
//             />

//             <h3
//               className="text-[28px] text-[#1d1d1d] leading-none"
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//               }}
//             >
//               Tarnish Resistant
//             </h3>

//             <p className="text-[14px] text-[#7b746d] mt-2 leading-2 font-light">
//               Engineered for lifelong brilliance
//             </p>
//           </div>

//           {/* CARD */}
//           <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
//             <Gift
//               size={34}
//               strokeWidth={1.5}
//               className="mx-auto text-[#c89c3d] mb-6"
//             />

//             <h3
//               className="text-[28px] text-[#1d1d1d] leading-none"
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//               }}
//             >
//               Gift Ready
//             </h3>

//             <p className="text-[14px] text-[#7b746d] mt-2 leading-2 font-light">
//               Ships in signature Maison packaging
//             </p>
//           </div>
//         </div>


//       </section>



//       {/* TABS */}
//       <div className="max-w-5xl mx-auto mb-10">
//         {/* TAB BUTTONS */}
//         <div className="flex flex-wrap gap-10 border-b border-[#d8d1c8]">

//           <button
//             onClick={() => setActiveTab("description")}
//             className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "description"
//               ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
//               : "text-[#6f6a64]"
//               }`}
//           >
//             DESCRIPTION
//           </button>

//           <button
//             onClick={() => setActiveTab("specifications")}
//             className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "specifications"
//               ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
//               : "text-[#6f6a64]"
//               }`}
//           >
//             SPECIFICATIONS
//           </button>

//           <button
//             onClick={() => setActiveTab("shipping")}
//             className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "shipping"
//               ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
//               : "text-[#6f6a64]"
//               }`}
//           >
//             SHIPPING
//           </button>

//           <button
//             onClick={() => setActiveTab("care")}
//             className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "care"
//               ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
//               : "text-[#6f6a64]"
//               }`}
//           >
//             CARE INSTRUCTIONS
//           </button>
//         </div>

//         {/* TAB CONTENT */}
//         <div className="pt-14">

//           {activeTab === "description" && (
//             <div>
//               <p className="text-[20px] leading-[1.2] text-[#4f4943] font-light">
//                 A tribute to the grandeur of royal dynasties, the Royal
//                 Crystal Brooch is a masterpiece of light and shadow.
//                 Each stone is individually selected and hand-set into a
//                 delicate framework of rhodium-plated silver, ensuring
//                 maximum brilliance and architectural integrity.
//               </p>

//               <ul className="mt-12 space-y-5 text-[#4f4943] text-[18px]">
//                 <li className="flex gap-4">
//                   <span className="text-[#8f6b1d] text-[34px] leading-none">
//                     •
//                   </span>
//                   Intricate sunburst design with over 150 pave-set
//                   crystals.
//                 </li>

//                 <li className="flex gap-4">
//                   <span className="text-[#8f6b1d] text-[34px] leading-none">
//                     •
//                   </span>
//                   Secure safety catch for worry-free wear on any garment.
//                 </li>

//                 <li className="flex gap-4">
//                   <span className="text-[#8f6b1d] text-[34px] leading-none">
//                     •
//                   </span>
//                   Versatile design: wear as a brooch or a pendant on a
//                   fine chain.
//                 </li>
//               </ul>
//             </div>
//           )}

//           {activeTab === "specifications" && (
//             <div className="text-[#4f4943] text-[19px] leading-10">
//               <p>Material: Rhodium-Plated Silver</p>
//               <p>Stone Type: Austrian Crystals</p>
//               <p>Weight: 18g</p>
//               <p>Finish: High Polish Luxury Finish</p>
//             </div>
//           )}

//           {activeTab === "shipping" && (
//             <div className="text-[#4f4943] text-[19px] leading-10">
//               <p>Free worldwide shipping available.</p>
//               <p>Delivery within 5-7 business days.</p>
//               <p>Luxury signature gift packaging included.</p>
//             </div>
//           )}

//           {activeTab === "care" && (
//             <div className="text-[#4f4943] text-[19px] leading-10">
//               <p>Avoid contact with water and perfumes.</p>
//               <p>Store in a dry velvet-lined box.</p>
//               <p>Clean gently using a soft microfiber cloth.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ********** testimonial ************* */}
//       <section className="w-full bg-[#ffff] py-28 px-16">

//         <div className="max-w-[1500px] mx-auto grid grid-cols-[280px_1fr_1fr] gap-8 w-full max-w-[1200px] mx-auto">

//           <div>
//             {/* TITLE */}
//             <h3
//               className="
//               text-[38px]
//               text-[#0f172a]
//               leading-none
//               mb-5
//             "
//               style={{
//                 fontFamily: "Cormorant Garamond, serif",
//               }}
//             >
//               Client Experience
//             </h3>

//             {/* RATING */}
//             <div className="flex items-start gap-6 mb-10">

//               <h3
//                 className="
//                 text-[62px]
//                 leading-none
//                 text-[#111827]
//               "
//                 style={{
//                   fontFamily: "Cormorant Garamond, serif",
//                 }}
//               >
//                 4.8
//               </h3>

//               <div className="pt-4">

//                 {/* STARS */}
//                 <div className="flex items-center gap-1 mb-3">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={28}
//                       fill="#8b6b08"
//                       strokeWidth={0}
//                       className="text-[#8b6b08]"
//                     />
//                   ))}
//                 </div>

//                 {/* REVIEW TEXT */}
//                 <p
//                   className="
//                   text-[18px]
//                   text-[#334155]
//                   leading-[38px]
//                 "
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                     fontWeight: 300,
//                   }}
//                 >
//                   Based on 324
//                   <br />
//                   reviews
//                 </p>
//               </div>
//             </div>

//             {/* PROGRESS BARS */}
//             <div className="space-y-2">

//               {/* 5 STAR */}
//               <div className="flex items-center gap-7">

//                 <span
//                   className="text-[20px] text-[#111827]"
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   5
//                 </span>

//                 <div className="w-[230px] h-[8px] bg-[#e5e1dd] rounded-full overflow-hidden">
//                   <div className="w-[85%] h-full bg-[#8b6b08]" />
//                 </div>

//                 <span
//                   className="text-[20px] text-[#334155]"
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   85%
//                 </span>
//               </div>

//               {/* 4 STAR */}
//               <div className="flex items-center gap-7">

//                 <span
//                   className="text-[20px] text-[#111827]"
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   4
//                 </span>

//                 <div className="w-[230px] h-[8px] bg-[#e5e1dd] rounded-full overflow-hidden">
//                   <div className="w-[10%] h-full bg-[#8b6b08]" />
//                 </div>

//                 <span
//                   className="text-[20px] text-[#334155]"
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   10%
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* REVIEW CARDS */}
//           {reviews.map((review) => (
//             <div
//               key={review.id}
//               className="
//               bg-[#ffff]
//               border
//               border-[#e5e1dd]
//               rounded-[28px]
//               p-8
//               min-h-[270px]
//               flex
//               flex-col
//               justify-between
//               hover:shadow-lg
//               transition-all
//               duration-300
//             "
//             >

//               {/* TOP */}
//               <div >
//                 {/* STARS + DATE */}
//                 <div className="flex items-center justify-between mb-10">

//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={28}
//                         fill="#8b6b08"
//                         strokeWidth={0}
//                         className="text-[#8b6b08]"
//                       />
//                     ))}
//                   </div>

//                   <span
//                     className="text-[12px] text-[#64748b]"
//                     style={{
//                       fontFamily: "Montserrat, sans-serif",
//                     }}
//                   >
//                     {review.date}
//                   </span>
//                 </div>

//                 {/* REVIEW TEXT */}
//                 <p
//                   className="
//                   text-[15px]
//                   leading-[1.5]
//                   italic
//                   text-[#0f172a]
//                 "
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                     fontWeight: 300,
//                   }}
//                 >
//                   {review.text}
//                 </p>
//               </div>

//               {/* USER */}
//               <div className="flex items-center gap-5 mt-12">

//                 <img
//                   src={review.avatar}
//                   alt={review.user}
//                   className="
//                   w-[56px]
//                   h-[56px]
//                   rounded-full
//                   object-cover
//                 "
//                 />

//                 <span
//                   className="
//                   text-[28px]
//                   text-[#0f172a]
//                 "
//                   style={{
//                     fontFamily: "Cormorant Garamond, serif",
//                   }}
//                 >
//                   {review.user}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="w-full bg-[#f6f4f2] py-24 px-2">
//         {/* HEADING */}
//         <h2
//           className="
//           text-center
//           uppercase
//           text-[32px]
//           tracking-[1.2]
//           text-[#0f172a]
//           mb-10
//         "
//           style={{
//             fontFamily: "Cormorant Garamond, serif",
//           }}
//         >
//           You May Also Love
//         </h2>

//         {/* PRODUCTS */}
//         <div className="max-w-[1150px] mx-auto grid grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="group cursor-pointer"
//             >
//               {/* IMAGE */}
//               <div className="overflow-hidden bg-[#ebe7e3]">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="
//                   w-full
//                   h-[320px]
//                   object-cover
//                   transition-all
//                   duration-700
//                   group-hover:scale-110
//                 "
//                 />
//               </div>

//               {/* CONTENT */}
//               <div className="pt-7">
//                 <h4
//                   className="
//                   text-[15px]
//                   uppercase
//                   text-[#1e293b]
//                   tracking-[-0.3px]
//                   mb-3
//                   leading-tight
//                 "
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                     fontWeight: 400,
//                   }}
//                 >
//                   {product.name}
//                 </h4>

//                 <p
//                   className="
//                   text-[18px]
//                   text-[#334155]
//                 "
//                   style={{
//                     fontFamily: "Montserrat, sans-serif",
//                   }}
//                 >
//                   {product.price}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* </div> */}
//       </section>


//       <section className="w-full bg-[#ffff] py-20 px-6">
//         {/* Heading */}
//         <div className="text-center mb-14">
//           <h2
//             className="text-4xl md:text-4xl font-light text-[#1d1d1d]"
//             style={{ fontFamily: "serif" }}
//           >
//             Styled By Our Community
//           </h2>

//           <p className="mt-5 tracking-[6px] uppercase text-sm md:text-base text-[#2b2b2b]">
//             Tag @brooches.co #maisonbrooches
//           </p>
//         </div>

//         {/* Images */}
//         <div className="flex flex-wrap justify-center gap-5">
//           {images1.map((img, index) => (
//             <div
//               key={index}
//               className="group overflow-hidden w-[210px] h-[260px] bg-gray-200 cursor-pointer"
//             >
//               <img
//                 src={img}
//                 alt="community"
//                 className="
//                 w-full 
//                 h-full 
//                 object-cover 
//                 grayscale 
//                 transition-all 
//                 duration-500 
//                 group-hover:grayscale-0 
//                 group-hover:scale-105
//               "
//               />
//             </div>
//           ))}
//         </div>
//       </section>
//       <Footer />
//     </>

//   );
// }











import React, { useState, useEffect } from "react";
import {
  Share2,
  Minus,
  Plus,
  Star,
  Award,
  Hammer,
  ShieldCheck,
  Gift,
  Heart,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import review1 from "../../assets/images/review1.png";
import review2 from "../../assets/images/review2.png";

import black1 from "../../assets/images/black1.png";
import black2 from "../../assets/images/black2.png";
import black3 from "../../assets/images/black3.png";
import black4 from "../../assets/images/black4.png";
import black5 from "../../assets/images/black5.png";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";

import axios from "axios";
import placeholder from "../../assets/images/placeholder.jpg";
export default function ProductCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passedProduct = location.state?.product;

  const [product, setProduct] = useState(passedProduct || null);
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(
    passedProduct?.quantity || 1
  );

  const [selectedImage, setSelectedImage] = useState(
    passedProduct?.images?.[0] ||
    passedProduct?.image ||
    ""
  );

  const [selectedFinish, setSelectedFinish] =
    useState("Silver Platinum");

  const [activeTab, setActiveTab] =
    useState("description");

  useEffect(() => {
    if (passedProduct) {
      setProduct(passedProduct);

      setSelectedImage(
        passedProduct?.images?.[0] ||
        passedProduct?.image
      );
    }
  }, [passedProduct]);

  // OPTIONAL API FETCH IF PAGE REFRESHED
  useEffect(() => {
    const fetchProduct = async () => {
      if (passedProduct?._id || product) return;

      try {
        setLoading(true);

        const path = window.location.pathname;
        const productId = path.split("/").pop();

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${productId}`
        );

        if (response.data.success) {
          setProduct(response.data.product);

          setSelectedImage(
            response.data.product.images?.[0]
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [passedProduct, product]);

  const reviews = [
    {
      id: 1,
      date: "Oct 12, 2023",
      text: `Absolutely stunning. The photos don’t do justice to the way it catches the light in person.`,
      user: "Eleanor V.",
      avatar: review1,
    },
    {
      id: 2,
      date: "Nov 04, 2023",
      text: `Bought this for a gala and received so many compliments.`,
      user: "Sophia L.",
      avatar: review2,
    },
  ];

  const finishes = [
    "Silver Platinum",
    "18k Gold Plate",
    "Rose Blush",
  ];

  const communityImages = [
    black1,
    black2,
    black3,
    black4,
    black5,
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Product Not Found
      </div>
    );
  }

  const productImages =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const finalPrice =
    product.salePrice || product.regularPrice;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f6f4f2] px-20 py-4 max-w-[1300px] mx-auto mt-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-5 text-[15px] text-[#5d5a57] mb-10">
          <span>Home</span>

          <span>/</span>

          <span>Collections</span>

          <span>/</span>

          <span className="font-semibold text-black">
            {product.product}
          </span>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-[60px_1fr_560px] gap-5">

          {/* THUMBNAILS */}
          <div className="flex flex-col gap-5">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedImage(img)
                }
                className={`border overflow-hidden transition ${selectedImage === img
                  ? "border-[#b29042]"
                  : "border-[#d9d4cf]"
                  }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-[70px] h-[80px] object-cover"
                />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="border border-[#d8d3ce] bg-[#f8f8f8] overflow-hidden h-[580px] flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.product}
              className="w-full h-full object-contain transition duration-700 hover:scale-105"
            />
          </div>

          {/* DETAILS */}
          <div className="pt-2">

            {/* TOP */}
            <div className="flex items-center justify-between mb-6">

              <span className="bg-[#ebe4da] text-[#c6a35d] px-5 py-1 rounded-full text-[12px]">
                {product.badge || "Premium"}
              </span>

              <div className="flex items-center gap-3">
                <div className="flex text-[#a27b14]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill="#a27b14"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <span className="text-[15px] text-[#4d4a47]">
                  {product.rating || 5} Reviews
                </span>
              </div>
            </div>

            {/* TITLE */}
            <h1
              className="text-[38px] leading-none text-[#111827] mb-6"
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",
              }}
            >
              {product.product}
            </h1>

            {/* PRICE */}
            <div className="flex items-center gap-5 mb-8">

              <span className="text-[20px] text-[#111827]">
                ₹{finalPrice?.toLocaleString()}
              </span>

              {product.regularPrice &&
                product.salePrice && (
                  <span className="line-through text-[#8f8b86] text-[20px]">
                    ₹
                    {product.regularPrice.toLocaleString()}
                  </span>
                )}

              {product.badge && (
                <span className="text-[#d94c3d] text-[16px]">
                  {product.badge}
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-[17px] leading-[1.6] text-[#55514d] max-w-[520px] mb-5">
              {product.description ||
                "Luxury handcrafted brooch designed with premium finishing and timeless elegance."}
            </p>

            {/* STOCK */}
            <div className="flex items-center gap-5 mb-8">

              <div className="bg-[#e8dfd1] px-2 py-2 rounded-full text-[10px] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8f6b0d]" />
                Bestseller
              </div>

              <div className="bg-[#eef7ef] px-2 py-2 rounded-full text-[10px] text-[#4d8d5c] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4d8d5c]" />
                In Stock
              </div>
            </div>

            {/* FINISH */}
            <div className="mb-5">
              <h3 className="uppercase text-[15px] text-[#4d4a47] mb-5">
                Material Finish
              </h3>

              <div className="flex gap-2">
                {finishes.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setSelectedFinish(item)
                    }
                    className={`px-4 py-2 border text-[16px] transition-all duration-300 ${selectedFinish === item
                      ? "border-[#8f6b0d]"
                      : "border-[#d8d3ce]"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* CART SECTION */}
            <div className="flex gap-4 mt-5">

              {/* QUANTITY */}
              <div className="w-[140px] h-[50px] border border-[#d8d3ce] flex items-center justify-around">

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev > 1 ? prev - 1 : 1
                    )
                  }
                >
                  <Minus size={18} />
                </button>

                <span className="text-[18px]">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => prev + 1)
                  }
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* ADD TO BAG */}
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      productId:
                        product._id,
                      name:
                        product.product,
                      image:
                        product.images?.[0],
                      price: finalPrice,
                      quantity,
                      finish:
                        selectedFinish,
                    })
                  );

                  navigate("/cartsummary");
                }}
                className="flex-1 border border-[#9b7a28] text-[#111] uppercase tracking-[1px] text-[15px] hover:bg-[#9b7a28] hover:text-white transition-all duration-300"
              >
                Add To Bag
              </button>
            </div>

            {/* BUY NOW */}
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    productId:
                      product._id,
                    name:
                      product.product,
                    image:
                      product.images?.[0],
                    price: finalPrice,
                    quantity,
                    finish:
                      selectedFinish,
                  })
                );

                navigate("/cartsummary");
              }}
              className="mt-5 w-full h-[55px] bg-[#111315] text-white uppercase tracking-[1px] text-[18px] hover:bg-[#9b7a28] transition-all duration-300"
            >
              Buy It Now
            </button>

            {/* ACTIONS */}
            <div className="flex items-center justify-center gap-14 mt-10">

              {/* WISHLIST */}
              <button
                onClick={() => {
                  dispatch(
                    addToWishlist({
                      ...product,
                      quantity,
                    })
                  );

                  navigate("/wishlist");
                }}
                className="flex items-center gap-3 text-[#55514d] hover:text-black transition"
              >
                <Heart size={18} />

                <span>
                  Add to Wishlist
                </span>
              </button>

              {/* SHARE */}
              <button className="flex items-center gap-3 text-[#55514d] hover:text-black transition">
                <Share2 size={18} />

                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="w-full bg-[#f6f3ef] py-10 px-8 md:px-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-28 w-full max-w-[1200px] mx-auto">

          <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
            <Award
              size={34}
              strokeWidth={1.5}
              className="mx-auto text-[#c89c3d] mb-6"
            />

            <h3 className="text-[28px] text-[#1d1d1d] leading-none" style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
            >
              Premium Materials
            </h3>

            <p className="text-[14px] text-[#7b746d] mt-2" style={{
              fontFamily: "Cormorant Garamond, serif",
            }}>
              Grade A Austrian Crystals
            </p>
          </div>

          <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
            <Hammer
              size={34}
              strokeWidth={1.5}
              className="mx-auto text-[#c89c3d] mb-6"
            />

            <h3 className="text-[28px] text-[#1d1d1d] leading-none" style={{
              fontFamily: "Cormorant Garamond, serif",
            }}>
              Handmade Luxury
            </h3>

            <p className="text-[14px] text-[#7b746d] mt-2" style={{
              fontFamily: "Cormorant Garamond, serif",
            }}>
              Artisanal crafting
            </p>
          </div>

          <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
            <ShieldCheck
              size={34}
              strokeWidth={1.5}
              className="mx-auto text-[#c89c3d] mb-6"
            />

            <h3 className="text-[28px] text-[#1d1d1d] leading-none" style={{
              fontFamily: "Cormorant Garamond, serif",
            }}>
              Tarnish Resistant
            </h3>

            <p className="text-[14px] text-[#7b746d] mt-2" style={{
              fontFamily: "Cormorant Garamond, serif",
            }}>
              Long lasting brilliance
            </p>
          </div>

          <div className="border border-[#e5dfd8] bg-[#ffff] py-10 px-8 text-center">
            <Gift
              size={34}
              strokeWidth={1.5}
              className="mx-auto text-[#c89c3d] mb-6"
            />

            <h3 className="text-[28px] text-[#1d1d1d] leading-none" style={{
              fontFamily: "Cormorant Garamond, serif",
            }}>
              Gift Ready
            </h3>

            <p className="text-[14px] text-[#7b746d] mt-2">
              Premium packaging included
            </p>
          </div>
        </div>
      </section>

      {/* TABS */}
      {/* <div className="max-w-5xl mx-auto mb-10">

        <div className="flex flex-wrap gap-10 border-b border-[#d8d1c8]">

          {[
            "description",
            "specifications",
            "shipping",
            "care",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`pb-5 text-[17px] tracking-wide transition ${
                activeTab === tab
                  ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
                  : "text-[#6f6a64]"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="pt-14">

          {activeTab === "description" && (
            <p className="text-[20px] leading-[1.6] text-[#4f4943] font-light">
              {product.description}
            </p>
          )}

          {activeTab ===
            "specifications" && (
            <div className="text-[#4f4943] text-[19px] leading-10">
              <p>
                Material: Premium Alloy
              </p>

              <p>
                Weight: 18g
              </p>

              <p>
                Finish: Luxury Finish
              </p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="text-[#4f4943] text-[19px] leading-10">
              <p>
                Free worldwide shipping
                available.
              </p>

              <p>
                Delivery within 5-7
                business days.
              </p>
            </div>
          )}

          {activeTab === "care" && (
            <div className="text-[#4f4943] text-[19px] leading-10">
              <p>
                Avoid contact with water
                and perfumes.
              </p>

              <p>
                Store in dry place.
              </p>
            </div>
          )}
        </div>
      </div> */}

      {/* TABS */}
      <div className="max-w-5xl mx-auto mb-10" style={{
        fontFamily: "Cormorant Garamond, serif",
      }}>
        {/* TAB BUTTONS */}
        <div className="flex flex-wrap gap-10 border-b border-[#d8d1c8]">

          <button
            onClick={() => setActiveTab("description")}
            className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "description"
              ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
              : "text-[#6f6a64]"
              }`}
          >
            DESCRIPTION
          </button>

          <button
            onClick={() => setActiveTab("specifications")}
            className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "specifications"
              ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
              : "text-[#6f6a64]"
              }`}
          >
            SPECIFICATIONS
          </button>

          <button
            onClick={() => setActiveTab("shipping")}
            className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "shipping"
              ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
              : "text-[#6f6a64]"
              }`}
          >
            SHIPPING
          </button>

          <button
            onClick={() => setActiveTab("care")}
            className={`pb-5 text-[17px] tracking-wide transition ${activeTab === "care"
              ? "border-b-2 border-[#8f6b1d] text-[#1f1f1f]"
              : "text-[#6f6a64]"
              }`}
          >
            CARE INSTRUCTIONS
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="pt-14">

          {activeTab === "description" && (
            <div>
              <p className="text-[20px] leading-[1.2] text-[#4f4943] font-light">
                A tribute to the grandeur of royal dynasties, the Royal
                Crystal Brooch is a masterpiece of light and shadow.
                Each stone is individually selected and hand-set into a
                delicate framework of rhodium-plated silver, ensuring
                maximum brilliance and architectural integrity.
              </p>

              <ul className="mt-12 space-y-5 text-[#4f4943] text-[18px]">
                <li className="flex gap-4">
                  <span className="text-[#8f6b1d] text-[34px] leading-none">
                    •
                  </span>
                  Intricate sunburst design with over 150 pave-set
                  crystals.
                </li>

                <li className="flex gap-4">
                  <span className="text-[#8f6b1d] text-[34px] leading-none">
                    •
                  </span>
                  Secure safety catch for worry-free wear on any garment.
                </li>

                <li className="flex gap-4">
                  <span className="text-[#8f6b1d] text-[34px] leading-none">
                    •
                  </span>
                  Versatile design: wear as a brooch or a pendant on a
                  fine chain.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="text-[#4f4943] text-[19px] leading-10">
              <p>Material: Rhodium-Plated Silver</p>
              <p>Stone Type: Austrian Crystals</p>
              <p>Weight: 18g</p>
              <p>Finish: High Polish Luxury Finish</p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="text-[#4f4943] text-[19px] leading-10">
              <p>Free worldwide shipping available.</p>
              <p>Delivery within 5-7 business days.</p>
              <p>Luxury signature gift packaging included.</p>
            </div>
          )}

          {activeTab === "care" && (
            <div className="text-[#4f4943] text-[19px] leading-10">
              <p>Avoid contact with water and perfumes.</p>
              <p>Store in a dry velvet-lined box.</p>
              <p>Clean gently using a soft microfiber cloth.</p>
            </div>
          )}
        </div>
      </div>

      {/* REVIEWS */}
      {/* ********** testimonial ************* */}
      <section className="w-full bg-[#ffff] py-28 px-16" >

        <div className="max-w-[1500px] mx-auto grid grid-cols-[280px_1fr_1fr] gap-8 w-full max-w-[1200px] mx-auto">

          <div>
            {/* TITLE */}
            <h3
              className="
              text-[38px]
              text-[#0f172a]
              leading-none
              mb-5
            "
              style={{
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Client Experience
            </h3>

            {/* RATING */}
            <div className="flex items-start gap-6 mb-10">

              <h3
                className="
                text-[62px]
                leading-none
                text-[#111827]
              "
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                4.8
              </h3>

              <div className="pt-4">

                {/* STARS */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={28}
                      fill="#8b6b08"
                      strokeWidth={0}
                      className="text-[#8b6b08]"
                    />
                  ))}
                </div>

                {/* REVIEW TEXT */}
                <p
                  className="
                  text-[18px]
                  text-[#334155]
                  leading-[38px]
                "
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Based on 324
                  <br />
                  reviews
                </p>
              </div>
            </div>

            {/* PROGRESS BARS */}
            <div className="space-y-2">

              {/* 5 STAR */}
              <div className="flex items-center gap-7">

                <span
                  className="text-[20px] text-[#111827]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  5
                </span>

                <div className="w-[230px] h-[8px] bg-[#e5e1dd] rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-[#8b6b08]" />
                </div>

                <span
                  className="text-[20px] text-[#334155]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  85%
                </span>
              </div>

              {/* 4 STAR */}
              <div className="flex items-center gap-7">

                <span
                  className="text-[20px] text-[#111827]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  4
                </span>

                <div className="w-[230px] h-[8px] bg-[#e5e1dd] rounded-full overflow-hidden">
                  <div className="w-[10%] h-full bg-[#8b6b08]" />
                </div>

                <span
                  className="text-[20px] text-[#334155]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  10%
                </span>
              </div>
            </div>
          </div>

          {/* REVIEW CARDS */}
          {reviews.map((review) => (
            <div
              key={review.id}
              className="
              bg-[#ffff]
              border
              border-[#e5e1dd]
              rounded-[28px]
              p-8
              min-h-[270px]
              flex
              flex-col
              justify-between
              hover:shadow-lg
              transition-all
              duration-300
            "
            >

              {/* TOP */}
              <div >
                {/* STARS + DATE */}
                <div className="flex items-center justify-between mb-10">

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={28}
                        fill="#8b6b08"
                        strokeWidth={0}
                        className="text-[#8b6b08]"
                      />
                    ))}
                  </div>

                  <span
                    className="text-[12px] text-[#64748b]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {review.date}
                  </span>
                </div>

                {/* REVIEW TEXT */}
                <p
                  className="
                  text-[15px]
                  leading-[1.5]
                  italic
                  text-[#0f172a]
                "
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {review.text}
                </p>
              </div>

              {/* USER */}
              <div className="flex items-center gap-5 mt-12">

                <img
                  src={review.avatar}
                  alt={review.user}
                  className="
                  w-[56px]
                  h-[56px]
                  rounded-full
                  object-cover
                "
                />

                <span
                  className="
                  text-[28px]
                  text-[#0f172a]
                "
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {review.user}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* COMMUNITY */}
      <section className="w-full bg-[#ffff] py-20 px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-light text-[#1d1d1d]">
            Styled By Our Community
          </h2>

          <p className="mt-5 tracking-[6px] uppercase text-sm md:text-base text-[#2b2b2b]">
            Tag @brooches.co
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">

          {communityImages.map((img, index) => (
            <div
              key={index}
              className="group overflow-hidden w-[210px] h-[260px] bg-gray-200 cursor-pointer"
            >

              <img
                src={img}
                alt="community"
                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}















