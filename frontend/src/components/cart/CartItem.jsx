// import React, { useState } from "react";
// import {
//     FiMinus,
//     FiPlus,
//     FiHeart,
//     FiShare2,
//     FiShoppingBag,
//     FiTrash2,
//     FiChevronRight,
//     FiTag,
//     FiTruck,
//     FiShield,
//     FiGift,
// } from "react-icons/fi";
// import { AiFillStar } from "react-icons/ai";
// import { MdOutlineLocalOffer } from "react-icons/md";
// import { BsCheckCircleFill } from "react-icons/bs";
// import { useSelector, useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { addToCart, increaseQuantity, decreaseQuantity } from "../../redux/slices/cartSlice";

// // const cartItems = [
// //   { id: 1, name: "Royal Crystal Brooch", finish: "Silver Platinum", qty: 1, price: 2499, original: 3299, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Brooch+1" },
// //   { id: 2, name: "Emerald Leaf Brooch", finish: "18k Gold Plate", qty: 1, price: 1899, original: 2500, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Brooch+2" },
// //   { id: 3, name: "Celestial Pearl Pin", finish: "Rose Blush", qty: 2, price: 2100, original: 2800, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Pin+3" },
// //   { id: 4, name: "Art Deco Geometric", finish: "Silver Platinum", qty: 1, price: 1650, original: 2200, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Deco+4" },
// //   { id: 5, name: "Iridescent Monarch", finish: "18k Gold Plate", qty: 1, price: 2899, original: 3800, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Monarch+5" },
// //   { id: 6, name: "Vintage Sapphire Clip", finish: "Rose Blush", qty: 1, price: 3199, original: 4200, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Sapphire+6" },
// //   { id: 7, name: "Pearl Cascade Brooch", finish: "Silver Platinum", qty: 1, price: 1750, original: 2300, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Pearl+7" },
// //   { id: 8, name: "Lotus Crystal Pin", finish: "18k Gold Plate", qty: 3, price: 999, original: 1400, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Lotus+8" },
// //   { id: 9, name: "Antique Rose Brooch", finish: "Rose Blush", qty: 1, price: 2250, original: 3000, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Rose+9" },
// //   { id: 10, name: "Diamond Starburst Pin", finish: "Silver Platinum", qty: 1, price: 4199, original: 5500, img: "https://placehold.co/120x150/e8e0d5/8b6b08?text=Star+10" },
// // ];

// const suggested = [
//     { id: 1, name: "VELVET CRYSTAL CLIP", price: "₹1,599", img: "https://placehold.co/260x320/ebe7e3/8b6b08?text=Suggest+1" },
//     { id: 2, name: "MIDNIGHT PEARL BROOCH", price: "₹2,399", img: "https://placehold.co/260x320/ebe7e3/8b6b08?text=Suggest+2" },
//     { id: 3, name: "GOLDEN FEATHER PIN", price: "₹1,899", img: "https://placehold.co/260x320/ebe7e3/8b6b08?text=Suggest+3" },
//     { id: 4, name: "CRYSTAL FLEUR BROOCH", price: "₹3,199", img: "https://placehold.co/260x320/ebe7e3/8b6b08?text=Suggest+4" },
// ];
// const CartItem = () => {

//     const cartItems = useSelector(state => state.cart.cartItems);
//     //  console.log('item', cartItems)
//     const dispatch = useDispatch();


//     const [items, setItems] = useState(cartItems);
//     const [coupon, setCoupon] = useState("");
//     const [couponApplied, setCouponApplied] = useState(false);
//     const [wishlist, setWishlist] = useState([]);

//     const updateQty = (id, delta) => {
//         setItems(prev =>
//             prev.map(item =>
//                 item.id === id
//                     ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//                     : item
//             )
//         );

//     };
//     const handleAddToCart = (product) => {
//         // console.log('pro', product,);
//         dispatch(addToCart(product));
//     };

//     const removeItem = (id) => {
//         setItems(prev => prev.filter(item => item.id !== id));
//         toast.success("Item removed")
//     };

