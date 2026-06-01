import React, {
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  FiSearch, FiFilter, FiDownload, FiX, FiChevronRight,
  FiUser, FiMail, FiPhone, FiMapPin, FiShoppingBag,
  FiDollarSign, FiCalendar, FiStar, FiAlertCircle,
  FiCheckCircle, FiClock, FiEye, FiMessageSquare,
  FiTrendingUp, FiUsers, FiUserPlus, FiRepeat,
  FiChevronDown, FiPackage, FiGift, FiTag,
} from "react-icons/fi";
import { BsGem } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import {
  getAllCustomersAPI,
  getCustomerStatsAPI,
} from "../../services/api";
import { useNavigate } from "react-router-dom";
const loyaltyStyle = {

  New:
    "bg-[#dbeafe] text-[#1d4ed8] border border-[#bfdbfe]",

  "VIP ELITE":
    "bg-[#fef3c7] text-[#8b6b08] border border-[#e0d9d0]",

  "VIP GOLD":
    "bg-[#f0ebe1] text-[#8b6b08] border border-[#e0d9d0]",

  Regular:
    "bg-[#f0f0f0] text-[#6b7280] border border-[#e5e7eb]",
};

const dateRanges = ["Last 7 Days", "Last 30 Days", "Last 6 Months", "Last 1 Year", "All Customers"];

const filterTypes = ["All", "New Customers", "VIP Customers", "Inactive Customers", "High Spending Customers"];


function formatAmount(n) {

  if (!n) return "₹0";

  return `₹${n.toLocaleString("en-IN")}`;
}

