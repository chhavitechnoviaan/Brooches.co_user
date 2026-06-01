// import React, { useState, useMemo, useEffect } from "react";
// import {
//   FiShoppingBag, FiTruck, FiCheckCircle, FiXCircle, FiRotateCcw,
//   FiDollarSign, FiAlertCircle, FiRefreshCw, FiPackage, FiAlertTriangle,
//   FiUser, FiStar, FiShield, FiUsers, FiTag, FiGift, FiSearch,
//   FiBell, FiFilter, FiTrash2, FiCheck, FiChevronRight, FiX,
//   FiMail, FiLock, FiActivity, FiBarChart2, FiGlobe, FiClock,
// } from "react-icons/fi";
// import { BsGem } from "react-icons/bs";
// import { MdOutlineLocalOffer, MdOutlineInventory2 } from "react-icons/md";
// import {
//   getNotificationsAPI,
//   markReadAPI,
//   deleteNotificationAPI,
//   markAllReadAPI,
//   clearNotificationsAPI,
// } from "../../services/notificationApi";
// import { formatDistanceToNow } from "date-fns";

// const categories = [
//   "All", "Orders", "Deliveries", "Payments", "Customers",
//   "Inventory", "Returns & Refunds", "Coupons & Offers",
//   "Security", "Staff", "SEO",
// ];



// const priorityStyle = {
//   high: "bg-[#fee2e2] text-[#dc2626]",
//   normal: "bg-[#f0ebe1] text-[#8b6b08]",
// };

// const categoryIcon = {
//   Orders: <FiShoppingBag size={13} />,
//   Deliveries: <FiTruck size={13} />,
//   Payments: <FiDollarSign size={13} />,
//   Customers: <FiUser size={13} />,
//   Inventory: <MdOutlineInventory2 size={13} />,
//   "Returns & Refunds": <FiRotateCcw size={13} />,
//   "Coupons & Offers": <FiTag size={13} />,
//   Security: <FiShield size={13} />,
//   Staff: <FiUsers size={13} />,
//   SEO: <FiGlobe size={13} />,
// };

// export default function Notifications() {
//   const [notifications, setNotifications] =
//     useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [showUnreadOnly, setShowUnreadOnly] = useState(false);
//   const [selected, setSelected] = useState(null);
//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications =
//     async () => {

//       try {

//         const data =
//           await getNotificationsAPI();

//         setNotifications(
//           data.notifications
//         );

//       } catch (error) {

//         console.log(error);
//       }
//     };
//   const filtered = useMemo(() => {
//     return notifications.filter((n) => {
//       const matchCat = activeCategory === "All" || n.category === activeCategory;
//       const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase());
//       const matchUnread = showUnreadOnly ? !n.read : true;
//       return matchCat && matchSearch && matchUnread;
//     });
//   }, [notifications, activeCategory, search, showUnreadOnly]);

//   const deleteNotif =
//     async (id) => {

//       await deleteNotificationAPI(id);

//       fetchNotifications();
//     };
//   const markRead =
//     async (id) => {

//       await markReadAPI(id);

//       fetchNotifications();
//     };

//   const markAllRead =
//     async () => {

//       await markAllReadAPI();

//       fetchNotifications();
//     };

//   const clearAll =
//     async () => {

//       await clearNotificationsAPI();

