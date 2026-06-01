// src/pages/admin/Inventory.jsx

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiAlertTriangle,
  FiCheckCircle,
  FiPlus,
} from "react-icons/fi";

const API = `${import.meta.env.VITE_API_URL}/api/products`;

export default function Inventory({
  setShowProduct,
  setEditProduct,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/all`
      );

      setProducts(data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE PRODUCT =================

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/${id}`
      );

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  // ================= FILTER =================

  const filteredProducts = useMemo(() => {

    return products.filter((item) => {

      const matchSearch =
        item.product
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.skuCode
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        category === "All" ||
        item.primaryCollection === category;

      return matchSearch && matchCategory;
    });

  }, [products, search, category]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts =
    filteredProducts.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  // ================= STATS =================

  const totalProducts = products.length;

  const lowStock = products.filter(
    (item) => Number(item.stockQty) < 1
  ).length;

  // const inStock = products.filter(
  //   (item) =>
  //     item.inventoryStatus === "In Stock"
  // ).length;
  const inStock = products.filter(
    (item) =>
      item.inventoryStatus !== "Out of Stock"
  ).length;

  const totalValue = products.reduce(
    (acc, item) =>
      acc + Number(item.regularPrice || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-4xl font-serif text-black">
            Inventory
          </h1>

          <p className="text-sm text-[#8c877f] mt-1">
            Manage all luxury products
          </p>
        </div>

        <button
          onClick={() => setShowProduct(true)}
          className="h-[48px] px-6 bg-[#8b6b08] text-white rounded-full text-sm flex items-center gap-2 hover:bg-[#a07c10] transition"
        >
          <FiPlus />
          Add Product
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-2xl border border-[#ebe5dc] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-[#8c877f]">
                Total Products
              </p>

              <h2 className="text-3xl font-semibold mt-2">
                {totalProducts}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#f4eee3] flex items-center justify-center">
              <FiPackage className="text-[#8b6b08]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#ebe5dc] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-[#8c877f]">
                In Stock
              </p>

              <h2 className="text-3xl font-semibold mt-2">
                {inStock}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#edf7ef] flex items-center justify-center">
              <FiCheckCircle className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#ebe5dc] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-[#8c877f]">
                Low Stock
              </p>

              <h2 className="text-3xl font-semibold mt-2">
                {lowStock}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#fff2ef] flex items-center justify-center">
              <FiAlertTriangle className="text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#ebe5dc] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-[#8c877f]">
                Inventory Value
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                ${totalValue}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#f4eee3] flex items-center justify-center">
              <FiPackage className="text-[#8b6b08]" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="bg-white border border-[#ebe5dc] rounded-2xl p-4 mb-6">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">

            <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-[#8c877f]" />

            <input
              type="text"
              placeholder="Search product or SKU..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full h-[48px] pl-11 pr-4 rounded-xl border border-[#ddd6cc] bg-[#faf8f5] outline-none focus:border-[#8b6b08]"
            />
          </div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="h-[48px] px-4 rounded-xl border border-[#ddd6cc] bg-[#faf8f5] outline-none"
          >
            <option>All</option>
            <option>Heritage Collection</option>
            <option>Royal Series</option>
            <option>Celestial Line</option>
            <option>Artisan Collection</option>
          </select>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white border border-[#ebe5dc] rounded-2xl overflow-hidden">

        {loading ? (

          <div className="p-10 text-center text-[#8c877f]">
            Loading inventory...
          </div>

        ) : paginatedProducts.length === 0 ? (

          <div className="p-10 text-center">
            <h2 className="text-xl font-semibold">
              No Products Found
            </h2>

            <p className="text-[#8c877f] mt-2">
              Try another search or add product
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead className="bg-[#f7f3ee]">
                <tr className="text-left">

                  <th className="px-6 py-4 text-xs uppercase">
                    Product
                  </th>

                  <th className="px-6 py-4 text-xs uppercase">
                    SKU
                  </th>

                  <th className="px-6 py-4 text-xs uppercase">
                    Collection
                  </th>

                  <th className="px-6 py-4 text-xs uppercase">
                    Price
                  </th>

                  <th className="px-6 py-4 text-xs uppercase">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-xs uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {paginatedProducts.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t border-[#f1ece5]"
                  >
                    {/* PRODUCT */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            item.images?.[0] ||
                            "https://placehold.co/100x100"
                          }
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover border"
                        />

                        <div>
                          <h2 className="font-semibold text-sm">
                            {item.product}
                          </h2>

                          <p className="text-xs text-[#8c877f] mt-1 line-clamp-1">
                            {item.seoDescription}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}

                    <td className="px-6 py-4 text-sm">
                      {item.skuCode}
                    </td>

                    {/* COLLECTION */}

                    <td className="px-6 py-4 text-sm">
                      {item.primaryCollection}
                    </td>

                    {/* PRICE */}

                    <td className="px-6 py-4 font-semibold">
                      ${item.regularPrice}
                    </td>

                    {/* STOCK */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <span className="font-semibold">
                          {item.stockQty}
                        </span>

                        {Number(item.stockQty) < 5 && (
                          <span className="px-2 py-1 text-[10px] rounded-full bg-red-100 text-red-600">
                            Low
                          </span>
                        )}
                      </div>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${item.inventoryStatus ===
                            "In Stock"
                            ? "bg-green-100 text-green-700"
                            : item.inventoryStatus ===
                              "Out of Stock"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {item.inventoryStatus}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            setEditProduct(item)
                          }
                          className="w-9 h-9 rounded-full border border-[#ddd6cc] flex items-center justify-center hover:bg-[#f4eee3]"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          onClick={() =>
                            deleteHandler(item._id)
                          }
                          className="w-9 h-9 rounded-full border border-[#ffd8d3] text-red-500 flex items-center justify-center hover:bg-red-50"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= PAGINATION ================= */}

      {!loading && totalPages > 1 && (

        <div className="flex items-center justify-center gap-2 mt-6">

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-full text-sm transition ${page === i + 1
                  ? "bg-[#8b6b08] text-white"
                  : "bg-white border border-[#ddd6cc]"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}