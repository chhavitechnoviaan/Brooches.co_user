// import React, { useState, useEffect } from "react";
// import {
//   FiGrid,
//   FiBox,
//   FiRepeat,
//   FiBarChart2,
//   FiUsers,
//   FiSearch,
//   FiBell,
//   FiMail,
//   FiDownload,
//   FiCalendar,
//   FiLogOut,
//   FiTrendingUp,
//   FiMenu,
//   FiX,
//   FiPlus,
//   FiChevronRight,
//   FiEye,
//   FiShoppingBag,
//   FiTag,
//   FiTruck,
//   FiSettings,
//   FiUserCheck,
//   FiPackage,
// } from "react-icons/fi";
// import { RiStackFill } from "react-icons/ri";
// import {
//   FiEdit,
//   FiTrash2,
//   FiCheck,
//   FiDollarSign,
//   FiRefreshCw,
//   FiUser,
// } from "react-icons/fi";
// import { BsGem } from "react-icons/bs";
// import Account from "../admin/Setting";
// import { MdOutlineInventory2 } from "react-icons/md";
// import { RiLineChartLine, RiPieChartLine } from "react-icons/ri";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// import Inventory from "./Inventory";
// import AddProduct from "./AddProduct";
// import Logout from "./LogOut";
// import Coupons from '../admin/Coupon'
// import Settings from "./Setting";
// import Orders from "./Orders"
// import Transactions from "./Transaction";
// import Seo from './SEO'
// import Customer from "./Customer";
// import Collections from "./Collections";
// import Notifications from "./Notifications";
// import { useNavigate } from "react-router-dom";



// const navItems = [
//   { id: "dashboard", label: "Dashboard", icon: <FiGrid size={18} /> },

//   { id: "collections", label: "Collections", icon: <BsGem size={18} /> },
//   {
//     id: "inventory",
//     label: "Inventory",
//     icon: <MdOutlineInventory2 size={18} />,
//   },
//   { id: "transactions", label: "Transactions", icon: <FiRepeat size={18} /> },
//   { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
//   {
//     id: "coupons",
//     label: "Coupons",
//     icon: <FiTag />,
//   },
//   {
//     id: "customers",
//     label: "Customers",
//     icon: <FiUsers />,
//   },
//   {
//     id: "seo",
//     label: "SEO",
//     icon: <FiTrendingUp />,
//   },
//   {
//     id: "notifications",
//     label: "Notifications",
//     icon: <FiBell />,
//   },
//   {
//     id: "settings",
//     label: "Settings",
//     icon: <FiSettings />,
//   },
// ];

// // const stats = [
// //   {
// //     label: "TOTAL ASSET VALUE",
// //     value: "$2,430,000",
// //     badge: "+12.5%",
// //     sub: "80% Target",
// //     pct: 80,
// //     icon: <FiBarChart2 size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "MONTHLY SALES",
// //     value: "$128,430",
// //     badge: "+8.2%",
// //     sub: "66% Target",
// //     pct: 66,
// //     icon: <FiTrendingUp size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "ORDER VOLUME",
// //     value: "1,240",
// //     badge: "New",
// //     sub: "50% Growth",
// //     pct: 50,
// //     icon: <FiBox size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "INVENTORY HEALTH",
// //     value: "85% Safe",
// //     badge: "92%",
// //     sub: "Optimal",
// //     pct: 92,
// //     icon: <MdOutlineInventory2 size={18} className="text-[#8b6b08]" />,
// //   },
// // ];

// // const statsBelow = [
// //   {
// //     label: "Curate Asset",
// //     value: "$2,430,000",
// //     sub: "Add new inventory",
// //     icon: <FiBarChart2 size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "Loyalty Elite ",
// //     value: "$128,430",
// //     sub: "Manage vip status",
// //     icon: <FiTrendingUp size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "Catalog Edit",
// //     value: "1,240",
// //     sub: "Modify lookgood",
// //     icon: <FiBox size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "Global Logistics",
// //     value: "85% Safe",
// //     sub: "Track high-value cargo",
// //     icon: <MdOutlineInventory2 size={18} className="text-[#8b6b08]" />,
// //   },
// // ];

// // const inventory = [
// //   {
// //     label: "TOTAL PRODUCTS",
// //     value: "248",
// //     badge: "+4.5%",
// //     sub: "80% Target",
// //     pct: 80,
// //     icon: <FiBarChart2 size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "LOW STOCK",
// //     value: "12",
// //     badge: "Needs Attention",
// //     sub: "66% Target",
// //     pct: 66,
// //     icon: <FiTrendingUp size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "OUT OF STOCK",
// //     value: "3",
// //     badge: "Inactive",
// //     sub: "50% Growth",
// //     pct: 50,
// //     icon: <FiBox size={18} className="text-[#8b6b08]" />,
// //   },
// //   {
// //     label: "ACTIVE LISTINGS",
// //     value: "233   ",
// //     badge: "94% Live",
// //     sub: "Optimal",
// //     pct: 92,
// //     icon: <FiEye size={18} className="text-[#8b6b08]" />,
// //   },
// // ];
// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-[#1a1a0a] border border-[#8b6b08]/40 px-4 py-3 rounded-xl shadow-xl">
//         <p className="text-[10px] uppercase tracking-[2px] text-[#8b6b08] mb-1">
//           JULY PEAK REVENUE
//         </p>
//         <p className="text-xl font-bold text-white">
//           ${payload[0].value.toLocaleString()}.00
//         </p>
//         <p className="text-[11px] text-[#8b6b08] mt-1">↑ +14% vs June</p>
//       </div>
//     );
//   }
//   return null;
// };

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);