//       fetchNotifications();
//     };
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   formatDistanceToNow(
//     new Date(selected.createdAt),
//     { addSuffix: true }
//   )

//   const handleClick = (n) => {
//     markRead(n.id);
//     setSelected(n);
//   };

//   const catCount = (cat) => cat === "All"
//     ? notifications.filter(n => !n.read).length
//     : notifications.filter(n => n.category === cat && !n.read).length;

//   return (
//     <div className="min-h-screen bg-[#f8f6f3]" style={{ fontFamily: "Montserrat, sans-serif" }}>

//       <div className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-10 py-4 sticky top-0 z-20">
//         <div className="max-w-[1300px] mx-auto flex items-center gap-3">

//           <div className="flex-1 flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2.5 rounded-xl">
//             <FiSearch className="text-[#9a9388] text-xs sm:text-sm flex-shrink-0" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search notifications..."
//               className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-sm text-black placeholder:text-[#9a9388]"
//             />
//             {search && <button onClick={() => setSearch("")}><FiX size={13} className="text-[#9a9388]" /></button>}
//           </div>
//           <button
//             onClick={() => setShowUnreadOnly(!showUnreadOnly)}
//             className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] border transition flex-shrink-0 ${showUnreadOnly ? "bg-[#8b6b08] text-white border-[#8b6b08]" : "bg-[#fbf9f7] text-black border-[#e0d9d0] hover:border-[#8b6b08]"}`}
//           >
//             <FiFilter size={13} />
//             <span className="hidden sm:inline text-xs  sm:text-sm">Unread</span>
//           </button>
//         </div>
//       </div>

//       <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-6">

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//           <div>
//             <div className="flex items-center gap-3">
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl text-black leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
//                 Notifications
//               </h1>
//               {unreadCount > 0 && (
//                 <span className="bg-[#8b6b08] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
//                   {unreadCount} New
//                 </span>
//               )}
//             </div>
//             <p className="text-xs sm:text-sm text-[#9a9388] mt-1">Stay updated on all critical admin activities.</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={markAllRead}
//               className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e0d9d0] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition"
//             >
//               <FiCheck size={13} />
//               <span className="hidden sm:inline">Mark All Read</span>
//             </button>
//             <button
//               onClick={clearAll}
//               className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition"
//             >
//               <FiTrash2 size={13} />
//               <span className="hidden sm:inline">Clear</span>
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto mb-5">
//           <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
//             {categories.map((cat) => {
//               const count = catCount(cat);
//               return (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[1px] transition whitespace-nowrap border ${activeCategory === cat
//                     ? "bg-[#8b6b08] text-white border-[#8b6b08]"
//                     : "bg-[#fbf9f7] text-[#4a4540] border-[#e0d9d0] hover:border-[#8b6b08] hover:text-[#8b6b08]"
//                     }`}
//                 >
//                   {cat !== "All" && <span>{categoryIcon[cat]}</span>}
//                   {cat}
//                   {count > 0 && (
//                     <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-white/30 text-white" : "bg-[#8b6b08] text-white"}`}>
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">

//           <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden">
//             <div className="px-5 py-3 border-b border-[#e5dfd7] flex items-center justify-between">
//               <p className="text-sm sm:text-base text-[#9a9388]">
//                 <span className="text-[#8b6b08] font-semibold">{filtered.length}</span> notifications
//               </p>
//               <div className="flex items-center gap-1.5">
//                 <FiClock size={11} className="text-[#9a9388]" />
//                 <span className="text-[10px] text-[#9a9388]">Latest first</span>
//               </div>
//             </div>

//             {filtered.length === 0 ? (
//               <div className="text-center py-16">
//                 <FiBell size={36} className="mx-auto mb-3 text-[#d0c9c0]" />
//                 <p className="text-sm sm:text-lg text-[#9a9388]">No notifications found</p>
//               </div>
//             ) : (
//               <div className="divide-y divide-[#f0ebe1]">
//                 {filtered.map((n) => (
//                   <div
//                     key={n.id}
//                     onClick={() => handleClick(n)}
//                     className={`flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-4 cursor-pointer hover:bg-[#f8f3ea] transition group ${selected?.id === n.id ? "bg-[#f8f3ea]" : !n.read ? "bg-[#fffdf8]" : ""}`}
//                   >
//                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${n.read ? "bg-[#f0ebe1] text-[#8b6b08]" : "bg-[#8b6b08] text-white"}`}>
//                       {n.icon}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-2">
//                         <p className={`text-sm sm:text-lg leading-tight ${n.read ? "text-[#4a4540]" : "text-black font-semibold"}`}>
//                           {n.title}
//                         </p>
//                         <div className="flex items-center gap-1.5 flex-shrink-0">
//                           {!n.read && <span className="w-2 h-2 bg-[#8b6b08] rounded-full" />}
//                           <span className={`text-sm px-2 py-0.5 rounded-full font-semibold ${priorityStyle[n.priority]}`}>
//                             {n.priority}
//                           </span>
//                         </div>
//                       </div>
//                       <p className="text-sm sm:text-sm    text-[#9a9388] mt-1 leading-[1.5] line-clamp-2">{n.message}</p>
//                       <div className="flex items-center justify-between mt-2">
//                         <div className="flex items-center gap-1.5">
//                           <span className="text-xs  uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-0.5 rounded-full">
//                             {n.category}
//                           </span>
//                           <span className="text-xs sm:text-sm text-[#b0a898]">{selected?.createdAt
//                             ? formatDistanceToNow(
//                               new Date(selected.createdAt),
//                               { addSuffix: true }
//                             )
//                             : "No Time"}</span>
//                         </div>
//                         <button
//                           onClick={(e) => { e.stopPropagation(); deleteNotif(n.id); }}
//                           className="opacity-0 group-hover:opacity-100 text-[#9a9388] hover:text-[#dc2626] transition"
//                         >
//                           <FiTrash2 className="text-xs sm:text-lg" />
//                         </button>
//                       </div>
//                     </div>
//                     <FiChevronRight className="text-[#d0c9c0] text-xs sm:text-lg  mt-1 flex-shrink-0 hidden sm:block" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="hidden lg:block">
//             {selected ? (
//               <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden sticky top-24">
//                 <div className="px-5 py-4 border-b border-[#e5dfd7] flex items-center justify-between">
//                   <p className="text-[11px] text-[#8b6b08] uppercase tracking-[1.5px] font-semibold">Notification Detail</p>
//                   <button onClick={() => setSelected(null)} className="w-7 h-7 bg-[#f0ebe1] rounded-full flex items-center justify-center hover:bg-[#e5dfd7] transition">
//                     <FiX size={12} className="text-black" />
//                   </button>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#8b6b08] flex items-center justify-center text-white flex-shrink-0">
//                       {selected.icon}
//                     </div>
//                     <div>
//                       <p className="text-[14px] font-semibold text-black leading-tight">{selected.title}</p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-[9px] uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-0.5 rounded-full">{selected.category}</span>
//                         <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${priorityStyle[selected.priority]}`}>{selected.priority}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-[13px] text-[#4a4540] leading-[1.6]">{selected.message}</p>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
//                       <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Time</p>
//                       <p className="text-[12px] font-semibold text-black"> {selected?.createdAt
//   ? formatDistanceToNow(
//       new Date(selected.createdAt),
//       { addSuffix: true }
//     )
//   : "No Time"
//                       }
//                       </p>
//                     </div>
//                     <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
//                       <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Status</p>
//                       <p className="text-[12px] font-semibold text-black">{selected.read ? "Read" : "Unread"}</p>
//                     </div>
//                   </div>
//                   <div className="space-y-2 pt-2">
//                     <button className="w-full h-[42px] bg-[#8b6b08] text-white text-[11px] uppercase tracking-[2px] rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2">
//                       <FiChevronRight size={13} />
//                       Take Action
//                     </button>
//                     <button
//                       onClick={() => deleteNotif(selected.id)}
//                       className="w-full h-[38px] border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition flex items-center justify-center gap-2"
//                     >
//                       <FiTrash2 size={13} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-8 text-center">
//                 <div className="w-14 h-14 bg-[#f0ebe1] rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FiBell size={24} className="text-[#8b6b08]" />
//                 </div>
//                 <p className="text-xs sm:text-base lg:text-lg xl:text-2xl font-semibold text-black mb-1" style={{ fontFamily: "Cormorant Garamond, serif" }}>Select a Notification</p>
//                 <p className="text-sm sm:text-base  text-[#9a9388]">Click any notification to view its full details here.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {selected && (
//         <div className="fixed inset-0 z-50 flex items-end lg:hidden" onClick={() => setSelected(null)}>
//           <div className="absolute inset-0 bg-black/30" />
//           <div
//             className="relative bg-[#fbf9f7] w-full rounded-t-2xl border-t border-[#e5dfd7] shadow-2xl max-h-[85vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="px-5 py-4 border-b border-[#e5dfd7] flex items-center justify-between">
//               <p className="text-[11px] text-[#8b6b08] uppercase tracking-[1.5px] font-semibold">Notification Detail</p>
//               <button onClick={() => setSelected(null)} className="w-7 h-7 bg-[#f0ebe1] rounded-full flex items-center justify-center">
//                 <FiX size={12} className="text-black" />
//               </button>
//             </div>
//             <div className="p-5 space-y-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 rounded-xl bg-[#8b6b08] flex items-center justify-center text-white flex-shrink-0">
//                   {selected.icon}
//                 </div>
//                 <div>
//                   <p className="text-[14px] font-semibold text-black leading-tight">{selected.title}</p>
//                   <div className="flex items-center gap-2 mt-1 flex-wrap">
//                     <span className="text-[9px] uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-0.5 rounded-full">{selected.category}</span>
//                     <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${priorityStyle[selected.priority]}`}>{selected.priority}</span>
//                   </div>
//                 </div>
//               </div>
//               <p className="text-[13px] text-[#4a4540] leading-[1.6]">{selected.message}</p>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
//                   <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Time</p>
//                   <p className="text-[12px] font-semibold text-black">{new Date(selected.createdAt).toLocaleString()}</p>
//                 </div>
//                 <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
//                   <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Status</p>
//                   <p className="text-[12px] font-semibold text-black">{selected.read ? "Read" : "Unread"}</p>
//                 </div>
//               </div>
//               <div className="space-y-2 pb-2">
//                 <button className="w-full h-[44px] bg-[#8b6b08] text-white text-[11px] uppercase tracking-[2px] rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2">
//                   <FiChevronRight size={13} />
//                   Take Action
//                 </button>
//                 <button
//                   onClick={() => deleteNotif(selected.id)}
//                   className="w-full h-[40px] border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition flex items-center justify-center gap-2"
//                 >
//                   <FiTrash2 size={13} />
//                   Delete Notification
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  FiShoppingBag,
  FiTruck,
  FiDollarSign,
  FiRotateCcw,
  FiUser,
  FiShield,
  FiUsers,
  FiTag,
  FiSearch,
  FiBell,
  FiFilter,
  FiTrash2,
  FiCheck,
  FiChevronRight,
  FiX,
  FiGlobe,
  FiClock,
  FiMessageSquare,
  FiExternalLink,
} from "react-icons/fi";