export default function Customer() {
  const [customers, setCustomers] =
    useState([]);
const navigate = useNavigate();
  const [statsData, setStatsData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [dateRange, setDateRange] = useState("All Customers");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDateDrop, setShowDateDrop] = useState(false);
  useEffect(() => {

    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {

    try {

      setLoading(true);

      const customerData =
        await getAllCustomersAPI();

      const stats =
        await getCustomerStatsAPI();

      setCustomers(customerData);

      setStatsData([
        {
          label: "Total Customers",
          value: stats.totalCustomers,
          sub: "All time",
          icon: <FiUsers size={18} className="text-[#8b6b08]" />,
        },

        {
          label: "New This Month",
          value: stats.newCustomers,
          sub: "Recently joined",
          icon: <FiUserPlus size={18} className="text-[#8b6b08]" />,
        },

        {
          label: "VIP Members",
          value: stats.vipMembers,
          sub: "Gold + Elite",
          icon: <FiStar size={18} className="text-[#8b6b08]" />,
        },

        {
          label: "Inactive Clients",
          value: stats.inactiveClients,
          sub: "Need re-engagement",
          icon: <FiAlertCircle size={18} className="text-[#8b6b08]" />,
        },
      ]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };
  // const filtered = useMemo(() => {
  //   return customers.filter((c) => {
  //     const q = search.toLowerCase();
  //     const matchSearch =
  //       c.name.toLowerCase().includes(q) ||
  //       c.email.toLowerCase().includes(q) ||
  //       c.phone.includes(q) ||
  //       c.orderId.toLowerCase().includes(q);

  //     let matchFilter = true;
  //     if (activeFilter === "New Customers") matchFilter = c.tags.includes("New");
  //     if (activeFilter === "VIP Customers") matchFilter = c.loyalty !== "Regular";
  //     if (activeFilter === "Inactive Customers") matchFilter = c.status === "Inactive";
  //     if (activeFilter === "High Spending Customers") matchFilter = c.spent >= 200000;

  //     return matchSearch && matchFilter;
  //   });
  // }, [search, activeFilter, dateRange]);

  const filtered = useMemo(() => {

    return customers.filter((c) => {

      const q = search?.toLowerCase() || "";

      const matchSearch =
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q) ||
        c.orderId?.toLowerCase().includes(q);

      // DEFAULT ALL CUSTOMERS
      if (activeFilter === "All") {
        return matchSearch;
      }

      // FILTERS
      if (
        activeFilter === "New Customers"
      ) {
        return (
          matchSearch &&
          c.tags?.includes("New")
        );
      }

      if (
        activeFilter === "VIP Customers"
      ) {
        return (
          matchSearch &&
          c.loyalty !== "Regular"
        );
      }

      if (
        activeFilter === "Inactive Customers"
      ) {
        return (
          matchSearch &&
          c.status === "Inactive"
        );
      }

      if (
        activeFilter ===
        "High Spending Customers"
      ) {
        return (
          matchSearch &&
          c.spent >= 200000
        );
      }

      return matchSearch;

    });

  }, [customers, search, activeFilter]);

  const inputCls = "w-full bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl px-4 py-2.5 text-[12px] text-black placeholder:text-[#9a9388] outline-none focus:border-[#8b6b08] transition";
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#f8f6f3]" style={{ fontFamily: "Montserrat, sans-serif" }}>

      <div className="bg-[#fbf9f7] border-b border-[#e5dfd7] px-4 sm:px-6 lg:px-10 py-4 sticky top-0 z-20">
        <div className="max-w-[1300px] mx-auto flex items-center gap-3">

          <div className="flex-1 flex items-center gap-2 bg-[#f0ebe1] border border-[#e0d9d0] px-4 py-2.5 rounded-xl">
            <FiSearch size={14} className="text-[#9a9388] flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, order ID..."
              className="flex-1 bg-transparent outline-none text-[12px] placeholder:text-sm text-black placeholder:text-[#9a9388]"
            />
            {search && <button onClick={() => setSearch("")}><FiX size={13} className="text-[#9a9388] hover:text-black" /></button>}
          </div>
          <button className="flex items-center gap-1.5 bg-[#8b6b08] text-white px-4 py-2.5 rounded-xl text-[11px] uppercase tracking-[1px] hover:bg-[#a07c10] transition flex-shrink-0">
            <FiDownload size={13} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10 py-6 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-[36px] text-black leading-tight" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Customers
            </h1>
            <p className="text-sm font-medium text-[#9a9388] mt-1">Manage and analyse your luxury clientele with full precision.</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDateDrop(!showDateDrop)}
              className="flex items-center gap-2 bg-[#fbf9f7] border border-[#e0d9d0] px-4 py-2.5 rounded-xl text-[12px] text-black hover:border-[#8b6b08] transition"
            >
              <FiCalendar size={13} className="text-[#8b6b08]" />
              {dateRange}
              <FiChevronDown size={13} className="text-[#9a9388]" />
            </button>
            {showDateDrop && (
              <div className="absolute right-0 top-full mt-2 bg-[#fbf9f7] border border-[#e5dfd7] rounded-xl shadow-lg z-30 min-w-[180px] overflow-hidden">
                {dateRanges.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDateRange(d); setShowDateDrop(false); }}
                    className={`w-full text-left px-4 py-3 text-[12px] hover:bg-[#f0ebe1] transition ${dateRange === d ? "text-[#8b6b08] font-semibold" : "text-black"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statsData.map((s, i) => (
            <div key={i} className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm sm:text-sm lg:text-base uppercase tracking-[1.5px] text-[#9a9388] leading-tight">{s.label}</p>
                <div className="w-8 h-8 bg-[#f0ebe1] rounded-lg flex items-center justify-center flex-shrink-0">{s.icon}</div>
              </div>
              <p className="text-2xl sm:text-[28px] font-bold text-black mb-1" style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.value}</p>
              <p className="text-xs sm:text-sm text-[#8b6b08]">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
            {filterTypes.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[1px] transition whitespace-nowrap border ${activeFilter === f
                  ? "bg-[#8b6b08] text-white border-[#8b6b08]"
                  : "bg-[#fbf9f7] text-[#4a4540] border-[#e0d9d0] hover:border-[#8b6b08] hover:text-[#8b6b08]"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#e5dfd7] flex items-center justify-between">
            <p className="text-[12px] text-[#9a9388]">
              Showing <span className="text-[#8b6b08] font-semibold">{filtered.length}</span> customers
            </p>
            <div className="flex items-center gap-2">
              <FiFilter size={13} className="text-[#9a9388]" />
              <span className="text-[11px] text-[#9a9388]">{dateRange}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0ebe1] border-b border-[#e5dfd7]">
                  {["Customer", "Contact", "Orders", "Total Spent", "Last Order", "Since", "Loyalty", "Status", ""].map((h, i) => (
                    <th key={i} className="text-sm font-medium text-left px-4 sm:px-5 py-3 text-[9px]  uppercase tracking-[2px] text-[#8b6b08]  whitespace-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-[#9a9388]">
                      <FiUsers size={36} className="mx-auto mb-3 text-[#d0c9c0]" />
                      <p className="text-[13px]">No customers found</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((c, i) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCustomer(c)}
                      className={`border-b border-[#f0ebe1] cursor-pointer hover:bg-[#f8f3ea] transition ${selectedCustomer?.id === c.id ? "bg-[#f8f3ea]" : i % 2 === 0 ? "bg-[#fbf9f7]" : "bg-[#f8f6f3]"}`}
                    >
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#8b6b08] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                            {c.name.split(" ").map(w => w[0]).join("")}
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-black">{c.name}</p>
                            <p className="text-[10px] text-[#9a9388]">{c.id}</p>
                          </div>
                        </div>

                      </td>
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap :table-cell">
                        <p className="text-[11px] text-black">{c.email}</p>
                        <p className="text-[10px] text-[#9a9388]">{c.phone}</p>
                      </td>
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                        <span className="text-[13px] font-semibold text-black">{c.orders}</span>
                      </td>
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                        <span className="text-[12px] font-semibold text-[#8b6b08]">{formatAmount(c.spent)}</span>
                      </td>
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap table-cell">
                        <span className="text-[11px] text-[#9a9388]">{c.lastOrder}</span>
                      </td>
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap table-cell">
                        <span className="text-[11px] text-[#9a9388]">{c.since}</span>
                      </td>
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[0.5px] font-semibold ${loyaltyStyle[c.loyalty]}`}>
                          {/* {c.loyalty !== "Regular" && <FiStar size={9} />} */}
                          {c.loyalty.includes("VIP") && (
                            <FiStar size={9} />
                          )}
                          {c.loyalty}
                        </span>
                      </td>
                      <td className="px-4 sm:px-5 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-semibold ${c.status === "Active" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#dc2626]"}`}>
                          {c.status === "Active" ? <FiCheckCircle size={9} /> : <FiAlertCircle size={9} />}
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-5 py-4">
                        <FiChevronRight size={14} className="text-[#9a9388]" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-start sm:justify-end" onClick={() => setSelectedCustomer(null)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-[#fbf9f7] w-full sm:w-[400px] lg:w-[420px] h-[92vh] sm:h-full overflow-y-auto border-l border-[#e5dfd7] shadow-2xl rounded-t-2xl sm:rounded-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#fbf9f7] border-b border-[#e5dfd7] px-5 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-[18px] font-semibold text-black" style={{ fontFamily: "Cormorant Garamond, serif" }}>Customer Profile</h3>
                <p className="text-[10px] text-[#8b6b08] uppercase tracking-[1.5px]">{selectedCustomer.id}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="w-8 h-8 bg-[#f0ebe1] rounded-full flex items-center justify-center hover:bg-[#e5dfd7] transition">
                <FiX size={14} className="text-black" />
              </button>
            </div>

            <div className="p-5 space-y-5">

              <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-full bg-[#8b6b08] flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0">
                    {selectedCustomer.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-semibold text-black">{selectedCustomer.name}</p>
                    <p className="text-[11px] text-[#9a9388]">{selectedCustomer.address}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.5px] font-semibold ${loyaltyStyle[selectedCustomer.loyalty]}`}>
                        {selectedCustomer.loyalty !== "Regular" && <FiStar size={9} />}
                        {selectedCustomer.loyalty}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold ${selectedCustomer.status === "Active" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#dc2626]"}`}>
                        {selectedCustomer.status === "Active" ? <FiCheckCircle size={9} /> : <FiAlertCircle size={9} />}
                        {selectedCustomer.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#e0d9d0]">
                  <div>
                    <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Total Spent</p>
                    <p className="text-[16px] font-bold text-[#8b6b08]">{formatAmount(selectedCustomer.spent)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[1.5px] text-[#9a9388] mb-1">Customer Since</p>
                    <p className="text-[13px] font-semibold text-black">{selectedCustomer.since}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <FiShoppingBag size={13} />, label: "Total Orders", val: `${selectedCustomer.orders} Orders` },
                  { icon: <FiCalendar size={13} />, label: "Last Order", val: selectedCustomer.lastOrder },
                  { icon: <FiRepeat size={13} />, label: "Refunds", val: `${selectedCustomer.refunds} Refunds` },
                  { icon: <FiTag size={13} />, label: "Last Order ID", val: selectedCustomer.orderId },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1 text-[#8b6b08]">{item.icon}<span className="text-[9px] uppercase tracking-[1px] text-[#9a9388]">{item.label}</span></div>
                    <p className="text-[12px] font-semibold text-black">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-4 space-y-2">
                <p className="text-[9px] uppercase tracking-[2px] text-[#9a9388] font-semibold mb-3">Contact Details</p>
                {[
                  { icon: <FiMail size={13} />, val: selectedCustomer.email },
                  { icon: <FiPhone size={13} />, val: selectedCustomer.phone },
                  { icon: <FiMapPin size={13} />, val: selectedCustomer.address },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[#8b6b08]">{item.icon}</span>
                    <span className="text-[12px] text-black">{item.val}</span>
                  </div>
                ))}
              </div>

              {selectedCustomer.coupons.length > 0 && (
                <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-4">
                  <p className="text-[9px] uppercase tracking-[2px] text-[#9a9388] font-semibold mb-3">Coupons Used</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.coupons.map((c, i) => (
                      <span key={i} className="flex items-center gap-1 bg-[#fbf9f7] border border-[#8b6b08]/30 text-[#8b6b08] text-[10px] px-3 py-1 rounded-full">
                        <MdOutlineLocalOffer size={10} /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {/* <button className="w-full h-[46px] bg-[#8b6b08] text-white text-[12px] uppercase tracking-[2px] font-semibold rounded-xl hover:bg-[#a07c10] transition flex items-center justify-center gap-2">
                  <FiEye size={14} />
                  View Order History
                </button> */}
                <button
                  onClick={() =>
                    navigate(
                      `/admin/customer-orders/${selectedCustomer.id}`
                    )
                  }
                  className="w-full h-[48px] bg-[#8b6b08] text-white rounded-xl"
                >
                  VIEW ORDER HISTORY
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button className="h-[40px] border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition flex items-center justify-center gap-1.5">
                    <FiMessageSquare size={12} />
                    Message
                  </button>
                  <button className="h-[40px] border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1px] rounded-xl hover:border-[#8b6b08] hover:text-[#8b6b08] transition flex items-center justify-center gap-1.5">
                    <FiGift size={12} />
                    Send Offer
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