//   const [stats, setStats] = useState([
//     {
//       label: "TOTAL REVENUE",
//       value: "$0",
//       badge: "+0%",
//       sub: "Loading...",
//       pct: 0,
//       icon: <FiDollarSign size={18} className="text-[#8b6b08]" />,
//     },
//     {
//       label: "TOTAL ORDERS",
//       value: "0",
//       badge: "+0%",
//       sub: "Loading...",
//       pct: 0,
//       icon: <FiShoppingBag size={18} className="text-[#8b6b08]" />,
//     },
//     {
//       label: "TOTAL PRODUCTS",
//       value: "0",
//       badge: "+0%",
//       sub: "Loading...",
//       pct: 0,
//       icon: <FiPackage size={18} className="text-[#8b6b08]" />,
//     },
//     {
//       label: "TOTAL CUSTOMERS",
//       value: "0",
//       badge: "+0%",
//       sub: "Loading...",
//       pct: 0,
//       icon: <FiUsers size={18} className="text-[#8b6b08]" />,
//     },
//   ]);

//   const [statsBelow, setStatsBelow] = useState([]);

//   const [chartData, setChartData] = useState([]);

//   const [recentOrders, setRecentOrders] = useState([]);

//   const [marketData, setMarketData] = useState([
//     { label: "Orders", pct: 0, color: "#8b6b08" },
//     { label: "Products", pct: 0, color: "#a07c10" },
//     { label: "Customers", pct: 0, color: "#c6a53a" },
//   ]);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         "http://localhost:5000/api/admin/dashboard",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       // STATS
//       setStats([
//         {
//           label: "TOTAL REVENUE",
//           value: `₹${data.totalRevenue || 0}`,
//           badge: "+12%",
//           sub: "Overall Revenue",
//           pct: 85,
//           icon: (
//             <FiDollarSign
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//         {
//           label: "TOTAL ORDERS",
//           value: data.totalOrders || 0,
//           badge: "+8%",
//           sub: "Orders Received",
//           pct: 70,
//           icon: (
//             <FiShoppingBag
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//         {
//           label: "TOTAL PRODUCTS",
//           value: data.totalProducts || 0,
//           badge: "+5%",
//           sub: "Active Inventory",
//           pct: 65,
//           icon: (
//             <FiPackage
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//         {
//           label: "TOTAL CUSTOMERS",
//           value: data.totalCustomers || 0,
//           badge: "+18%",
//           sub: "Registered Users",
//           pct: 90,
//           icon: (
//             <FiUsers
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//       ]);

//       // CHART DATA
//       setChartData(
//         data.monthlySales || [
//           { month: "JAN", value: 0 },
//           { month: "FEB", value: 0 },
//         ]
//       );

//       // RECENT ORDERS
//       setRecentOrders(data.recentOrders || []);

//       // MARKET DATA
//       setMarketData([
//         {
//           label: "Orders",
//           pct: data.orderPercent || 40,
//           color: "#8b6b08",
//         },
//         {
//           label: "Products",
//           pct: data.productPercent || 30,
//           color: "#a07c10",
//         },
//         {
//           label: "Customers",
//           pct: data.customerPercent || 20,
//           color: "#c6a53a",
//         },
//       ]);

//       // BOTTOM CARDS
//       setStatsBelow([
//         {
//           label: "Pending Orders",
//           value: data.pendingOrders || 0,
//           sub: "Orders waiting",
//           icon: (
//             <FiRefreshCw
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//         {
//           label: "Delivered Orders",
//           value: data.deliveredOrders || 0,
//           sub: "Completed successfully",
//           icon: (
//             <FiTruck
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//         {
//           label: "Active Coupons",
//           value: data.totalCoupons || 0,
//           sub: "Coupons available",
//           icon: (
//             <FiTag
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//         {
//           label: "Admin Users",
//           value: data.totalAdmins || 0,
//           sub: "Management Team",
//           icon: (
//             <FiUserCheck
//               size={18}
//               className="text-[#8b6b08]"
//             />
//           ),
//         },
//       ]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [active, setActive] = useState("dashboard");
//   const [chartTab, setChartTab] = useState("Monthly");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // const dummyUsers = Array.from({ length: 12 }).map((_, i) => ({
//   //   id: `#TV-882${i + 1}`,
//   //   portfolio: "Eleanor Shellstrop",
//   //   assetValue: "$9898",
//   //   method: "AMEX Platinum",
//   //   verification: i % 3 === 0 ? "Inactive" : "active",
//   // }));
//   const [users, setUsers] = useState(dummyUsers);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   const inventoryUsers = Array.from({ length: 2 }).map((_, i) => ({
//     image:
//       "https://thfvnext.bing.com/th/id/OIP.Tm2EnO5G0BgDX_W2QT44-wHaEK?w=319&h=180&c=7&r=0&o=7&cb=thfvnextfalcon&dpr=1.6&pid=1.7&rm=3",
//     product: "Nike Air Max",
//     category: "Footwear",
//     stock: 45,
//     price: "$120",
//     status: i % 3 === 0 ? "Inactive" : "active",
//     action: "Edit",
//   }));

//   const [product, setProduct] = useState(null);
//   const [showProduct, setShowProduct] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const updatedInventory = product
//     ? [...inventoryUsers, product]
//     : inventoryUsers;

//   // console.log("update", product);
//   const [editUser, setEditUser] = useState(null);
//   const [deleteUser, setDeleteUser] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const itemsPerPage = 5;
//   const inventoryItemsPerPage = 5;
//   const [inventorySearch, setInventorySearch] = useState("");
//   const [inventoryPage, setInventoryPage] = useState(1);

//   const totalPages = Math.ceil(users.length / itemsPerPage);
//   const currentData = users.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );



//   const totalInventoryPages = Math.ceil(
//     updatedInventory.length / inventoryItemsPerPage
//   );
//   const filtered = updatedInventory.filter((u) =>
//     (u.product || "").toLowerCase().includes(inventorySearch.toLowerCase())
//   );

//   const currentInventoryData = filtered.slice(
//     (inventoryPage - 1) * inventoryItemsPerPage,
//     inventoryPage * inventoryItemsPerPage
//   );

//   return (
//     <div
//       className="flex min-h-screen bg-[#f8f6f3]"
//       style={{ fontFamily: "Montserrat, sans-serif" }}
//     >
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside
//         className={`
//            fixed lg:sticky lg:top-0 self-start
//              inset-y-0 left-0 z-30 w-52 xl:w-64  h-screen  bg-[#fbf9f7] border-r border-[#e5dfd7]
//           flex flex-col justify-between py-6
//           transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 
//         `}
//       >
//         <div>
//           <div className="px-6 mb-8 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 bg-[#8b6b08] flex items-center justify-center">
//                 <BsGem size={16} className="text-white" />
//               </div>
//               <div>
//                 <p
//                   className="text-lg sm:text-xl lg-text-4xl font-bold text-black"
//                   style={{ fontFamily: "Cormorant Garamond, serif" }}
//                 >
//                   Brooches
//                 </p>
//                 <p className="text-[9px] uppercase tracking-[2px] text-[#9a9388]">
//                   Master Curator
//                 </p>
//               </div>
//             </div>
//             <button
//               className="lg:hidden text-[#9a9388]"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <FiX size={18} />
//             </button>
//           </div>

//           <div className="px-4 ">
//             <p className="text-[9px] uppercase tracking-[2.5px] text-[#9a9388] px-2 mb-2">
//               Management
//             </p>
//             {navItems.slice(0, 4).map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActive(item.id);
//                   setSidebarOpen(false);
//                 }}
//                 className={`w-full flex items-center gap-3 px-3 py-3 text-[13px] transition-all duration-200 mb-1 ${active === item.id
//                   ? "bg-[#8b6b08] text-white rounded-lg"
//                   : "text-[#4a4540] hover:bg-[#ede8e0] rounded-lg"
//                   }`}
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//                 {active === item.id && (
//                   <FiChevronRight size={14} className="ml-auto" />
//                 )}
//               </button>
//             ))}
//           </div>

//           <div className="px-4 ">
//             {navItems.slice(4).map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActive(item.id);
//                   setSidebarOpen(false);
//                 }}
//                 className={`w-full flex items-center gap-3 px-3 py-3 text-[13px] transition-all duration-200 mb-1 ${active === item.id
//                   ? "bg-[#8b6b08] text-white rounded-lg"
//                   : "text-[#4a4540] hover:bg-[#ede8e0] rounded-lg"
//                   }`}
//               >
//                 {item.icon}
//                 <span>{item.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="px-4 space-y-3">
//           <button
//             onClick={() => setShowLogoutModal(true)}
//             className="w-full flex items-center gap-3 px-3 py-3 text-[13px] text-[#4a4540] hover:bg-[#ede8e0] rounded-lg transition"
//           >
//             <FiLogOut size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       <div className="flex-1 flex flex-col min-w-0">
//         <header className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-20">
//           <div className="flex items-center gap-4">
//             <button
//               className="lg:hidden text-[#4a4540]"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <FiMenu size={22} />
//             </button>
//             <div className="hidden sm:block">
//               <h1
//                 className="text-lg sm:text-xl font-semibold  text-black"
//                 style={{ fontFamily: "Cormorant Garamond, serif" }}
//               >
//                 Dashboard{" "}
//                 <span className="italic text-[#8b6b08]">Overview</span>
//               </h1>
//             </div>
//           </div>

//           <div className="flex-1 max-w-[340px] hidden md:flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2 rounded-lg">
//             <FiSearch className="text-[#9a9388] text-xs sm:text-sm" />
//             <input
//               type="text"
//               placeholder="Search across your luxury portfolio..."
//               className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-sm text-black placeholder:text-[#9a9388]"
//             />
//             <span className="text-xs sm:text-sm text-[#9a9388] border border-[#d0c9c0] px-1.5 py-0.5 rounded">
//               ⌘K
//             </span>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="w-9 h-9 bg-[#f0ebe1] border border-[#e0d9d0] flex items-center justify-center rounded-lg text-[#4a4540] hover:text-[#8b6b08] transition">
//               <FiMail size={16} />
//             </button>
//             <button className="relative w-9 h-9 bg-[#f0ebe1] border border-[#e0d9d0] flex items-center justify-center rounded-lg text-[#4a4540] hover:text-[#8b6b08] transition">
//               <FiBell size={16} />
//               <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8b6b08] rounded-full" />
//             </button>
//             <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#e0d9d0]">
//               {/* <div className="w-9 h-9 bg-[#8b6b08] rounded-full flex items-center justify-center text-white text-[11px] font-bold">
//                 JS
//               </div>
//               <div className="hidden lg:block">
//                 <p className="text-[12px] font-semibold text-black leading-none">
//                   Julian Sterling
//                 </p>
//                 <p className="text-[9px] uppercase tracking-[1.5px] text-[#8b6b08]">
//                   Executive Curator
//                 </p>
//               </div> */}
//               <div
//                 onClick={() => setActive("settings")}
//                 className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#e0d9d0] cursor-pointer"
//               >
//                 <div className="w-9 h-9 bg-[#8b6b08] rounded-full flex items-center justify-center text-white text-[11px] font-bold uppercase">
//                   {user?.name?.charAt(0) || "U"}
//                 </div>