import { MdOutlineInventory2 } from "react-icons/md";

import {
  getNotificationsAPI,
  markReadAPI,
  deleteNotificationAPI,
  markAllReadAPI,
  clearNotificationsAPI,
} from "../../services/notificationApi";

import { formatDistanceToNow } from "date-fns";

import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Orders",
  "Deliveries",
  "Payments",
  "Customers",
  "Inventory",
  "Returns & Refunds",
  "Coupons & Offers",
  "Security",
  "Staff",
  "SEO",
  "Customer Queries",
];

const priorityStyle = {
  high: "bg-[#fee2e2] text-[#dc2626]",
  normal: "bg-[#f0ebe1] text-[#8b6b08]",
};

const categoryIcon = {
  Orders: <FiShoppingBag size={13} />,
  Deliveries: <FiTruck size={13} />,
  Payments: <FiDollarSign size={13} />,
  Customers: <FiUser size={13} />,
  Inventory: <MdOutlineInventory2 size={13} />,
  "Returns & Refunds": (
    <FiRotateCcw size={13} />
  ),
  "Coupons & Offers": (
    <FiTag size={13} />
  ),
  Security: <FiShield size={13} />,
  Staff: <FiUsers size={13} />,
  SEO: <FiGlobe size={13} />,
  "Customer Queries": (
    <FiMessageSquare size={13} />
  ),
};

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [showUnreadOnly, setShowUnreadOnly] =
    useState(false);

  const [selected, setSelected] =
    useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data =
        await getNotificationsAPI();

      setNotifications(
        data.notifications || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const matchCat =
        activeCategory === "All" ||
        n.category === activeCategory;

      const matchSearch =
        n.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        n.message
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchUnread =
        showUnreadOnly ? !n.read : true;

      return (
        matchCat &&
        matchSearch &&
        matchUnread
      );
    });
  }, [
    notifications,
    activeCategory,
    search,
    showUnreadOnly,
  ]);

  const deleteNotif = async (id) => {
    try {
      await deleteNotificationAPI(id);

      if (selected?._id === id) {
        setSelected(null);
      }

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const markRead = async (id) => {
    try {
      await markReadAPI(id);

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const markAllRead = async () => {
    try {
      await markAllReadAPI();

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const clearAll = async () => {
    try {
      await clearNotificationsAPI();

      setSelected(null);

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  const handleClick = async (n) => {
    try {
      await markRead(n._id);

      setSelected({
        ...n,
        read: true,
      });

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const catCount = (cat) =>
    cat === "All"
      ? notifications.filter((n) => !n.read)
        .length
      : notifications.filter(
        (n) =>
          n.category === cat &&
          !n.read
      ).length;

  return (
    <div
      className="min-h-screen bg-[#f8f6f3]"
      style={{
        fontFamily:
          "Montserrat, sans-serif",
      }}
    >
      {/* TOP BAR */}

      <div className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-10 py-4 sticky top-0 z-20">
        <div className="max-w-[1300px] mx-auto flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2.5 rounded-xl">
            <FiSearch className="text-[#9a9388] text-xs sm:text-sm flex-shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search notifications..."
              className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-sm text-black placeholder:text-[#9a9388]"
            />

            {search && (
              <button
                onClick={() =>
                  setSearch("")
                }
              >
                <FiX
                  size={13}
                  className="text-[#9a9388]"
                />
              </button>
            )}
          </div>

          <button
            onClick={() =>
              setShowUnreadOnly(
                !showUnreadOnly
              )
            }
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] border transition flex-shrink-0 ${showUnreadOnly
              ? "bg-[#8b6b08] text-white border-[#8b6b08]"
              : "bg-[#fbf9f7] text-black border-[#e0d9d0] hover:border-[#8b6b08]"
              }`}
          >
            <FiFilter size={13} />

            <span className="hidden sm:inline text-xs sm:text-sm">
              Unread
            </span>
          </button>
        </div>
      </div>

      {/* MAIN */}

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl text-black leading-tight"
                style={{
                  fontFamily:
                    "Cormorant Garamond, serif",
                }}
              >
                Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="bg-[#8b6b08] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#9a9388] mt-1">
              Stay updated on all critical
              admin activities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e0d9d0] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition"
            >
              <FiCheck size={13} />

              <span className="hidden sm:inline">
                Mark All Read
              </span>
            </button>

            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition"
            >
              <FiTrash2 size={13} />

              <span className="hidden sm:inline">
                Clear
              </span>
            </button>
          </div>
        </div>

        {/* CATEGORY FILTER */}

        <div className="overflow-x-auto mb-5">
          <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
            {categories.map((cat) => {
              const count = catCount(cat);

              return (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory(cat)
                  }
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[1px] transition whitespace-nowrap border ${activeCategory === cat
                    ? "bg-[#8b6b08] text-white border-[#8b6b08]"
                    : "bg-[#fbf9f7] text-[#4a4540] border-[#e0d9d0] hover:border-[#8b6b08] hover:text-[#8b6b08]"
                    }`}
                >
                  {cat !== "All" && (
                    <span>
                      {categoryIcon[cat]}
                    </span>
                  )}

                  {cat}

                  {count > 0 && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat
                        ? "bg-white/30 text-white"
                        : "bg-[#8b6b08] text-white"
                        }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
          {/* LEFT */}

          <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#e5dfd7] flex items-center justify-between">
              <p className="text-sm sm:text-base text-[#9a9388]">
                <span className="text-[#8b6b08] font-semibold">
                  {filtered.length}
                </span>{" "}
                notifications
              </p>

              <div className="flex items-center gap-1.5">
                <FiClock
                  size={11}
                  className="text-[#9a9388]"
                />

                <span className="text-[10px] text-[#9a9388]">
                  Latest first
                </span>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <FiBell
                  size={36}
                  className="mx-auto mb-3 text-[#d0c9c0]"
                />

                <p className="text-sm sm:text-lg text-[#9a9388]">
                  No notifications found
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#f0ebe1]">
                {filtered.map((n) => (
                  <div
                    key={n._id}
                    onClick={() =>
                      handleClick(n)
                    }
                    className={`flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-4 cursor-pointer hover:bg-[#f8f3ea] transition group ${selected?._id === n._id
                      ? "bg-[#f8f3ea]"
                      : !n.read
                        ? "bg-[#fffdf8]"
                        : ""
                      }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${n.read
                        ? "bg-[#f0ebe1] text-[#8b6b08]"
                        : "bg-[#8b6b08] text-white"
                        }`}
                    >
                      {categoryIcon[
                        n.category
                      ] || (
                          <FiBell size={13} />
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm sm:text-lg leading-tight ${n.read
                            ? "text-[#4a4540]"
                            : "text-black font-semibold"
                            }`}
                        >
                          {n.title}
                        </p>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {n.category ===
                            "Customer Queries" && (
                              <span className="bg-[#8b6b08] text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-[1px]">
                                Query
                              </span>
                            )}

                          {!n.read && (
                            <span className="w-2 h-2 bg-[#8b6b08] rounded-full" />
                          )}

                          <span
                            className={`text-sm px-2 py-0.5 rounded-full font-semibold ${priorityStyle[
                              n.priority
                            ]
                              }`}
                          >
                            {n.priority}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#9a9388] mt-1 leading-[1.5] line-clamp-2">
                        {n.message}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-0.5 rounded-full">
                            {n.category}
                          </span>

                          <span className="text-xs sm:text-sm text-[#b0a898]">
                            {n.createdAt
                              ? formatDistanceToNow(
                                new Date(
                                  n.createdAt
                                ),
                                {
                                  addSuffix: true,
                                }
                              )
                              : "No Time"}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            deleteNotif(
                              n._id
                            );
                          }}
                          className="opacity-0 group-hover:opacity-100 text-[#9a9388] hover:text-[#dc2626] transition"
                        >
                          <FiTrash2 className="text-xs sm:text-lg" />
                        </button>
                      </div>
                    </div>

                    <FiChevronRight className="text-[#d0c9c0] text-xs sm:text-lg mt-1 flex-shrink-0 hidden sm:block" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          {/* 
          <div className="hidden lg:block">
            {selected ? (
              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden sticky top-24">
                <div className="px-5 py-4 border-b border-[#e5dfd7] flex items-center justify-between">
                  <p className="text-[11px] text-[#8b6b08] uppercase tracking-[1.5px] font-semibold">
                    Notification Detail
                  </p>

                  <button
                    onClick={() =>
                      setSelected(null)
                    }
                    className="w-7 h-7 bg-[#f0ebe1] rounded-full flex items-center justify-center hover:bg-[#e5dfd7] transition"
                  >
                    <FiX
                      size={12}
                      className="text-black"
                    />
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8b6b08] flex items-center justify-center text-white flex-shrink-0">
                      {categoryIcon[
                        selected.category
                      ] || (
                        <FiBell size={13} />
                      )}
                    </div>

                    <div>
                      <p className="text-[14px] font-semibold text-black leading-tight">
                        {selected.title}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-0.5 rounded-full">
                          {selected.category}
                        </span>

                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                            priorityStyle[
                              selected.priority
                            ]
                          }`}
                        >
                          {selected.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#4a4540] leading-[1.6]">
                    {selected.message}
                  </p>

                  {selected.category ===
                    "Customer Queries" && (
                    <div className="bg-[#f8f3ea] border border-[#e5dfd7] rounded-2xl p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-black">
                          Customer Query
                        </h3>

                        <span className="bg-[#8b6b08] text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-[1px]">
                          New Query
                        </span>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                          Customer Name
                        </p>

                        <p className="text-sm font-medium text-black">
                          {selected.customerName ||
                            "Customer"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                          Email
                        </p>

                        <p className="text-sm text-black break-all">
                          {selected.customerEmail ||
                            "No Email"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                          Query Message
                        </p>

                        <div className="bg-white border border-[#e5dfd7] rounded-xl p-3">
                          <p className="text-sm text-[#4a4540] leading-[1.7]">
                            {selected.queryText ||
                              selected.message}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/customer-queries/${selected._id}`
                          )
                        }
                        className="w-full h-[44px] bg-[#8b6b08] text-white text-[11px] uppercase tracking-[2px] rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2"
                      >
                        <FiExternalLink size={14} />
                        Open Query
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                      <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">
                        Time
                      </p>

                      <p className="text-[12px] font-semibold text-black">
                        {selected.createdAt
                          ? formatDistanceToNow(
                              new Date(
                                selected.createdAt
                              ),
                              {
                                addSuffix: true,
                              }
                            )
                          : "No Time"}
                      </p>
                    </div>

                    <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                      <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">
                        Status
                      </p>

                      <p className="text-[12px] font-semibold text-black">
                        {selected.read
                          ? "Read"
                          : "Unread"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button className="w-full h-[42px] bg-[#8b6b08] text-white text-[11px] uppercase tracking-[2px] rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2">
                      <FiChevronRight size={13} />
                      Take Action
                    </button>

                    <button
                      onClick={() =>
                        deleteNotif(
                          selected._id
                        )
                      }
                      className="w-full h-[38px] border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition flex items-center justify-center gap-2"
                    >
                      <FiTrash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-[#f0ebe1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBell
                    size={24}
                    className="text-[#8b6b08]"
                  />
                </div>

                <p
                  className="text-xs sm:text-base lg:text-lg xl:text-2xl font-semibold text-black mb-1"
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                  }}
                >
                  Select a Notification
                </p>

                <p className="text-sm sm:text-base text-[#9a9388]">
                  Click any notification to
                  view its full details here.
                </p>
              </div>
            )}
          </div> */}

          {/* RIGHT */}

          <div className="hidden lg:block">
            {selected ? (
              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden sticky top-24">
                <div className="px-5 py-4 border-b border-[#e5dfd7] flex items-center justify-between">
                  <p className="text-[11px] text-[#8b6b08] uppercase tracking-[1.5px] font-semibold">
                    Notification Detail
                  </p>

                  <button
                    onClick={() => setSelected(null)}
                    className="w-7 h-7 bg-[#f0ebe1] rounded-full flex items-center justify-center hover:bg-[#e5dfd7] transition"
                  >
                    <FiX
                      size={12}
                      className="text-black"
                    />
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* TOP */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8b6b08] flex items-center justify-center text-white flex-shrink-0">
                      {categoryIcon[selected.category] || (
                        <FiBell size={13} />
                      )}
                    </div>

                    <div>
                      <p className="text-[22px] font-semibold text-black leading-tight">
                        {selected.title}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-1 rounded-full">
                          {selected.category}
                        </span>

                        <span
                          className={`text-[10px] px-2 py-1 rounded-full font-semibold ${priorityStyle[selected.priority]
                            }`}
                        >
                          {selected.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <p className="text-[16px] text-[#4a4540] leading-[1.7]">
                    {selected.message}
                  </p>

                  {/* CUSTOMER QUERY CARD */}
                  {selected.category ===
                    "Customer Queries" && (
                      <div className="bg-[#f8f3ea] border border-[#e5dfd7] rounded-2xl p-5 space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[20px] font-semibold text-black">
                            Customer Query
                          </h3>

                          <span className="bg-[#8b6b08] text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-[1px]">
                            New Query
                          </span>
                        </div>

                        {/* CUSTOMER NAME */}
                        <div>
                          <p className="text-[11px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                            Customer Name
                          </p>

                          <p className="text-[18px] font-medium text-black">
                            {selected.customerName ||
                              selected.fullName ||
                              "Customer"}
                          </p>
                        </div>

                        {/* EMAIL */}
                        <div>
                          <p className="text-[11px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                            Email
                          </p>

                          <p className="text-[16px] text-black break-all">
                            {selected.customerEmail ||
                              selected.email ||
                              "No Email"}
                          </p>
                        </div>

                        {/* PHONE */}
                        <div>
                          <p className="text-[11px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                            Phone
                          </p>

                          <p className="text-[16px] text-black">
                            {selected.phone ||
                              "No Phone"}
                          </p>
                        </div>

                        {/* SUBJECT */}
                        <div>
                          <p className="text-[11px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                            Subject
                          </p>

                          <p className="text-[16px] text-black">
                            {selected.subject ||
                              "No Subject"}
                          </p>
                        </div>

                        {/* QUERY MESSAGE */}
                        <div>
                          <p className="text-[11px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                            Query Message
                          </p>

                          <div className="bg-white border border-[#e5dfd7] rounded-xl p-4">
                            <p className="text-[15px] text-[#4a4540] leading-[1.8]">
                              {selected.queryText ||
                                selected.queryMessage ||
                                selected.message}
                            </p>
                          </div>
                        </div>

                        {/* ADMIN REPLY */}
                        {selected.adminReply && (
                          <div>
                            <p className="text-[11px] uppercase tracking-[1px] text-[#9a9388] mb-1">
                              Admin Reply
                            </p>

                            <div className="bg-[#fffdf8] border border-[#d7c79b] rounded-xl p-4">
                              <p className="text-[15px] text-black leading-[1.8]">
                                {selected.adminReply}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* BUTTONS */}

                        <button
                          onClick={() => {
                            const email =
                              selected.customerEmail ||
                              selected.email;

                            window.open(
                              `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
                              "_blank"
                            );
                          }}
                          className="w-full h-[46px] border border-[#8b6b08] text-[#8b6b08] text-[12px] uppercase tracking-[2px] rounded-xl hover:bg-[#8b6b08] hover:text-white transition flex items-center justify-center gap-2"
                        >
                          <FiMessageSquare size={14} />
                          Reply Now
                        </button>

                      </div>
                    )}

                  {/* TIME + STATUS */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                      <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">
                        Time
                      </p>

                      <p className="text-[13px] font-semibold text-black">
                        {selected.createdAt
                          ? formatDistanceToNow(
                            new Date(
                              selected.createdAt
                            ),
                            {
                              addSuffix: true,
                            }
                          )
                          : "No Time"}
                      </p>
                    </div>

                    <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                      <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">
                        Status
                      </p>

                      <p className="text-[13px] font-semibold text-black">
                        {selected.read
                          ? "Read"
                          : "Unread"}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="space-y-2 pt-2">
                    {/* <button className="w-full h-[42px] bg-[#8b6b08] text-white text-[11px] uppercase tracking-[2px] rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2">
                      <FiChevronRight size={13} />
                      Take Action
                    </button> */}

                    <button
                      onClick={() =>
                        deleteNotif(selected._id)
                      }
                      className="w-full h-[38px] border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition flex items-center justify-center gap-2"
                    >
                      <FiTrash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-[#f0ebe1] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBell
                    size={24}
                    className="text-[#8b6b08]"
                  />
                </div>

                <p
                  className="text-xs sm:text-base lg:text-lg xl:text-2xl font-semibold text-black mb-1"
                  style={{
                    fontFamily:
                      "Cormorant Garamond, serif",
                  }}
                >
                  Select a Notification
                </p>

                <p className="text-sm sm:text-base text-[#9a9388]">
                  Click any notification to
                  view its full details here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   FiShoppingBag,
//   FiTruck,
//   FiDollarSign,
//   FiRotateCcw,
//   FiUser,
//   FiShield,
//   FiUsers,
//   FiTag,
//   FiSearch,
//   FiBell,
//   FiFilter,
//   FiTrash2,
//   FiCheck,
//   FiChevronRight,
//   FiX,
//   FiGlobe,
//   FiClock,
// } from "react-icons/fi";

// import { MdOutlineInventory2 } from "react-icons/md";

// import {
//   getNotificationsAPI,
//   markReadAPI,
//   deleteNotificationAPI,
//   markAllReadAPI,
//   clearNotificationsAPI,
// } from "../../services/notificationApi";

// import { formatDistanceToNow } from "date-fns";
// import { FiMessageSquare } from "react-icons/fi";
// // const categories = [
// //   "All",
// //   "Orders",
// //   "Deliveries",
// //   "Payments",
// //   "Customers",
// //   "Inventory",
// //   "Returns & Refunds",
// //   "Coupons & Offers",
// //   "Security",
// //   "Staff",
// //   "SEO",
// // ];
// const categories = [
//   "All",
//   "Orders",
//   "Deliveries",
//   "Payments",
//   "Customers",
//   "Inventory",
//   "Returns & Refunds",
//   "Coupons & Offers",
//   "Security",
//   "Staff",
//   "SEO",
//   "Customer Queries",
// ];
// const priorityStyle = {
//   high: "bg-[#fee2e2] text-[#dc2626]",
//   normal: "bg-[#f0ebe1] text-[#8b6b08]",
// };

// const categoryIcon = {
//   Orders: <FiShoppingBag size={13} />,
//   Deliveries: <FiTruck size={13} />,
//   Payments: <FiDollarSign size={13} />,
//   Customers: <FiUser size={13} />,
//   Inventory: <MdOutlineInventory2 size={13} />,
//   "Returns & Refunds": <FiRotateCcw size={13} />,
//   "Coupons & Offers": <FiTag size={13} />,
//   Security: <FiShield size={13} />,
//   Staff: <FiUsers size={13} />,
//   SEO: <FiGlobe size={13} />,
//   "Customer Queries": <FiMessageSquare size={13} />,
// };

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [search, setSearch] = useState("");
//   const [showUnreadOnly, setShowUnreadOnly] = useState(false);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const data = await getNotificationsAPI();

//       setNotifications(data.notifications || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filtered = useMemo(() => {
//     return notifications.filter((n) => {
//       const matchCat =
//         activeCategory === "All" ||
//         n.category === activeCategory;

//       const matchSearch =
//         n.title
//           ?.toLowerCase()
//           .includes(search.toLowerCase()) ||
//         n.message
//           ?.toLowerCase()
//           .includes(search.toLowerCase());

//       const matchUnread = showUnreadOnly
//         ? !n.read
//         : true;

//       return (
//         matchCat &&
//         matchSearch &&
//         matchUnread
//       );
//     });
//   }, [
//     notifications,
//     activeCategory,
//     search,
//     showUnreadOnly,
//   ]);

//   const deleteNotif = async (id) => {
//     try {
//       await deleteNotificationAPI(id);

//       if (selected?._id === id) {
//         setSelected(null);
//       }

//       fetchNotifications();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const markRead = async (id) => {
//     try {
//       await markReadAPI(id);

//       fetchNotifications();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const markAllRead = async () => {
//     try {
//       await markAllReadAPI();

//       fetchNotifications();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const clearAll = async () => {
//     try {
//       await clearNotificationsAPI();

//       setSelected(null);

//       fetchNotifications();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const unreadCount = notifications.filter(
//     (n) => !n.read
//   ).length;

//   const handleClick = (n) => {
//     markRead(n._id);

//     setSelected({
//       ...n,
//       read: true,
//     });
//   };

//   const handleClick = async (n) => {
//     await markRead(n._id);

//     setSelected({
//       ...n,
//       read: true,
//     });

//     if (n.category === "Customer Queries") {
//       console.log("Open Query");
//     }
//   };

//   const catCount = (cat) =>
//     cat === "All"
//       ? notifications.filter((n) => !n.read)
//         .length
//       : notifications.filter(
//         (n) =>
//           n.category === cat &&
//           !n.read
//       ).length;

//   return (
//     <div
//       className="min-h-screen bg-[#f8f6f3]"
//       style={{
//         fontFamily:
//           "Montserrat, sans-serif",
//       }}
//     >
//       {/* TOP BAR */}

//       <div className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-10 py-4 sticky top-0 z-20">
//         <div className="max-w-[1300px] mx-auto flex items-center gap-3">
//           <div className="flex-1 flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2.5 rounded-xl">
//             <FiSearch className="text-[#9a9388] text-xs sm:text-sm flex-shrink-0" />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search notifications..."
//               className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-sm text-black placeholder:text-[#9a9388]"
//             />

//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//               >
//                 <FiX
//                   size={13}
//                   className="text-[#9a9388]"
//                 />
//               </button>
//             )}
//           </div>

//           <button
//             onClick={() =>
//               setShowUnreadOnly(
//                 !showUnreadOnly
//               )
//             }
//             className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] border transition flex-shrink-0 ${showUnreadOnly
//               ? "bg-[#8b6b08] text-white border-[#8b6b08]"
//               : "bg-[#fbf9f7] text-black border-[#e0d9d0] hover:border-[#8b6b08]"
//               }`}
//           >
//             <FiFilter size={13} />

//             <span className="hidden sm:inline text-xs sm:text-sm">
//               Unread
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* MAIN */}

//       <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
//         {/* HEADER */}

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//           <div>
//             <div className="flex items-center gap-3">
//               <h1
//                 className="text-2xl sm:text-3xl lg:text-4xl text-black leading-tight"
//                 style={{
//                   fontFamily:
//                     "Cormorant Garamond, serif",
//                 }}
//               >
//                 Notifications
//               </h1>

//               {unreadCount > 0 && (
//                 <span className="bg-[#8b6b08] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
//                   {unreadCount} New
//                 </span>
//               )}
//             </div>

//             <p className="text-xs sm:text-sm text-[#9a9388] mt-1">
//               Stay updated on all critical
//               admin activities.
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={markAllRead}
//               className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e0d9d0] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition"
//             >
//               <FiCheck size={13} />

//               <span className="hidden sm:inline">
//                 Mark All Read
//               </span>
//             </button>

//             <button
//               onClick={clearAll}
//               className="flex items-center gap-1.5 px-4 py-2.5 border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition"
//             >
//               <FiTrash2 size={13} />

//               <span className="hidden sm:inline">
//                 Clear
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* CATEGORY FILTER */}

//         <div className="overflow-x-auto mb-5">
//           <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
//             {categories.map((cat) => {
//               const count = catCount(cat);

//               return (
//                 <button
//                   key={cat}
//                   onClick={() =>
//                     setActiveCategory(cat)
//                   }
//                   className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[1px] transition whitespace-nowrap border ${activeCategory === cat
//                     ? "bg-[#8b6b08] text-white border-[#8b6b08]"
//                     : "bg-[#fbf9f7] text-[#4a4540] border-[#e0d9d0] hover:border-[#8b6b08] hover:text-[#8b6b08]"
//                     }`}
//                 >
//                   {cat !== "All" && (
//                     <span>
//                       {categoryIcon[cat]}
//                     </span>
//                   )}

//                   {cat}

//                   {count > 0 && (
//                     <span
//                       className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat
//                         ? "bg-white/30 text-white"
//                         : "bg-[#8b6b08] text-white"
//                         }`}
//                     >
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* CONTENT */}

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
//           {/* LEFT SIDE */}

//           <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden">
//             <div className="px-5 py-3 border-b border-[#e5dfd7] flex items-center justify-between">
//               <p className="text-sm sm:text-base text-[#9a9388]">
//                 <span className="text-[#8b6b08] font-semibold">
//                   {filtered.length}
//                 </span>{" "}
//                 notifications
//               </p>

//               <div className="flex items-center gap-1.5">
//                 <FiClock
//                   size={11}
//                   className="text-[#9a9388]"
//                 />

//                 <span className="text-[10px] text-[#9a9388]">
//                   Latest first
//                 </span>
//               </div>
//             </div>

//             {filtered.length === 0 ? (
//               <div className="text-center py-16">
//                 <FiBell
//                   size={36}
//                   className="mx-auto mb-3 text-[#d0c9c0]"
//                 />

//                 <p className="text-sm sm:text-lg text-[#9a9388]">
//                   No notifications found
//                 </p>
//               </div>
//             ) : (
//               <div className="divide-y divide-[#f0ebe1]">
//                 {filtered.map((n) => (
//                   <div
//                     key={n._id}
//                     onClick={() =>
//                       handleClick(n)
//                     }
//                     className={`flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-4 cursor-pointer hover:bg-[#f8f3ea] transition group ${selected?._id === n._id
//                       ? "bg-[#f8f3ea]"
//                       : !n.read
//                         ? "bg-[#fffdf8]"
//                         : ""
//                       }`}
//                   >
//                     <div
//                       className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${n.read
//                         ? "bg-[#f0ebe1] text-[#8b6b08]"
//                         : "bg-[#8b6b08] text-white"
//                         }`}
//                     >
//                       {categoryIcon[
//                         n.category
//                       ] || (
//                           <FiBell size={13} />
//                         )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-2">
//                         <p
//                           className={`text-sm sm:text-lg leading-tight ${n.read
//                             ? "text-[#4a4540]"
//                             : "text-black font-semibold"
//                             }`}
//                         >
//                           {n.title}
//                         </p>

//                         <div className="flex items-center gap-1.5 flex-shrink-0">
//                           {!n.read && (
//                             <span className="w-2 h-2 bg-[#8b6b08] rounded-full" />
//                           )}

//                           <span
//                             className={`text-sm px-2 py-0.5 rounded-full font-semibold ${priorityStyle[
//                               n.priority
//                             ]
//                               }`}
//                           >
//                             {n.priority}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="text-sm text-[#9a9388] mt-1 leading-[1.5] line-clamp-2">
//                         {n.message}
//                       </p>

//                       <div className="flex items-center justify-between mt-2">
//                         <div className="flex items-center gap-1.5">
//                           <span className="text-xs uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-0.5 rounded-full">
//                             {n.category}
//                           </span>

//                           <span className="text-xs sm:text-sm text-[#b0a898]">
//                             {n.createdAt
//                               ? formatDistanceToNow(
//                                 new Date(
//                                   n.createdAt
//                                 ),
//                                 {
//                                   addSuffix: true,
//                                 }
//                               )
//                               : "No Time"}
//                           </span>
//                         </div>

//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();

//                             deleteNotif(
//                               n._id
//                             );
//                           }}
//                           className="opacity-0 group-hover:opacity-100 text-[#9a9388] hover:text-[#dc2626] transition"
//                         >
//                           <FiTrash2 className="text-xs sm:text-lg" />
//                         </button>
//                       </div>
//                     </div>

//                     <FiChevronRight className="text-[#d0c9c0] text-xs sm:text-lg mt-1 flex-shrink-0 hidden sm:block" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* RIGHT SIDE */}

//           <div className="hidden lg:block">
//             {selected ? (
//               <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden sticky top-24">
//                 <div className="px-5 py-4 border-b border-[#e5dfd7] flex items-center justify-between">
//                   <p className="text-[11px] text-[#8b6b08] uppercase tracking-[1.5px] font-semibold">
//                     Notification Detail
//                   </p>

//                   <button
//                     onClick={() =>
//                       setSelected(null)
//                     }
//                     className="w-7 h-7 bg-[#f0ebe1] rounded-full flex items-center justify-center hover:bg-[#e5dfd7] transition"
//                   >
//                     <FiX
//                       size={12}
//                       className="text-black"
//                     />
//                   </button>
//                 </div>

//                 <div className="p-5 space-y-4">
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-[#8b6b08] flex items-center justify-center text-white flex-shrink-0">
//                       {categoryIcon[
//                         selected.category
//                       ] || (
//                           <FiBell size={13} />
//                         )}
//                     </div>

//                     <div>
//                       <p className="text-[14px] font-semibold text-black leading-tight">
//                         {selected.title}
//                       </p>

//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-[9px] uppercase tracking-[1px] text-[#8b6b08] bg-[#f0ebe1] px-2 py-0.5 rounded-full">
//                           {selected.category}
//                         </span>

//                         <span
//                           className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${priorityStyle[
//                             selected.priority
//                           ]
//                             }`}
//                         >
//                           {selected.priority}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <p className="text-[13px] text-[#4a4540] leading-[1.6]">
//                     {selected.message}
//                   </p>

//                   {selected.category === "Customer Queries" && (
//                     <div className="bg-[#f8f3ea] border border-[#e5dfd7] rounded-xl p-4 space-y-3">

//                       <div>
//                         <p className="text-[10px] uppercase tracking-[1px] text-[#9a9388] mb-1">
//                           Customer
//                         </p>

//                         <p className="text-sm font-medium text-black">
//                           {selected.customerName}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-[10px] uppercase tracking-[1px] text-[#9a9388] mb-1">
//                           Email
//                         </p>

//                         <p className="text-sm text-black">
//                           {selected.customerEmail}
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-[10px] uppercase tracking-[1px] text-[#9a9388] mb-1">
//                           Query
//                         </p>

//                         <p className="text-sm text-[#4a4540] leading-[1.6]">
//                           {selected.queryText}
//                         </p>
//                       </div>

//                     </div>
//                   )}
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
//                       <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">
//                         Time
//                       </p>

//                       <p className="text-[12px] font-semibold text-black">
//                         {selected.createdAt
//                           ? formatDistanceToNow(
//                             new Date(
//                               selected.createdAt
//                             ),
//                             {
//                               addSuffix: true,
//                             }
//                           )
//                           : "No Time"}
//                       </p>
//                     </div>

//                     <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
//                       <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">
//                         Status
//                       </p>

//                       <p className="text-[12px] font-semibold text-black">
//                         {selected.read
//                           ? "Read"
//                           : "Unread"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-2 pt-2">
//                     <button className="w-full h-[42px] bg-[#8b6b08] text-white text-[11px] uppercase tracking-[2px] rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2">
//                       <FiChevronRight size={13} />
//                       Take Action
//                     </button>

//                     <button
//                       onClick={() =>
//                         deleteNotif(
//                           selected._id
//                         )
//                       }
//                       className="w-full h-[38px] border border-[#e0d9d0] text-[#dc2626] text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#dc2626] transition flex items-center justify-center gap-2"
//                     >
//                       <FiTrash2 size={13} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-8 text-center">
//                 <div className="w-14 h-14 bg-[#f0ebe1] rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FiBell
//                     size={24}
//                     className="text-[#8b6b08]"
//                   />
//                 </div>

//                 <p
//                   className="text-xs sm:text-base lg:text-lg xl:text-2xl font-semibold text-black mb-1"
//                   style={{
//                     fontFamily:
//                       "Cormorant Garamond, serif",
//                   }}
//                 >
//                   Select a Notification
//                 </p>

//                 <p className="text-sm sm:text-base text-[#9a9388]">
//                   Click any notification to
//                   view its full details here.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }