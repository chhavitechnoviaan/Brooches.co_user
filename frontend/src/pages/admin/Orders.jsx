import React, { useEffect, useState } from "react";
import {
  FiSearch, FiShoppingCart, FiPackage, FiTruck, FiCheckCircle,
  FiRotateCcw, FiX, FiChevronRight, FiDownload, FiFilter,
  FiAlertCircle, FiClock, FiStar, FiDollarSign, FiUser,
  FiMapPin, FiPhone, FiMail, FiCalendar, FiEye,
} from "react-icons/fi";
import { BsGem } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";
import axios from "axios";
import {
  getAllOrdersAPI,
  updateOrderStatusAPI,
  getOrderStatsAPI
} from "../../services/orderService";
import generateInvoice from "../../utils/generateInvoice";
const tabs = [
  { label: "All Orders", key: "all", icon: <FiShoppingCart size={13} /> },
  { label: "Processing", key: "Processing", icon: <FiClock size={13} /> },
  { label: "Shipped", key: "Shipped", icon: <MdOutlineLocalShipping size={13} /> },
  { label: "Delivered", key: "Delivered", icon: <FiCheckCircle size={13} /> },
  { label: "Returned", key: "Returned", icon: <FiRotateCcw size={13} /> },
];

const statusStyle = {
  Processing: "bg-[#fef3c7] text-[#8b6b08] border border-[#e0d9d0]",
  Shipped: "bg-[#dbeafe] text-[#1d4ed8] border border-[#bfdbfe]",
  Delivered: "bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]",
  Returned: "bg-[#fee2e2] text-[#dc2626] border border-[#fecaca]",
};

const statusIcon = {
  Processing: <FiClock size={11} />,
  Shipped: <MdOutlineLocalShipping size={11} />,
  Delivered: <FiCheckCircle size={11} />,
  Returned: <FiRotateCcw size={11} />,
};



