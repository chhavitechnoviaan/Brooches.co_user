import React, { useState, useEffect } from 'react'
import { RiStackFill } from "react-icons/ri";
import Swal from "sweetalert2";

import {
    FiGrid,
    FiBox,
    FiRepeat,
    FiBarChart2,
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
    FiPlus,
    FiChevronRight,
    FiEye,
    FiShoppingBag,
    FiTag,
    FiTruck,
    FiSettings,
    FiUserCheck,
    FiPackage,
} from "react-icons/fi";

import {
    FiEdit,
    FiTrash2,
    FiCheck,
    FiDollarSign,
    FiRefreshCw,
    FiUser,
} from "react-icons/fi";

import AddProduct from './AddProduct';
import axios from "axios";


const Collections = ({ active }) => {
    const [selectedType, setSelectedType] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [products, setProducts] = useState([]);
    const inventoryItemsPerPage = 5;
    const [inventorySearch, setInventorySearch] = useState("");
    const [InventoryPage, setInventoryPage] = useState(1);
    useEffect(() => {
        fetchProducts();
    }, []);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/products/all`
            );

            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            html:
                "Type <b>DELETE</b> to confirm",
            input: "text",
            inputPlaceholder:
                "Type DELETE",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#d33",

            inputValidator: (value) => {

                if (value !== "DELETE") {
                    return "Please type DELETE";
                }
            },
        });

        if (result.isConfirmed) {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/products/delete/${id}`
            );

            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Product deleted successfully",
            });

            fetchProducts();
        }
    };
    // const handleDelete = async (id) => {

    //     const result = await Swal.fire({
    //         title: "Delete Product?",
    //         text: "Type DELETE to confirm",
    //         input: "text",
    //         inputPlaceholder: "Type DELETE",
    //         showCancelButton: true,
    //         confirmButtonColor: "#8b6b08",
    //         confirmButtonText: "Delete",
    //     });

    //     if (result.value !== "DELETE") {
    //         return Swal.fire({
    //             icon: "error",
    //             title: "Cancelled",
    //             text: "You must type DELETE",
    //         });
    //     }

    //     try {

    //         await axios.delete(
    //             `http://localhost:5000/api/products/delete/${id}`
    //         );

    //         Swal.fire({
    //             icon: "success",
    //             title: "Deleted",
    //             text: "Product deleted successfully",
    //         });

    //         fetchProducts();

    //     } catch (error) {
    //         console.log(error);

    //         Swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             text: "Delete failed",
    //         });
    //     }
    // };

    const handleEdit = (product) => {
        setEditUser(product);
        setShowProduct(true);
    };
    const [showProduct, setShowProduct] = useState(false);

    const updatedInventory = products;

    const productTypes = [
        "All",
        ...new Set(products.map((item) => item.productType)),
    ];
    const categories = [
        "All",
        ...new Set(
            products
                .filter((item) =>
                    selectedType === "All"
                        ? true
                        : item.productType === selectedType
                )
                .map((item) => item.category)
        ),
    ];
  
    const filtered = updatedInventory.filter((u) => {
        const matchesSearch =
            (u.product || "")
                .toLowerCase()
                .includes(inventorySearch.toLowerCase());

        const matchesType =
            selectedType === "All"
                ? true
                : u.productType === selectedType;

        const matchesCategory =
            selectedCategory === "All"
                ? true
                : u.category === selectedCategory;

        return matchesSearch && matchesType && matchesCategory;
    });

      const totalInventoryPages = Math.ceil(
        filtered.length /
        inventoryItemsPerPage
    );
    const currentInventoryData = filtered.slice(
        (InventoryPage - 1) * inventoryItemsPerPage,
        InventoryPage * inventoryItemsPerPage
    );

    return (
        <div>

            {!showProduct && (
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl lg:text-[36px] text-black font-light"
                                style={{ fontFamily: "Cormorant Garamond, serif" }}
                            >
                                Add Product
                            </h2>
                            <p className="text-sm font-medium   mb-1">
                                Manage luxury inventory with precision and elegance. Track
                                every gemstone and filigree detail in real-time.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-[#fbf9f7] border border-[#e0d9d0] px-4 py-2.5 rounded-lg text-[12px] text-black">
                                <RiStackFill size={14} className="text-[#8b6b08]" />
                                <span>Bulk Action</span>
                            </div>
                            <button
                                onClick={() => setShowProduct(true)}
                                className="flex items-center gap-2 bg-[#8b6b08] text-white px-4 py-2.5 rounded-lg text-[12px] uppercase tracking-[1px] hover:bg-[#a07c10] transition"
                            >
                                <FiPlus size={14} />
                                <span className="hidden sm:inline">Add Product</span>
                            </button>
                        </div>
                    </div>

                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                {inventory.map((stat, i) => (
                                    <div
                                    key={i}
                                    className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                                    >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl flex items-center justify-center">
                                        {stat.icon}
                                        </div>
                                        <span className="text-[10px] bg-[#f0ebe1] border border-[#8b6b08]/30 text-[#8b6b08] px-2 py-1 rounded-full font-semibold">
                                        {stat.badge}
                                        </span>
                                    </div>
                                    <p className="text-[10px] uppercase tracking-[1.5px] text-[#9a9388] mb-2">
                                        {stat.label}
                                    </p>
                                    <p
                                        className="text-2xl sm:text-[26px] font-bold text-black mb-3"
                                        style={{ fontFamily: "Cormorant Garamond, serif" }}
                                    >
                                        {stat.value}
                                    </p>
                                    <div className="w-full h-1.5 bg-[#e5dfd7] rounded-full overflow-hidden mb-1">
                                        <div
                                        className="h-full bg-[#8b6b08] rounded-full transition-all duration-700"
                                        style={{ width: `${stat.pct}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-[#9a9388]">{stat.sub}</p>
                                    </div>
                                ))}
                                </div> */}


                    <div>
                        <div className="bg-[#fbf9f7] rounded-xl shadow p-4 ">
                            <div className="flex sm:flex-row flex-col justify-between  items-start sm:items-center gap-2  mb-4 px-2 sm:px-8">
                                <div className="relative mb-4">
                                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={inventorySearch}
                                        onChange={(e) => {
                                            setInventorySearch(e.target.value);
                                            setInventoryPage(1);
                                        }}
                                        className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 mb-4">

                                    {/* Product Type */}
                                    <select
                                        value={selectedType}
                                        onChange={(e) => {
                                            setSelectedType(e.target.value);
                                            setSelectedCategory("All");
                                        }}
                                        className="border rounded-md px-4 py-2 outline-none"
                                    >
                                        {productTypes.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Category */}
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="border rounded-md px-4 py-2 outline-none"
                                    >
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto  px-0 sm:px-3 md:px-8">
                                <table className="w-full text-xs sm:text-sm">
                                    <thead className="text-[#8b6b08] text-left bg-[#f8f6f3] text-xs    sm:text-sm">
                                        <tr className="gap-   ">
                                            <th className="text-left   py-3 text-[9px] md:text-sm uppercase tracking-[2px] text-[#8b6b08] font-semibold whitespace-nowrap  pl-6 rounded-l-lg">Image</th>
                                            <th className="text-left   py-3 text-[9px] md:text-sm uppercase tracking-[2px] text-[#8b6b08] font-semibold whitespace-nowrap">Product</th>
                                            <th className="text-left   py-3 text-[9px] md:text-sm uppercase tracking-[2px] text-[#8b6b08] font-semibold whitespace-nowrap">Category </th>
                                            <th className="text-left   py-3 text-[9px] md:text-sm uppercase tracking-[2px] text-[#8b6b08] font-semibold whitespace-nowrap">Stock</th>
                                            <th className="text-left   py-3 text-[9px] md:text-sm uppercase tracking-[2px] text-[#8b6b08] font-semibold whitespace-nowrap">Price</th>
                                            <th className="text-left   py-3 text-[9px] md:text-sm uppercase tracking-[2px] text-[#8b6b08] font-semibold whitespace-nowrap">Status</th>
                                            <th className="text-left   py-3 text-[9px] md:text-sm uppercase tracking-[2px] text-[#8b6b08] font-semibold whitespace-nowrap rounded-r-lg" >Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {currentInventoryData.map((u, id) => (
                                            <tr key={id} className="border-t text-[#707071] ">
                                                <td className="py-2   pl-6 flex font-medium items-center gap-2">
                                                    <img
                                                        src={u.images?.[0]}
                                                        className="w-10  h-10 rounded-full"
                                                    />
                                                </td>
                                                <td className="font-medium  ">
                                                    {/* <span className="w-4 h-4 " > AB </span> */}
                                                    {u.product}
                                                </td>
                                                <td className="font-medium font-serif ">
                                                    {u.category || u.primaryCollection}
                                                </td>

                                                <td className="font-medium">{u.stockQty} Units</td>
                                                <td className="font-medium">{u.currency} {u.regularPrice} </td>

                                                <td className="font-medium ">
                                                    <span
                                                        className={`px-2 py-1 rounded-lg text-xs ${u.inventoryStatus === "active"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-gray-200 text-gray-600"
                                                            }`}
                                                    >
                                                        {u.inventoryStatus}
                                                    </span>
                                                </td>

                                                <td className="py-2">
                                                    <div className="flex gap-2 text-lg items-start ">
                                                        <FiEdit
                                                            onClick={() => {
                                                                setEditUser(u);
                                                                setShowProduct(true);
                                                            }}
                                                            className="cursor-pointer text-blue-500"
                                                        />

                                                        <FiTrash2
                                                            onClick={() => handleDelete(u._id)}
                                                            className="cursor-pointer text-red-500"
                                                        />{" "}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-center mt-4 text-sm px-2 sm:px-8">
                                <p>
                                    Showing {currentInventoryData.length} of{" "}
                                    {updatedInventory.length} results
                                </p>

                                <div className="flex gap-2 items-center">
                                    <button
                                        onClick={() =>
                                            setInventoryPage((p) => Math.max(p - 1, 1))
                                        }
                                        className="border px-3 py-1 rounded"
                                    >
                                        Previous
                                    </button>

                                    <span className="bg-[#8b6b08] text-white px-3 py-1 rounded">
                                        {InventoryPage}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setInventoryPage((p) =>
                                                p < totalInventoryPages ? p + 1 : p
                                            )
                                        }
                                        className="border px-3 py-1 rounded"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}


            {showProduct && (
                <AddProduct
                    setShowProduct={setShowProduct}
                    fetchProducts={fetchProducts}
                    editUser={editUser}
                    setEditUser={setEditUser}
                />
            )}
        </div>
    )
}

export default Collections