//                 <div className="hidden lg:block">
//                   <p className="text-[12px] font-semibold text-black leading-none">
//                     {user?.name || "Guest User"}
//                   </p>

//                   <p className="text-[9px] uppercase tracking-[1.5px] text-[#8b6b08]">
//                     {user?.email || "No Email"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {active === "dashboard" && (
//           <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <p className="text-[10px] uppercase tracking-[2.5px] text-[#8b6b08] mb-1">
//                   Portfolio Summary
//                 </p>
//                 <h2
//                   className="text-2xl sm:text-3xl lg:text-[36px] text-black font-light"
//                   style={{ fontFamily: "Cormorant Garamond, serif" }}
//                 >
//                   {/* Welcome back, <em className="text-[#8b6b08]">Director</em> */}
//                   Welcome back,{" "}
//                   <em className="text-[#8b6b08]">
//                     {user?.name || "Director"}
//                   </em>
//                 </h2>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-2 bg-[#fbf9f7] border border-[#e0d9d0] px-4 py-2.5 rounded-lg text-[12px] text-black">
//                   <FiCalendar size={14} className="text-[#8b6b08]" />
//                   <span>Oct 1 – Oct 31, 2023</span>
//                 </div>
//                 <button className="flex items-center gap-2 bg-[#8b6b08] text-white px-4 py-2.5 rounded-lg text-[12px] uppercase tracking-[1px] hover:bg-[#a07c10] transition">
//                   <FiDownload size={14} />
//                   <span className="hidden sm:inline">Export Report</span>
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//               {stats.map((stat, i) => (
//                 <div
//                   key={i}
//                   className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="w-10 h-10 bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl flex items-center justify-center">
//                       {stat.icon}
//                     </div>
//                     <span className="text-xs bg-[#f0ebe1] border border-[#8b6b08]/30 text-[#8b6b08] px-2 py-1 rounded-full font-semibold">
//                       {stat.badge}
//                     </span>
//                   </div>
//                   <p className="text-xs sm:text-base uppercase tracking-[1.5px] text-[#9a9388] mb-2">
//                     {stat.label}
//                   </p>
//                   <p
//                     className="text-2xl sm:text-[26px] font-bold text-black mb-3"
//                     style={{ fontFamily: "Cormorant Garamond, serif" }}
//                   >
//                     {stat.value}
//                   </p>
//                   <div className="w-full h-1.5 bg-[#e5dfd7] rounded-full overflow-hidden mb-1">
//                     <div
//                       className="h-full bg-[#8b6b08] rounded-full transition-all duration-700"
//                       style={{ width: `${stat.pct}%` }}
//                     />
//                   </div>
//                   <p className="text-xs sm:text-sm text-[#9a9388]">{stat.sub}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
//               <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 sm:p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
//                   <div>
//                     <h3
//                       className="text-lg sm:text-2xl font-semibold text-black"
//                       style={{ fontFamily: "Cormorant Garamond, serif" }}
//                     >
//                       Financial Performance
//                     </h3>
//                     <p className="text-sm text-[#9a9388]">
//                       Portfolio revenue & expansion tracking
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-center w-fit gap-1  bg-[#f0ebe1] border border-[#e0d9d0] rounded-lg p-1">
//                     {["Weekly", "Monthly", "Annual"].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => setChartTab(tab)}
//                         className={`px-3 py-1.5 text-[11px] rounded-md transition-all duration-200 ${chartTab === tab
//                           ? "bg-[#8b6b08] text-white font-semibold"
//                           : "text-[#4a4540] hover:text-black"
//                           }`}
//                       >
//                         {tab}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="h-[240px] sm:h-[280px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart
//                       data={chartData}
//                       margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
//                     >
//                       <defs>
//                         <linearGradient
//                           id="goldGrad"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#8b6b08"
//                             stopOpacity={0.3}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#8b6b08"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#e5dfd7" />
//                       <XAxis
//                         dataKey="month"
//                         tick={{ fontSize: 11, fill: "#9a9388" }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <YAxis
//                         tick={{ fontSize: 11, fill: "#9a9388" }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Area
//                         type="monotone"
//                         dataKey="value"
//                         stroke="#8b6b08"
//                         strokeWidth={2.5}
//                         fill="url(#goldGrad)"
//                         dot={false}
//                         activeDot={{
//                           r: 6,
//                           fill: "#8b6b08",
//                           stroke: "#fbf9f7",
//                           strokeWidth: 2,
//                         }}
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 sm:p-6">
//                 <div className="flex items-center gap-2 mb-1">
//                   <RiPieChartLine size={18} className="text-[#8b6b08]" />
//                   <h3
//                     className="text-lg sm:text-[20px] font-semibold text-black"
//                     style={{ fontFamily: "Cormorant Garamond, serif" }}
//                   >
//                     Market Distribution
//                   </h3>
//                 </div>
//                 <p className="text-xs sm:text-sm text-[#9a9388] mb-6">
//                   Asset allocation by tier
//                 </p>

//                 <div className="space-y-5">
//                   {marketData.map((item, i) => (
//                     <div key={i}>
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                           <span
//                             className="w-2 h-2 rounded-full"
//                             style={{ backgroundColor: item.color }}
//                           />
//                           <span className="text-[13px] text-black">
//                             {item.label}
//                           </span>
//                         </div>
//                         <span className="text-[13px] font-semibold text-black">
//                           {item.pct}%
//                         </span>
//                       </div>
//                       <div className="w-full h-1.5 bg-[#e5dfd7] rounded-full overflow-hidden">
//                         <div
//                           className="h-full rounded-full transition-all duration-700"
//                           style={{
//                             width: `${item.pct}%`,
//                             backgroundColor: item.color,
//                           }}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 pt-5 border-t border-[#e5dfd7]">
//                   <p className="text-xs sm:text-sm uppercase tracking-[2px] text-[#9a9388] mb-3">
//                     Recent Activity Feed
//                   </p>
//                   {[
//                     {
//                       msg: "New $3,500 Order Validated",
//                       user: "Tahani Al-Jamil",
//                       time: "12 mins",
//                     },
//                     {
//                       msg: "Inventory restocked",
//                       user: "Julian Sterling",
//                       time: "1 hr",
//                     },
//                   ].map((act, i) => (
//                     <div key={i} className="flex items-start gap-3 mb-3">
//                       <div className="w-7 h-7 bg-[#8b6b08] rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
//                         {act.user
//                           .split(" ")
//                           .map((w) => w[0])
//                           .join("")}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-xs sm:text-sm text-black truncate">
//                           {act.msg}
//                         </p>
//                         <p className="text-xs text-[#9a9388]">
//                           {act.user} • {act.time}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="bg-[#fbf9f7] rounded-xl shadow p-4 ">
//                 <div className="flex sm:flex-row flex-col justify-between  items-start sm:items-center gap-2  mb-4 px-2 sm:px-8">
//                   <div className="gap-2">
//                     <h1 className="font-medium text-sm sm:text-lg lg:text-xl font-serif">
//                       Recent Portfolio Transactions
//                     </h1>
//                     <p className="sm:text-sm text-xs">
//                       Real-time luxuary order processing
//                     </p>
//                   </div>
//                   <div className=" flex items-center justify-evenly gap-3">
//                     <button className="px-3 py-2 text-xs sm:text-base rounded-lg bg-[#8b6b08] text-white">
//                       {" "}
//                       Filter{" "}
//                     </button>
//                     <button className="px-3 py-2 text-xs sm:text-base text-white rounded-lg bg-[#8b6b08]">
//                       View Details History
//                     </button>
//                   </div>
//                 </div>

//                 <div className="overflow-x-auto  px-0 sm:px-3 md:px-8">
//                   <table className="w-full text-xs sm:text-sm">
//                     <thead className="text-[#8b6b08] text-left text-xs gap-  sm:text-sm">
//                       <tr className="gap-">
//                         <th className="py-2 ">Identifier</th>
//                         <th>Client Portfolio</th>
//                         <th>Asset Value</th>
//                         <th>Verification</th>
//                         <th>Method</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {/* {currentData.map((u, id) => ( */}
//                       {recentOrders.map((u, id) => (
//                         <tr key={id} className="border-t text-[#707071]">
//                           {/* <td className="py-2 flex font-medium items-center gap-2">
//                             {u.id}
//                           </td>
//                           <td className="font-medium  ">
//                             {u.portfolio}
//                           </td>
//                           <td className="font-medium font-serif ">
//                             {u.assetValue}
//                           </td>
//                           <td className="font-medium">
//                             <span
//                               className={`px-2 py-1 rounded-lg text-xs ${u.verification === "active"
//                                 ? "bg-green-100 text-green-600"
//                                 : "bg-gray-200 text-gray-600"
//                                 }`}
//                             >
//                               {u.verification}
//                             </span>
//                           </td>
//                           <td className="font-medium">{u.method}</td> */}


//                           <td className="py-2 flex font-medium items-center gap-2">
//                             #{u._id?.slice(-5)}
//                           </td>

//                           <td className="font-medium">
//                             {u.shippingAddress?.fullName || "Customer"}
//                           </td>

//                           <td className="font-medium font-serif">
//                             ₹{u.totalAmount}
//                           </td>

//                           <td className="font-medium">
//                             <span
//                               className={`px-2 py-1 rounded-lg text-xs ${u.orderStatus === "Delivered"
//                                   ? "bg-green-100 text-green-600"
//                                   : "bg-yellow-100 text-yellow-700"
//                                 }`}
//                             >
//                               {u.orderStatus}
//                             </span>
//                           </td>

//                           <td className="font-medium">
//                             {u.paymentMethod || "COD"}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="flex justify-between items-center mt-4 text-sm px-2 sm:px-8">
//                   {/* <p>
//                     Showing {currentData.length} of {users.length} results
//                   </p> */}

//                   <div className="flex gap-2 items-center">
//                     <button
//                       onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                       className="border px-3 py-1 rounded"
//                     >
//                       Previous
//                     </button>

//                     <span className="bg-[#8b6b08] text-white px-3 py-1 rounded">
//                       {page}
//                     </span>

//                     <button
//                       onClick={() =>
//                         setPage((p) => (p < totalPages ? p + 1 : p))
//                       }
//                       className="border px-3 py-1 rounded"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//               {statsBelow.map((stat, i) => (
//                 <div
//                   key={i}
//                   className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="flex flex-col gap-4 items-center justify-between mb-4">
//                     <div className="w-10 h-10 bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl flex items-center justify-center">
//                       {stat.icon}
//                     </div>
//                     <div className="text-center">
//                       <p className="text-xs sm:text-sm uppercase tracking-[1.5px] text-[#9a9388] mb-2">
//                         {stat.label}
//                       </p>
//                       <p className="text-xs text-[#9a9388] uppercase">
//                         {stat.sub}
//                       </p>{" "}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </main>
//         )}



//         {active === "coupons" && (
//           <Coupons />
//         )}


//         {active === "settings" && (
//           <Settings />
//         )}


//         {active === "orders" && (
//           <Orders />
//         )}


//         {active === "transactions" && (
//           <Transactions />
//         )}


//         {active === "seo" && (
//           <Seo />
//         )}

//         {active === "customers" && <Customer />}

//         {active === "notifications" && <Notifications />}

//         {/* {!showProduct && active === "inventory" && (
//           <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h2
//                   className="text-2xl sm:text-3xl lg:text-[36px] text-black font-light"
//                   style={{ fontFamily: "Cormorant Garamond, serif" }}
//                 >
//                   Product Management,
//                 </h2>
//                 <p className="text-sm   mb-1">
//                   Manage luxury inventory with precision and elegance. Track
//                   every gemstone and filigree detail in real-time.
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//               {inventory.map((stat, i) => (
//                 <div
//                   key={i}
//                   className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="w-10 h-10 bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl flex items-center justify-center">
//                       {stat.icon}
//                     </div>
//                     <span className="text-[10px] bg-[#f0ebe1] border border-[#8b6b08]/30 text-[#8b6b08] px-2 py-1 rounded-full font-semibold">
//                       {stat.badge}
//                     </span>
//                   </div>
//                   <p className="text-xs sm:text-base uppercase tracking-[1.5px] text-[#9a9388] mb-2">
//                     {stat.label}
//                   </p>
//                   <p
//                     className="text-2xl sm:text-[26px] font-bold text-black mb-3"
//                     style={{ fontFamily: "Cormorant Garamond, serif" }}
//                   >
//                     {stat.value}
//                   </p>
//                   <div className="w-full h-1.5 bg-[#e5dfd7] rounded-full overflow-hidden mb-1">
//                     <div
//                       className="h-full bg-[#8b6b08] rounded-full transition-all duration-700"
//                       style={{ width: `${stat.pct}%` }}
//                     />
//                   </div>
//                   <p className="text-[10px] text-[#9a9388]">{stat.sub}</p>
//                 </div>
//               ))}
//             </div>

//           </main>
//         )} */}


//         {/* {showProduct && (
//           <AddProduct setShowProduct={setShowProduct} setProduct={setProduct} />
//         )} */}
//         {showProduct && (
//           <AddProduct
//             setShowProduct={setShowProduct}
//             editProduct={editProduct}
//             setEditProduct={setEditProduct}
//           />
//         )}
//         {active === "inventory" && (
//           <Inventory
//             setShowProduct={setShowProduct}
//             setEditProduct={setEditProduct}
//           />
//         )}
//         {active === "collections" && <Collections active={active} />}

//       </div>
//       {showLogoutModal && <Logout setShowLogoutModal={setShowLogoutModal} />}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import {
  FiGrid,
  FiRepeat,
  FiUsers,
  FiSearch,
  FiBell,
  FiMail,
  FiDownload,
  FiCalendar,
  FiLogOut,
  FiTrendingUp,
  FiMenu,
  FiX,
  FiChevronRight,
  FiShoppingBag,
  FiTag,
  FiTruck,
  FiSettings,
  FiUserCheck,
  FiPackage,
  FiDollarSign,
  FiRefreshCw,
} from "react-icons/fi";