//     const toggleWishlist = (id) => {
//         setWishlist(prev =>
//             prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
//         );
//     };

//     const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
//     const originalTotal = items.reduce((s, i) => s + i.oldPrice * i.quantity, 0);
//     const savings = originalTotal - subtotal;
//     const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
//     const shipping = subtotal > 3000 ? 0 : 199;
//     const total = subtotal - couponDiscount + shipping;

//     const applyCoupon = () => {
//         if (coupon.trim().toUpperCase() === "MAISON10") setCouponApplied(true);
//     };
//     return (
//         <div className="min-h-screen bg-[#f6f4f2]" style={{ fontFamily: "Montserrat, sans-serif" }}>



//             <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-20 py-4">
//                 <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#5d5a57]" style={{ fontFamily: "Montserrat, sans-serif" }}>
//                     <span className="hover:text-black cursor-pointer">Home</span>
//                     <FiChevronRight size={14} className="text-[#b8b3ae]" />
//                     <span className="hover:text-black cursor-pointer">Collections</span>
//                     <FiChevronRight size={14} className="text-[#b8b3ae]" />
//                     <span className="font-semibold text-black">Your Bag</span>
//                 </div>
//             </div>

//             <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-20 py-6 lg:py-10">

//                 <div className="flex items-center gap-3 mb-6 lg:mb-10">
//                     <h2 className="text-3xl sm:text-4xl lg:text-[46px] text-[#111827] leading-none" style={{ fontFamily: "Cormorant Garamond, serif" }}>
//                         Shopping Bag
//                     </h2>
//                     <span className="bg-[#ebe4da] text-[#c6a35d] px-3 py-1 rounded-full text-[11px] sm:text-[12px]">
//                         {items.length} Items
//                     </span>
//                 </div>

//                 {items.length === 0 ? (
//                     <div className="text-center py-24">
//                         <FiShoppingBag size={60} className="mx-auto text-[#d8d3ce] mb-6" />
//                         <p className="text-2xl text-[#55514d]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Your bag is empty</p>
//                         <button className="mt-6 px-10 py-3 bg-[#111827] text-white text-sm uppercase tracking-[2px] hover:bg-[#8b6b08] transition-all duration-300">
//                             Continue Shopping
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 xl:gap-12">

//                         <div className="space-y-0">

//                             <div className="hidden md:grid grid-cols-[1fr_120px_140px_100px_40px] gap-4 pb-3 border-b border-[#d8d3ce] text-[10px] uppercase tracking-[2px] text-[#9ca3af]">
//                                 <span>Product</span>
//                                 <span className="text-center">Finish</span>
//                                 <span className="text-center">Quantity</span>
//                                 <span className="text-right">Total</span>
//                                 <span></span>
//                             </div>

//                             {items.map((item, index) => (
//                                 <div
//                                     key={item.id}
//                                     className="border-b border-[#e5dfd7] py-5 sm:py-6"
//                                     style={{ animationDelay: `${index * 50}ms` }}
//                                 >
//                                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">

//                                         <div className="relative flex-shrink-0 self-center sm:self-auto">
//                                             <img
//                                                 src={item.image}
//                                                 alt={item.name}
//                                                 className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 object-cover mx-auto sm:mx-0"
//                                             />
//                                         </div>