export default function OrderManagement() {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] =
    useState(false);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const data = await getAllOrdersAPI();

      // setAllOrders(data);
      setAllOrders(data.orders);
      const statsData =
        await getOrderStatsAPI();

      setStats(statsData);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };
  // const filtered = allOrders.filter((o) => {
  const filtered = (allOrders || []).filter((o) => {
    const matchTab =
      activeTab === "all" ||
      o.orderStatus === activeTab;

    const customerName =
      o.shippingAddress?.fullName || "";

    const orderId =
      o._id || "";

    const matchSearch =
      customerName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      orderId
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchTab && matchSearch;
  });
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3]" style={{ fontFamily: "Montserrat, sans-serif" }}>

      <div className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-10 py-4 sticky top-0 z-20">
        <div className="max-w-[1300px] mx-auto flex items-center gap-4">

          <div className="flex-1 flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2.5 rounded-xl">
            <FiSearch className="text-[#9a9388] text-xs sm:text-sm flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders, clients, or assets..."
              className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-sm text-black placeholder:text-[#9a9388]"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-3 py-2.5 rounded-xl text-[11px] text-black hover:border-[#8b6b08] transition flex-shrink-0">
            <FiFilter size={13} className="text-[#8b6b08]" />
            <span className="hidden sm:inline text-xs sm:text-sm">Filter</span>
          </button>
          <button className="flex items-center gap-2 bg-[#8b6b08] text-white px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[1px] hover:bg-[#a07c10] transition flex-shrink-0">
            <FiDownload size={13} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-6">

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-[36px] text-black leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Order Management
          </h1>
          <p className="text-sm font-medium text-[#9a9388] mt-1 max-w-[420px]">
            Track and manage luxury order fulfillment with precision across your global inventory.
          </p>
        </div>

        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium uppercase tracking-[1.5px] text-[#9a9388]">{s.label}</p>
                <div className="w-8 h-8 bg-[#f0ebe1] rounded-lg flex items-center justify-center">{s.icon}</div>
              </div>
              <p className="text-2xl sm:text-[28px] font-bold text-black mb-1" style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.value}</p>
              <p className="text-sm font-medium" style={{ color: s.subColor }}>{s.sub}</p>
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

          <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium uppercase tracking-[1.5px] text-[#9a9388]">
                TOTAL ORDERS
              </p>

              <div className="w-8 h-8 bg-[#f0ebe1] rounded-lg flex items-center justify-center">
                <FiShoppingCart size={18} className="text-[#8b6b08]" />
              </div>
            </div>

            <p className="text-2xl sm:text-[28px] font-bold text-black">
              {stats?.totalOrders || 0}
            </p>
          </div>

          <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium uppercase tracking-[1.5px] text-[#9a9388]">
                PENDING
              </p>

              <div className="w-8 h-8 bg-[#f0ebe1] rounded-lg flex items-center justify-center">
                <FiPackage size={18} className="text-[#8b6b08]" />
              </div>
            </div>

            <p className="text-2xl sm:text-[28px] font-bold text-black">
              {stats?.processingOrders || 0}
            </p>
          </div>

          <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium uppercase tracking-[1.5px] text-[#9a9388]">
                DELIVERED
              </p>

              <div className="w-8 h-8 bg-[#f0ebe1] rounded-lg flex items-center justify-center">
                <FiCheckCircle size={18} className="text-[#8b6b08]" />
              </div>
            </div>

            <p className="text-2xl sm:text-[28px] font-bold text-black">
              {stats?.deliveredOrders || 0}
            </p>
          </div>

          <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium uppercase tracking-[1.5px] text-[#9a9388]">
                REVENUE
              </p>

              <div className="w-8 h-8 bg-[#f0ebe1] rounded-lg flex items-center justify-center">
                <FiDollarSign size={18} className="text-[#8b6b08]" />
              </div>
            </div>

            <p className="text-2xl sm:text-[28px] font-bold text-black">
              ₹{stats?.totalRevenue || 0}
            </p>
          </div>

        </div>
        <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden">

          <div className="border-b border-[#e5dfd7] overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => {
                const count = tab.key === "all" ? allOrders.length : allOrders.filter(o => o.orderStatus === tab.key).length;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center  gap-2 px-4 sm:px-6 py-4 text-[11px] sm:text-[12px] uppercase tracking-[1px] transition border-b-2 whitespace-nowrap ${activeTab === tab.key
                      ? "border-[#8b6b08] text-[#8b6b08] bg-[#f8f3ea]"
                      : "border-transparent text-[#9a9388] hover:text-black"
                      }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-[#8b6b08] text-white" : "bg-[#e5dfd7] text-[#9a9388]"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0ebe1] border-b border-[#e5dfd7]">
                  {["Order ID", "Customer", "Amount", "Method", "Date", "Status", ""].map((h, i) => (
                    <th key={i} className="text-left px-4 sm:px-6 py-3 text-sm font-medium uppercase tracking-[2px] text-[#8b6b08]  whitespace-nowrap">{h}</th>
                  ))}

                </tr>
              </thead>
              {/* <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-[#9a9388] text-[13px]">
                        <FiAlertCircle size={32} className="mx-auto mb-3 text-[#d0c9c0]" />
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((order, i) => (
                      <tr
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                        className={`border-b border-[#f0ebe1] cursor-pointer hover:bg-[#f8f3ea] transition ${selectedOrder?.id === order.id ? "bg-[#f8f3ea]" : i % 2 === 0 ? "bg-[#fbf9f7]" : "bg-[#f8f6f3]"}`}
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-[12px] font-semibold text-[#8b6b08]">{order.id}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#8b6b08] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                              {order.shippingAddress?.fullName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="text-[12px] font-semibold text-black">{order.shippingAddress?.fullName}</p>
                              <p className="text-[9px] uppercase tracking-[1px]" style={{ color: order.tierColor }}>
                                ● {order.tier}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-[13px] font-semibold text-black">{order.totalAmount}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap  table-cell">
                          <span className="text-[11px] text-[#9a9388]">{order.method}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap table-cell">
                          <span className="text-[11px] text-[#9a9388]">new Date(order.createdAt).toLocaleDateString()</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-semibold ${statusStyle[order.orderStatus]}`}>
                            {statusIcon[order.orderStatus]}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <FiChevronRight size={14} className="text-[#9a9388]" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody> */}
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-16 text-[#9a9388] text-[13px]"
                    >
                      <FiAlertCircle
                        size={32}
                        className="mx-auto mb-3 text-[#d0c9c0]"
                      />
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filtered.map((order, i) => (
                    <tr
                      key={order._id}
                      onClick={() => setSelectedOrder(order)}
                      className={`border-b border-[#f0ebe1] cursor-pointer hover:bg-[#f8f3ea] transition ${selectedOrder?._id === order._id
                        ? "bg-[#f8f3ea]"
                        : i % 2 === 0
                          ? "bg-[#fbf9f7]"
                          : "bg-[#f8f6f3]"
                        }`}
                    >

                      {/* ORDER ID */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-[12px] font-semibold text-[#8b6b08]">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#8b6b08] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                            {order.shippingAddress?.fullName
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>

                          <div>
                            <p className="text-[12px] font-semibold text-black">
                              {order.shippingAddress?.fullName}
                            </p>

                            <p className="text-[10px] text-[#9a9388]">
                              {order.shippingAddress?.city}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* TOTAL */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-[13px] font-semibold text-black">
                          ₹{order.totalAmount}
                        </span>
                      </td>

                      {/* PAYMENT */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-[11px] text-[#9a9388]">
                          {order.paymentMethod}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-[11px] text-[#9a9388]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-semibold ${statusStyle[order.orderStatus]
                            }`}
                        >
                          {statusIcon[order.orderStatus]}

                          {order.orderStatus}
                        </span>
                      </td>

                      {/* ICON */}
                      <td className="px-4 sm:px-6 py-4">
                        <FiChevronRight
                          size={14}
                          className="text-[#9a9388]"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-start sm:justify-end" onClick={() => setSelectedOrder(null)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-[#fbf9f7] w-full sm:w-[400px] lg:w-[420px] h-[90vh] sm:h-full overflow-y-auto border-l border-[#e5dfd7] shadow-2xl rounded-t-2xl sm:rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#fbf9f7] border-b border-[#e5dfd7] px-5 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-[18px] font-semibold text-black" style={{ fontFamily: "Cormorant Garamond, serif" }}>Order Details</h3>
                <p className="text-[10px] text-[#8b6b08] uppercase tracking-[1.5px]">#{selectedOrder._id.slice(-6).toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 bg-[#f0ebe1] rounded-full flex items-center justify-center hover:bg-[#e5dfd7] transition">
                <FiX size={14} className="text-black" />
              </button>
            </div>

            <div className="p-5 space-y-5">

              <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#8b6b08] flex items-center justify-center text-white font-bold">
                    {/* {selectedOrder.initials} */}
                    {selectedOrder.shippingAddress?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-black">{selectedOrder.shippingAddress?.fullName}</p>
                    <p className="text-[11px] text-[#9a9388]">{selectedOrder.shippingAddress?.city}</p>
                    <span className="inline-block mt-1 text-[9px] uppercase tracking-[1.5px] bg-[#8b6b08] text-white px-2 py-0.5 rounded-full">
                      {selectedOrder.tier}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#e0d9d0]">
                  <div>
                    <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Lifetime Value</p>
                    <p className="text-[15px] font-bold text-[#8b6b08]">{selectedOrder.lifetime}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Order Frequency</p>
                    <p className="text-[13px] font-semibold text-black">{selectedOrder.frequency}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* {[
                    { icon: <FiCalendar size={13} />, label: "Order Date", val: selectedOrder.date },
                    { icon: <FiDollarSign size={13} />, label: "Payment", val: selectedOrder.method },
                    { icon: <MdOutlineLocalShipping size={13} />, label: "Status", val: selectedOrder.status },
                    { icon: <FiMapPin size={13} />, label: "Location", val: selectedOrder.city },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1 text-[#8b6b08]">{item.icon}<span className="text-[9px] uppercase tracking-[1px] text-[#9a9388]">{item.label}</span></div>
                      <p className="text-[12px] font-semibold text-black">{item.val}</p>
                    </div>
                  ))} */}
                {/* {[
  { icon: <FiCalendar size={13} />, label: "Order Date", val: selectedOrder.date },
  { icon: <FiDollarSign size={13} />, label: "Payment", val: selectedOrder.method },
  { icon: <MdOutlineLocalShipping size={13} />, label: "Status", val: selectedOrder.status },
  { icon: <FiMapPin size={13} />, label: "Location", val: selectedOrder.city },
].map((item, i) => (
  <div key={i} className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
    <div className="flex items-center gap-1.5 mb-1 text-[#8b6b08]">
      {item.icon}
      <span className="text-[9px] uppercase tracking-[1px] text-[#9a9388]">
        {item.label}
      </span>
    </div>

    <p className="text-[12px] font-semibold text-black">
      {item.val}
    </p>
  </div> */}
                <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2 text-[#8b6b08]">
                    <FiCalendar size={13} />

                    <span className="text-[9px] uppercase tracking-[1px] text-[#9a9388]">
                      Order Date
                    </span>
                  </div>

                  <p className="text-[12px] font-semibold text-black">
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2 text-[#8b6b08]">
                    <FiDollarSign size={13} />

                    <span className="text-[9px] uppercase tracking-[1px] text-[#9a9388]">
                      Payment
                    </span>
                  </div>

                  <p className="text-[12px] font-semibold text-black">
                    {selectedOrder.paymentMethod}
                  </p>
                </div>

                <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3 col-span-2">
                  <div className="flex items-center gap-1.5 mb-2 text-[#8b6b08]">
                    <MdOutlineLocalShipping size={13} />

                    <span className="text-[9px] uppercase tracking-[1px] text-[#9a9388]">
                      Update Status
                    </span>
                  </div>

                  <select
                    value={selectedOrder.orderStatus}
                    onChange={async (e) => {

                      const updated = await updateOrderStatusAPI(
                        selectedOrder._id,
                        e.target.value
                      );

                      setSelectedOrder(updated);

                      fetchOrders();
                    }}
                    className="w-full h-[45px] border border-[#d6d0c7] rounded-xl px-3 bg-white outline-none text-sm"
                  >
                    <option value="Processing">Processing</option>

                    <option value="Shipped">Shipped</option>

                    <option value="Delivered">Delivered</option>

                    <option value="Returned">Returned</option>
                  </select>
                </div>

                <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2 text-[#8b6b08]">
                    <FiMapPin size={13} />

                    <span className="text-[9px] uppercase tracking-[1px] text-[#9a9388]">
                      Location
                    </span>
                  </div>

                  <p className="text-[12px] font-semibold text-black">
                    {selectedOrder.shippingAddress?.city}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[2px] text-[#9a9388] font-semibold mb-3">Item Breakdown</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                      <div className="w-10 h-10 bg-[#e0d9d0] rounded-lg flex items-center justify-center flex-shrink-0">
                        <BsGem size={16} className="text-[#8b6b08]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-black truncate">{item.name}</p>
                        <p className="text-[10px] text-[#9a9388]">{item.detail}</p>
                        <p className="text-[10px] text-[#8b6b08]">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-[12px] font-semibold text-black flex-shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#9a9388]">Subtotal</span>
                  <span className="text-black">{selectedOrder.subtotal}</span>
                </div>
                {/* <div className="flex justify-between text-[12px]">
                    <span className="text-[#9a9388]">{selectedOrder.delivery}</span>
                    <span className={selectedOrder.deliveryCost === "FREE" ? "text-[#166534] font-semibold" : "text-black"}>{selectedOrder.deliveryCost}</span>
                  </div> */}
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#9a9388]">
                    Shipping
                  </span>

                  <span className="text-black">
                    ₹{selectedOrder.shipping}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#e0d9d0]">
                  <span className="text-[16px] font-semibold text-black" style={{ fontFamily: "Cormorant Garamond, serif" }}>Total</span>
                  <span className="text-[16px] font-bold text-[#8b6b08]">₹{selectedOrder.totalAmount}</span>
                </div>
              </div>

              <div className="space-y-2">
                {/* <button className="w-full h-[48px] bg-[#8b6b08] text-white text-[12px] uppercase tracking-[2px] font-semibold rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2">
                  <FiDownload size={14} />
                  Generate Invoice
                </button> */}
                <button
                  onClick={() =>
                    generateInvoice(selectedOrder)
                  }
                >
                  Generate Invoice
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {/* <button className="h-[40px] border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition flex items-center justify-center gap-1.5">
                    <FiEye size={12} />
                    Track Order
                  </button> */}
                  <button className="h-[40px] border border-[#c5bfb8] bg-[#f8f3ea] text-[#8b6b08] text-[11px] uppercase tracking-[1px] rounded-xl flex items-center justify-center gap-1.5 font-semibold">
                    <FiEye size={12} />

                    {selectedOrder.trackingNumber || "Not Assigned"}
                  </button>
                  {/* <button className="h-[40px] border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition flex items-center justify-center gap-1.5">
                    <FiMail size={12} />
                    Contact
                  </button> */}

                  {/* <a
                    href={`tel:${selectedOrder.shippingAddress?.mobile}`}
                    className="h-[40px] border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition flex items-center justify-center gap-1.5"
                  >
                    <FiPhone size={12} />

                    {selectedOrder.shippingAddress?.mobile}
                  </a>

                  <a
                    href={`mailto:${selectedOrder.shippingAddress?.email}`}
                    className="h-[40px] border border-[#c5bfb8] text-black text-[11px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition flex items-center justify-center gap-1.5 px-2"
                  >
                    <FiMail size={12} />

                    <span className="truncate">
                      {selectedOrder.shippingAddress?.email}
                    </span>
                  </a> */}
                  <button
  onClick={() =>
    setShowContact(!showContact)
  }
  className="h-[40px] border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition flex items-center justify-center gap-1.5 relative"
>
  <FiMail size={12} />
  Contact

  {showContact && (
    <div className="absolute bottom-[48px] right-0 w-[260px] bg-white border border-[#e5dfd7] shadow-2xl rounded-2xl p-4 z-50">
      
      <div className="space-y-3">

        <a
          href={`tel:${selectedOrder.shippingAddress?.mobile}`}
          className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f6f3] hover:bg-[#f0ebe1] transition"
        >
          <div className="w-9 h-9 rounded-full bg-[#8b6b08] text-white flex items-center justify-center">
            <FiPhone size={14} />
          </div>

          <div className="text-left">
            <p className="text-[10px] text-[#9a9388] uppercase">
              Phone
            </p>

            <p className="text-[12px] text-black font-medium normal-case tracking-normal">
              {selectedOrder.shippingAddress?.mobile}
            </p>
          </div>
        </a>

        <a
          href={`mailto:${selectedOrder.shippingAddress?.email}`}
          className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f6f3] hover:bg-[#f0ebe1] transition"
        >
          <div className="w-9 h-9 rounded-full bg-[#8b6b08] text-white flex items-center justify-center">
            <FiMail size={14} />
          </div>

          <div className="text-left min-w-0">
            <p className="text-[10px] text-[#9a9388] uppercase">
              Email
            </p>

            <p className="text-[12px] text-black font-medium normal-case tracking-normal truncate">
              {selectedOrder.shippingAddress?.email}
            </p>
          </div>
        </a>

      </div>
    </div>
  )}
</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}