import { BsGem } from "react-icons/bs";

import { MdOutlineInventory2 } from "react-icons/md";

import { RiPieChartLine } from "react-icons/ri";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Inventory from "./Inventory";
import AddProduct from "./AddProduct";
import Logout from "./LogOut";
import Coupons from "../admin/Coupon";
import Settings from "./Setting";
import Orders from "./Orders";
import Transactions from "./Transaction";
import Seo from "./SEO";
import Customer from "./Customer";
import Collections from "./Collections";
import Notifications from "./Notifications";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FiGrid size={18} />,
  },

  {
    id: "collections",
    label: "Collections",
    icon: <BsGem size={18} />,
  },

  {
    id: "inventory",
    label: "Inventory",
    icon: <MdOutlineInventory2 size={18} />,
  },

  {
    id: "transactions",
    label: "Transactions",
    icon: <FiRepeat size={18} />,
  },

  {
    id: "orders",
    label: "Orders",
    icon: <FiShoppingBag />,
  },

  {
    id: "coupons",
    label: "Coupons",
    icon: <FiTag />,
  },

  {
    id: "customers",
    label: "Customers",
    icon: <FiUsers />,
  },

  {
    id: "seo",
    label: "SEO",
    icon: <FiTrendingUp />,
  },

  {
    id: "notifications",
    label: "Notifications",
    icon: <FiBell />,
  },

  {
    id: "settings",
    label: "Settings",
    icon: <FiSettings />,
  },
];