//                                         <div className="flex-1 min-w-0">
//                                             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
//                                                 <div className="flex-1">
//                                                     <h3 className="text-base sm:text-lg md:text-[20px] text-[#111827] leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
//                                                         {item.name}
//                                                     </h3>
//                                                     <p className="text-[11px] sm:text-[12px] text-[#8b6b08] uppercase tracking-[1px] mt-1">{item.finish}</p>
//                                                     <div className="flex items-center gap-2 sm:gap-3 mt-2">
//                                                         <span className="text-sm sm:text-[15px] text-[#111827]">{item.price}</span>
//                                                         <span className="line-through text-[#8f8b86] text-xs sm:text-[13px]">₹{item.oldPrice}</span>
//                                                         <span className="text-[#d94c3d] text-[10px] sm:text-[11px]">
//                                                             {Math.round((1 - item.price / item.oldPrice) * 100)}% OFF
//                                                         </span>
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex sm:hidden items-center justify-between mt-1">
//                                                     <div className="flex items-center border h-9">
//                                                         <button onClick={() => {
//                                                             dispatch(decreaseQuantity(item))
//                                                             updateQty(item.id, -1)
//                                                         }
//                                                         } className="w-9 h-9 flex items-center justify-center hover:bg-[#f4efe5] transition">
//                                                             <FiMinus size={14} />
//                                                         </button>
//                                                         <span className="w-8 text-center text-sm">{item.quantity}</span>
//                                                         <button onClick={() => {
//                                                             dispatch(increaseQuantity(item))
//                                                             updateQty(item.id, 1)
//                                                         }} className="w-9 h-9 flex items-center justify-center hover:bg-[#f4efe5] transition">
//                                                             <FiPlus size={14} />
//                                                         </button>
//                                                     </div>
//                                                     <div className="flex items-center gap-3">
//                                                         <span className="text-base font-medium text-[#111827]">₹{(item.price * item.quantity)}</span>
//                                                         <button onClick={() => toggleWishlist(item.id)} className="text-[#9ca3af] hover:text-[#8b6b08] transition">
//                                                             <FiHeart size={16} fill={wishlist.includes(item.id) ? "#8b6b08" : "none"} color={wishlist.includes(item.id) ? "#8b6b08" : undefined} />
//                                                         </button>
//                                                         <button onClick={() => removeItem(item.id)} className="text-[#9ca3af] hover:text-[#d94c3d] transition">
//                                                             <FiTrash2 size={16} />
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="hidden sm:flex items-center justify-between mt-3">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="flex items-center border border-[#d8d3ce] h-9 md:h-10">
//                                                         <button onClick={() => {
//                                                             dispatch(decreaseQuantity(item))
//                                                             updateQty(item.id, -1)
//                                                         }
//                                                         } className="w-9 h-9 md:h-10 flex items-center justify-center hover:bg-[#f4efe5] transition">
//                                                             <FiMinus size={14} />
//                                                         </button>
//                                                         <span className="w-8 text-center text-sm">{item.quantity}</span>
//                                                         <button onClick={() => {
//                                                             dispatch(increaseQuantity(item))
//                                                             updateQty(item.id, 1)
//                                                         }
//                                                         } className="w-9 h-9 md:h-10 flex items-center justify-center hover:bg-[#f4efe5] transition">
//                                                             <FiPlus size={14} />
//                                                         </button>
//                                                     </div>
//                                                     <button onClick={() => toggleWishlist(item.id)} className="flex items-center gap-1 text-[11px] text-[#55514d] hover:text-[#8b6b08] transition uppercase tracking-[1px]">
//                                                         <FiHeart size={14} fill={wishlist.includes(item.id) ? "#8b6b08" : "none"} color={wishlist.includes(item.id) ? "#8b6b08" : undefined} />
//                                                         <span className="hidden md:inline">{wishlist.includes(item.id) ? "Saved" : "Wishlist"}</span>
//                                                     </button>
//                                                 </div>
//                                                 <div className="flex items-center gap-4">
//                                                     <span className="text-base md:text-[18px] text-[#111827]">₹{((item.price) * item.quantity)}</span>
//                                                     <button onClick={() => removeItem(item.id)} className="text-[#9ca3af] hover:text-[#d94c3d] transition">
//                                                         <FiTrash2 size={16} />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                                 <div className="flex items-center gap-2 text-[#55514d] text-sm">
//                                     <BsCheckCircleFill size={16} className="text-[#4d8d5c]" />
//                                     <span>You save ₹{savings.toLocaleString()} on this order!</span>
//                                 </div>
//                                 <button className="text-[11px] uppercase tracking-[2px] text-[#8b6b08] border border-[#8b6b08] px-5 py-2 hover:bg-[#8b6b08] hover:text-white transition-all duration-300">
//                                     Continue Shopping
//                                 </button>
//                             </div>

