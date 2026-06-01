import React, { useState, useEffect } from "react";
import {
  FiRepeat,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCcw,
  FiDollarSign,
  FiCreditCard,
  FiClock,
  FiFilter,
} from "react-icons/fi";
import {
  getTransactionsAPI,
} from "../../services/transactionApi";


export default function Transactions() {
  const [search, setSearch] = useState("");

const [transactions, setTransactions] =
  useState([]);

const [analytics, setAnalytics] =
  useState({});

const [loading, setLoading] =
  useState(true);

  const fetchTransactions =
  async () => {

    try {

      setLoading(true);

      const data =
        await getTransactionsAPI();

      setTransactions(
        data.transactions
      );

      setAnalytics(
        data.analytics
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

useEffect(() => {

  fetchTransactions();
}, []);
  const filteredTransactions = transactions.filter(
    (item) =>
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(search.toLowerCase())
  );
  if (loading) {

  return (
    <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
      Loading...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-black text-2xl sm:text-3xl font-bold">
              Transactions Management
            </h1>

            <p className="text-[#8b6b08] text-sm sm:text-base mt-2 font-medium">
              Payment history, refunds and failed transactions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-[320px]">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

              <input
                type="text"
                placeholder="Search transaction"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#fbf9f7] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
              />
            </div>

            <button className="bg-[#8b6b08] text-[#f8f6f3] px-5 py-3 rounded-xl font-semibold shadow-[0_0_30px_rgba(139,107,8,0.25)] flex items-center justify-center gap-2">
              <FiFilter />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl p-5 shadow-[0_0_40px_rgba(139,107,8,0.06)]">
            <div className="w-14 h-14 rounded-full bg-[#8b6b08]/10 border border-[#8b6b08]/20 flex items-center justify-center mb-5">
              <FiDollarSign className="text-[#8b6b08] text-2xl" />
            </div>

            <h2 className="text-[#5f5f5f] text-sm font-medium">
              Total Revenue
            </h2>

            <h1 className="text-black text-3xl font-bold mt-2">
           ₹{analytics.totalRevenue || 0}   
            </h1>
          </div>

          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl p-5 shadow-[0_0_40px_rgba(139,107,8,0.06)]">
            <div className="w-14 h-14 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mb-5">
              <FiCheckCircle className="text-green-700 text-2xl" />
            </div>

            <h2 className="text-[#5f5f5f] text-sm font-medium">
              Successful Payments
            </h2>

            <h1 className="text-black text-3xl font-bold mt-2">
           {analytics.successfulPayments || 0}
            </h1>
          </div>

          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl p-5 shadow-[0_0_40px_rgba(139,107,8,0.06)]">
            <div className="w-14 h-14 rounded-full bg-red-100 border border-red-200 flex items-center justify-center mb-5">
              <FiXCircle className="text-red-700 text-2xl" />
            </div>

            <h2 className="text-[#5f5f5f] text-sm font-medium">
              Failed Payments
            </h2>

            <h1 className="text-black text-3xl font-bold mt-2">
              {analytics.failedPayments || 0}
            </h1>
          </div>

          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl p-5 shadow-[0_0_40px_rgba(139,107,8,0.06)]">
            <div className="w-14 h-14 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center mb-5">
              <FiRefreshCcw className="text-yellow-700 text-2xl" />
            </div>

            <h2 className="text-[#5f5f5f] text-sm font-medium">
              Refund Requests
            </h2>

            <h1 className="text-black text-3xl font-bold mt-2">
              {analytics.refundPayments || 0}
            </h1>
          </div>
        </div>

        <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] overflow-hidden">
          <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-[#e4ddd0]">
            <div>
              <h2 className="text-black text-xl sm:text-2xl font-bold">
                Transaction History
              </h2>

              <p className="text-[#8b6b08] text-sm font-medium mt-1">
                Complete payment records and activity
              </p>
            </div>

            <div className="bg-[#8b6b08]/10 text-[#8b6b08] px-4 py-2 rounded-xl font-semibold text-sm">
              {filteredTransactions.length} Records
            </div>
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#e5dfd3]">
                  <th className="text-left px-6 py-4 text-[#8b6b08] text-sm font-semibold">
                    Transaction ID
                  </th>

                  <th className="text-left px-6 py-4 text-[#8b6b08] text-sm font-semibold">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-[#8b6b08] text-sm font-semibold">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4 text-[#8b6b08] text-sm font-semibold">
                    Payment Method
                  </th>

                  <th className="text-left px-6 py-4 text-[#8b6b08] text-sm font-semibold">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-[#8b6b08] text-sm font-semibold">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((item) => (
                  <tr
                    key={item.transactionId}
                    className="border-b border-[#ece6db]"
                  >
                    <td className="px-6 py-5 text-black font-semibold">
                      {item.transactionId}
                    </td>

                    <td className="px-6 py-5 text-[#5f5f5f] font-medium">
                      {item.customer}
                    </td>

                    <td className="px-6 py-5 text-black font-semibold">
                      {item.amount}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[#5f5f5f] font-medium">
                        <FiCreditCard className="text-[#8b6b08]" />
                        {item.paymentMethod}
                      </div>
                    </td>

                    <td className="px-6 py-5">

  {item.paymentStatus === "Paid" && (
    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
      <FiCheckCircle />
      Paid
    </div>
  )}

  {item.paymentStatus === "Pending" && (
    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
      <FiClock />
      Pending
    </div>
  )}

  {item.paymentStatus === "Failed" && (
    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
      <FiXCircle />
      Failed
    </div>
  )}

</td>

                    <td className="px-6 py-5 text-[#5f5f5f] font-medium">
                     {new Date(
  item.createdAt
).toLocaleDateString()} 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
            {filteredTransactions.map((item) => (
              <div
                key={item.transactionId}
                className="bg-[#f8f6f3] border border-[#ddd5c8] rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="text-black text-lg font-bold">
                      {item.transactionId}
                    </h2>

                    <p className="text-[#8b6b08] text-sm font-semibold mt-1">
                      {item.customer}
                    </p>
                  </div>

                  {/* {item.status === "Success" && (
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <FiCheckCircle />
                      Success
                    </div>
                  )}

                  {item.status === "Refund" && (
                    <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <FiRefreshCcw />
                      Refund
                    </div>
                  )}

                  {item.status === "Failed" && (
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <FiXCircle />
                      Failed
                    </div>
                  )} */}
                  {item.paymentStatus ===
  "Paid" && (
  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
    <FiCheckCircle />
    Paid
  </div>
)}

{item.paymentStatus ===
  "Pending" && (
  <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
    <FiClock />
    Pending
  </div>
)}

{item.paymentStatus ===
  "Failed" && (
  <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
    <FiXCircle />
    Failed
  </div>
)}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#5f5f5f] text-sm">
                      Amount
                    </span>

                    <span className="text-black font-semibold">
                      {item.amount}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#5f5f5f] text-sm">
                      Method
                    </span>

                    <span className="text-black font-semibold">
                      {item.paymentMethod}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#5f5f5f] text-sm">
                      Date
                    </span>

                    <span className="text-black font-semibold">
                      {new Date(
  item.createdAt
).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 border border-[#8b6b08]/20 text-[#8b6b08] py-3 rounded-xl font-semibold bg-[#8b6b08]/5 flex items-center justify-center gap-2">
                  <FiClock />
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}