const CustomTooltip = ({
  active,
  payload,
}) => {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="bg-[#1a1a0a] border border-[#8b6b08]/40 px-4 py-3 rounded-xl shadow-xl">
        <p className="text-[10px] uppercase tracking-[2px] text-[#8b6b08] mb-1">
          MONTHLY SALES
        </p>

        <p className="text-xl font-bold text-white">
          ₹
          {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export default function AdminDashboard() {
  const [active, setActive] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [chartTab, setChartTab] =
    useState("Monthly");

  const [showProduct, setShowProduct] =
    useState(false);

  const [editProduct, setEditProduct] =
    useState(null);

  const [
    showLogoutModal,
    setShowLogoutModal,
  ] = useState(false);

  const [user, setUser] =
    useState(null);

  // =========================
  // DYNAMIC STATES
  // =========================

  const [stats, setStats] =
    useState([]);

  const [
    statsBelow,
    setStatsBelow,
  ] = useState([]);

  const [chartData, setChartData] =
    useState([]);

  const [
    recentOrders,
    setRecentOrders,
  ] = useState([]);

  const [marketData, setMarketData] =
    useState([]);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchDashboard();
  }, []);

  // =========================
  // FETCH DASHBOARD
  // =========================

  const fetchDashboard =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        // ===================
        // TOP STATS
        // ===================

        setStats([
          {
            label:
              "TOTAL REVENUE",

            value: `₹${data.totalRevenue || 0}`,

            badge: "+12%",

            sub: "Overall Revenue",

            pct: 85,

            icon: (
              <FiDollarSign
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "TOTAL ORDERS",

            value:
              data.totalOrders || 0,

            badge: "+8%",

            sub: "Orders Received",

            pct: 70,

            icon: (
              <FiShoppingBag
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "TOTAL PRODUCTS",

            value:
              data.totalProducts || 0,

            badge: "+5%",

            sub: "Active Inventory",

            pct: 65,

            icon: (
              <FiPackage
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "TOTAL CUSTOMERS",

            value:
              data.totalCustomers || 0,

            badge: "+18%",

            sub: "Registered Users",

            pct: 90,

            icon: (
              <FiUsers
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },
        ]);

        // ===================
        // CHART DATA
        // ===================

        setChartData(
          data.monthlySales || []
        );

        // ===================
        // RECENT ORDERS
        // ===================

        // setRecentOrders(
        //   data.recentOrders || []
        // );

        setRecentOrders(
  (data.recentOrders || [])
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 10)
);

        // ===================
        // MARKET DATA
        // ===================

        setMarketData([
          {
            label: "Orders",
            pct:
              data.orderPercent ||
              40,
            color: "#8b6b08",
          },

          {
            label: "Products",
            pct:
              data.productPercent ||
              30,
            color: "#a07c10",
          },

          {
            label: "Customers",
            pct:
              data.customerPercent ||
              20,
            color: "#c6a53a",
          },
        ]);

        // ===================
        // BOTTOM STATS
        // ===================

        setStatsBelow([
          {
            label:
              "Pending Orders",

            value:
              data.pendingOrders ||
              0,

            sub: "Orders waiting",

            icon: (
              <FiRefreshCw
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "Delivered Orders",

            value:
              data.deliveredOrders ||
              0,

            sub:
              "Completed successfully",

            icon: (
              <FiTruck
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "Active Coupons",

            value:
              data.totalCoupons ||
              0,

            sub:
              "Coupons available",

            icon: (
              <FiTag
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },

          {
            label:
              "Admin Users",

            value:
              data.totalAdmins ||
              0,

            sub:
              "Management Team",

            icon: (
              <FiUserCheck
                size={18}
                className="text-[#8b6b08]"
              />
            ),
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      className="flex min-h-screen bg-[#f8f6f3]"
      style={{
        fontFamily:
          "Montserrat, sans-serif",
      }}
    >
      {/* SIDEBAR */}

      <aside
        className={`fixed lg:sticky inset-y-0 left-0 z-30 w-64 h-screen bg-[#fbf9f7] border-r border-[#e5dfd7] flex flex-col justify-between py-6 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="px-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#8b6b08] flex items-center justify-center">
                <BsGem
                  size={16}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-xl font-bold text-black">
                  Brooches
                </p>

                <p className="text-[9px] uppercase tracking-[2px] text-[#9a9388]">
                  Master Curator
                </p>
              </div>
            </div>

            <button
              className="lg:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setActive(item.id)
                }
                className={`w-full flex items-center gap-3 px-3 py-3 text-[13px] transition-all duration-200 mb-1 ${
                  active === item.id
                    ? "bg-[#8b6b08] text-white rounded-lg"
                    : "text-[#4a4540] hover:bg-[#ede8e0] rounded-lg"
                }`}
              >
                {item.icon}

                <span>{item.label}</span>

                {active ===
                  item.id && (
                  <FiChevronRight
                    size={14}
                    className="ml-auto"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4">
          <button
            onClick={() =>
              setShowLogoutModal(true)
            }
            className="w-full flex items-center gap-3 px-3 py-3 text-[13px] text-[#4a4540] hover:bg-[#ede8e0] rounded-lg transition"
          >
            <FiLogOut size={18} />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <div className="flex-1 flex flex-col">
        {/* HEADER */}

        <header className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              <FiMenu size={22} />
            </button>

            <h1 className="text-2xl font-semibold">
              Dashboard
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2 rounded-lg">
            <FiSearch />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* <button className="w-9 h-9 bg-[#f0ebe1] border rounded-lg flex items-center justify-center">
              <FiMail />
            </button> */}

            {/* <button className="w-9 h-9 bg-[#f0ebe1] border rounded-lg flex items-center justify-center">
              <FiBell />
            </button> */}
            

            <div className="hidden sm:flex items-center gap-2">
              <div className="w-9 h-9 bg-[#8b6b08] rounded-full flex items-center justify-center text-white font-bold uppercase">
                {user?.name?.charAt(
                  0
                ) || "U"}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {user?.name}
                </p>

                <p className="text-xs text-[#8b6b08]">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}

        {active ===
          "dashboard" && (
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            {/* TOP */}

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[2px] text-[#8b6b08]">
                  Portfolio Summary
                </p>

                <h2 className="text-4xl font-light">
                  Welcome back,{" "}
                  <span className="text-[#8b6b08] italic">
                    {user?.name ||
                      "Director"}
                  </span>
                </h2>
              </div>

              {/* <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#fbf9f7] border px-4 py-2 rounded-lg">
                  <FiCalendar />

                  <span>
                    Oct 1 – Oct 31
                  </span>
                </div>

                <button className="flex items-center gap-2 bg-[#8b6b08] text-white px-4 py-2 rounded-lg">
                  <FiDownload />

                  Export
                </button>
              </div> */}
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map(
                (stat, i) => (
                  <div
                    key={i}
                    className="bg-[#fbf9f7] border rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-[#f0ebe1] rounded-xl flex items-center justify-center">
                        {stat.icon}
                      </div>

                      <span className="text-xs bg-[#f0ebe1] text-[#8b6b08] px-2 py-1 rounded-full">
                        {stat.badge}
                      </span>
                    </div>

                    <p className="text-xs uppercase tracking-[1px] text-[#9a9388]">
                      {stat.label}
                    </p>

                    <p className="text-3xl font-bold mt-2">
                      {stat.value}
                    </p>

                    <div className="w-full h-1.5 bg-[#e5dfd7] rounded-full mt-4">
                      <div
                        className="h-full bg-[#8b6b08] rounded-full"
                        style={{
                          width: `${stat.pct}%`,
                        }}
                      />
                    </div>

                    <p className="text-xs mt-2 text-[#9a9388]">
                      {stat.sub}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* CHART */}

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
              <div className="bg-[#fbf9f7] border rounded-2xl p-6">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Financial
                      Performance
                    </h3>

                    <p className="text-sm text-[#9a9388]">
                      Revenue Analytics
                    </p>
                  </div>

                  <div className="flex bg-[#f0ebe1] rounded-lg p-1">
                    {[
                      "Weekly",
                      "Monthly",
                      "Annual",
                    ].map((tab) => (
                      <button
                        key={tab}
                        onClick={() =>
                          setChartTab(
                            tab
                          )
                        }
                        className={`px-3 py-1 rounded-md ${
                          chartTab ===
                          tab
                            ? "bg-[#8b6b08] text-white"
                            : ""
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart
                      data={
                        chartData
                      }
                    >
                      <defs>
                        <linearGradient
                          id="goldGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b6b08"
                            stopOpacity={
                              0.3
                            }
                          />

                          <stop
                            offset="95%"
                            stopColor="#8b6b08"
                            stopOpacity={
                              0
                            }
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="month" />

                      <YAxis />

                      <Tooltip
                        content={
                          <CustomTooltip />
                        }
                      />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8b6b08"
                        fill="url(#goldGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* MARKET */}

              <div className="bg-[#fbf9f7] border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <RiPieChartLine
                    size={20}
                    className="text-[#8b6b08]"
                  />

                  <h3 className="text-xl font-semibold">
                    Market
                    Distribution
                  </h3>
                </div>

                <div className="space-y-5">
                  {marketData.map(
                    (item, i) => (
                      <div
                        key={i}
                      >
                        <div className="flex justify-between mb-2">
                          <span>
                            {
                              item.label
                            }
                          </span>

                          <span>
                            {
                              item.pct
                            }
                            %
                          </span>
                        </div>

                        <div className="w-full h-2 bg-[#e5dfd7] rounded-full">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.pct}%`,
                              backgroundColor:
                                item.color,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* RECENT ORDERS */}

            <div className="bg-[#fbf9f7] rounded-xl shadow p-6">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Recent Orders
                  </h2>

                  <p className="text-sm text-[#9a9388]">
                    Latest customer
                    transactions
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[#8b6b08] border-b">
                      <th className="py-3">
                        Order ID
                      </th>

                      <th>
                        Customer
                      </th>

                      <th>Amount</th>

                      <th>Status</th>

                      <th>Payment</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map(
                      (
                        order,
                        i
                      ) => (
                        <tr
                          key={i}
                          className="border-b"
                        >
                          <td className="py-4">
                            #
                            {order._id?.slice(
                              -5
                            )}
                          </td>

                          <td>
                            {order
                              ?.shippingAddress
                              ?.fullName ||
                              "Customer"}
                          </td>

                          <td>
                            ₹
                            {
                              order.totalAmount
                            }
                          </td>

                          <td>
                            <span
                              className={`px-2 py-1 rounded-lg text-xs ${
                                order.orderStatus ===
                                "Delivered"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {
                                order.orderStatus
                              }
                            </span>
                          </td>

                          <td>
                            {order.paymentMethod ||
                              "COD"}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BOTTOM STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {statsBelow.map(
                (stat, i) => (
                  <div
                    key={i}
                    className="bg-[#fbf9f7] border rounded-2xl p-5"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-10 h-10 bg-[#f0ebe1] rounded-xl flex items-center justify-center">
                        {stat.icon}
                      </div>

                      <div>
                        <p className="text-lg font-semibold">
                          {
                            stat.value
                          }
                        </p>

                        <p className="text-sm uppercase tracking-[1px] text-[#9a9388]">
                          {
                            stat.label
                          }
                        </p>

                        <p className="text-xs text-[#9a9388]">
                          {stat.sub}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </main>
        )}

        {/* OTHER PAGES */}

        {active ===
          "inventory" && (
          <Inventory
            setShowProduct={
              setShowProduct
            }
            setEditProduct={
              setEditProduct
            }
          />
        )}

        {showProduct && (
          <AddProduct
            setShowProduct={
              setShowProduct
            }
            editProduct={
              editProduct
            }
            setEditProduct={
              setEditProduct
            }
          />
        )}

        {active ===
          "collections" && (
          <Collections />
        )}

        {active ===
          "coupons" && (
          <Coupons />
        )}

        {active ===
          "settings" && (
          <Settings />
        )}

        {active ===
          "orders" && (
          <Orders />
        )}

        {active ===
          "transactions" && (
          <Transactions />
        )}

        {active === "seo" && (
          <Seo />
        )}

        {active ===
          "customers" && (
          <Customer />
        )}

        {active ===
          "notifications" && (
          <Notifications />
        )}
      </div>

      {showLogoutModal && (
        <Logout
          setShowLogoutModal={
            setShowLogoutModal
          }
        />
      )}
    </div>
  );
}