//                             <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                                 {[
//                                     { icon: <FiTruck size={20} className="text-[#8b6b08]" />, title: "Free Delivery", desc: "On orders above ₹3,000" },
//                                     { icon: <FiShield size={20} className="text-[#8b6b08]" />, title: "Secure Payment", desc: "SSL encrypted checkout" },
//                                     { icon: <FiGift size={20} className="text-[#8b6b08]" />, title: "Gift Packaging", desc: "Signature Maison box" },
//                                 ].map((f, i) => (
//                                     <div key={i} className="flex items-center gap-3 bg-white border border-[#e5dfd8] px-4 py-4">
//                                         {f.icon}
//                                         <div>
//                                             <p className="text-[12px] font-semibold text-[#111827] uppercase tracking-[1px]">{f.title}</p>
//                                             <p className="text-[11px] text-[#7b746d]">{f.desc}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="xl:sticky xl:top-24 h-fit space-y-4">

//                             <div className="bg-white border border-[#ddd6cf] p-6 sm:p-8">
//                                 <h2 className="text-2xl sm:text-[30px] text-[#111827] mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
//                                     Order Summary
//                                 </h2>

//                                 <div className="space-y-4 pb-5 border-b border-[#e5dfd7]">
//                                     {items.slice(0, 3).map(item => (
//                                         <div key={item.id} className="flex items-center gap-3">
//                                             <img src={item.image} alt={item.name} className="w-10 h-12 object-cover flex-shrink-0" />
//                                             <div className="flex-1 min-w-0">
//                                                 <p className="text-[12px] text-[#111827] truncate">{item.name}</p>
//                                                 <p className="text-[11px] text-[#8b6b08]">QTY: {String(item.quantity).padStart(2, "0")}</p>
//                                             </div>
//                                             <span className="text-[13px] text-[#111827] flex-shrink-0">₹{(item.price * item.quantity)}</span>
//                                         </div>
//                                     ))}
//                                     {items.length > 3 && (
//                                         <p className="text-[11px] text-[#8b6b08] uppercase tracking-[1px]">+{items.length - 3} more items</p>
//                                     )}
//                                 </div>

//                                 <div className="py-5 border-b border-[#e5dfd7]">
//                                     <p className="text-[10px] uppercase tracking-[2px] text-[#9ca3af] mb-3">Apply Coupon</p>
//                                     <div className="flex gap-2">
//                                         <input
//                                             type="text"
//                                             value={coupon}
//                                             onChange={e => setCoupon(e.target.value)}
//                                             placeholder="Enter code"
//                                             disabled={couponApplied}
//                                             className="flex-1 border-b border-[#d9d4cf] bg-transparent pb-1 outline-none text-[13px] text-[#111827] focus:border-[#8b6b08] transition placeholder:text-[#b8b3ae] disabled:opacity-50"
//                                         />
//                                         <button
//                                             onClick={applyCoupon}
//                                             disabled={couponApplied}
//                                             className="text-[11px] uppercase tracking-[1px] text-[#8b6b08] border border-[#8b6b08] px-3 py-1 hover:bg-[#8b6b08] hover:text-white transition-all duration-300 disabled:opacity-50"
//                                         >
//                                             {couponApplied ? "Applied" : "Apply"}
//                                         </button>
//                                     </div>
//                                     {couponApplied && (
//                                         <p className="text-[11px] text-[#4d8d5c] mt-2 flex items-center gap-1">
//                                             <BsCheckCircleFill size={12} /> MAISON10 applied — 10% off!
//                                         </p>
//                                     )}
//                                     {!couponApplied && (
//                                         <p className="text-[10px] text-[#9ca3af] mt-2 flex items-center gap-1">
//                                             <MdOutlineLocalOffer size={12} /> Try: <span className="text-[#8b6b08]">MAISON10</span>
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-3 py-5 border-b border-[#e5dfd7]">
//                                     {[
//                                         { label: "Subtotal", value: `₹${subtotal.toLocaleString()}`, color: "#6b7280" },
//                                         { label: "You Save", value: `-₹${savings.toLocaleString()}`, color: "#d94c3d" },
//                                         ...(couponApplied ? [{ label: "Coupon (MAISON10)", value: `-₹${couponDiscount.toLocaleString()}`, color: "#d94c3d" }] : []),
//                                         { label: "Shipping", value: shipping === 0 ? "FREE" : `₹${shipping}`, color: shipping === 0 ? "#4d8d5c" : "#6b7280" },
//                                     ].map(({ label, value, color }) => (
//                                         <div key={label} className="flex justify-between">
//                                             <span className="text-[13px]" style={{ color, fontFamily: "Montserrat, sans-serif" }}>{label}</span>
//                                             <span className="text-[13px]" style={{ color, fontFamily: "Montserrat, sans-serif" }}>{value}</span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 <div className="flex justify-between items-center py-5">
//                                     <span className="text-2xl sm:text-[28px] text-[#111827]" style={{ fontFamily: "Cormorant Garamond, serif" }}>Total</span>
//                                     <span className="text-2xl sm:text-[28px] text-[#8b6b08]" style={{ fontFamily: "Cormorant Garamond, serif" }}>₹{total.toLocaleString()}</span>
//                                 </div>

//                                 <button className="w-full h-[52px] sm:h-[60px] bg-[#111827] text-white uppercase tracking-[2px] text-[12px] sm:text-[13px] hover:bg-[#8b6b08] transition-all duration-300">
//                                     Proceed to Checkout →
//                                 </button>

//                                 <div className="mt-4 text-center">
//                                     <span className="text-[10px] uppercase tracking-[2px] text-[#9ca3af]">Secure SSL Encrypted Checkout</span>
//                                 </div>
//                             </div>

//                             <div className="bg-[#ebe4da] border border-[#ddd6cf] px-6 py-4">
//                                 <div className="flex items-center gap-3">
//                                     <FiTag size={16} className="text-[#8b6b08] flex-shrink-0" />
//                                     <div>
//                                         <p className="text-[12px] font-semibold text-[#111827] uppercase tracking-[1px]">Free Shipping Unlocked!</p>
//                                         <p className="text-[11px] text-[#7b746d] mt-0.5">
//                                             {subtotal >= 3000 ? "Enjoy free delivery on this order." : `Add ₹${(3000 - subtotal).toLocaleString()} more for free delivery.`}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 {subtotal < 3000 && (
//                                     <div className="mt-3 w-full h-1.5 bg-[#d8cfc5] rounded-full overflow-hidden">
//                                         <div className="h-full bg-[#8b6b08] rounded-full transition-all duration-500" style={{ width: `${Math.min((subtotal / 3000) * 100, 100)}%` }} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <section className="w-full bg-[#f6f4f2] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 mt-6">
//                 <h2 className="text-center uppercase text-2xl sm:text-[30px] lg:text-[34px] tracking-[1.5px] text-[#0f172a] mb-8 sm:mb-12" style={{ fontFamily: "Cormorant Garamond, serif" }}>
//                     You May Also Love
//                 </h2>
//                 <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//                     {suggested.map(product => (
//                         <div key={product.id} className="group cursor-pointer">
//                             <div className="overflow-hidden bg-[#ebe7e3]">
//                                 <img
//                                     src={product.img}
//                                     alt={product.name}
//                                     className="w-full h-40 sm:h-56 md:h-64 lg:h-[280px] object-cover transition-all duration-700 group-hover:scale-110"
//                                 />
//                             </div>
//                             <div className="pt-4">
//                                 <h4 className="text-[11px] sm:text-[13px] uppercase text-[#1e293b] tracking-[-0.3px] mb-2 leading-tight" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}>
//                                     {product.name}
//                                 </h4>
//                                 <p className="text-sm sm:text-[16px] text-[#334155]" style={{ fontFamily: "Montserrat, sans-serif" }}>
//                                     {product.price}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default CartItem