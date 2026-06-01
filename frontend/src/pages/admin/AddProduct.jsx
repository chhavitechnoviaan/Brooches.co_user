import React, { useEffect, useState } from "react";
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiChevronDown,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { BsGem } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { createProductAPI } from "../../services/productService";
const collections = [
  "Heritage Collection",
  "Royal Series",
  "Celestial Line",
  "Artisan Collection",
];

const productCategories = {
  BROOCHES: [
    "New Arrival",
    "Floral & Botanical",
    "Vintage & Antique",
    "Animal & Nature",
    "Geometric & Abstract",
    "Festive & Seasonal",
    "Pearl & Crystal",
    "Luxury Statement",
  ],

  BADGES: [
    "New Arrival",
    "Pop Culture & Fandom",
    "Gaming & Anime",
    "Music & Band",
    "Motivational & Quotes",
    "Travel & Adventure",
    "Aesthetic & Minimal",
    "Custom & Personalize",
  ],
};

// export default function AddProduct({
//   setShowProduct,
//   fetchProducts,
// }) {
const AddProduct = ({
  setShowProduct,
  fetchProducts,
  editUser,
  setEditUser,
}) => {
  // const initialForm =
  const [extraInput, setExtraInput] =
    useState({
      label: "",
      value: "",
    });
  const addExtraField = () => {
    if (
      !extraInput.label ||
      !extraInput.value
    )
      return;

    updateForm("extraFields", [
      ...form.extraFields,
      extraInput,
    ]);

    setExtraInput({
      label: "",
      value: "",
    });
  };
  const [form, setForm] = useState({
    product: "",
    urlSlug: "",
    skuCode: "",
    craftsmanshipDetails: "",
    primaryCollection: "Heritage Collection",
    tags: ["#VINTAGE", "#EMERALD"],
    featuredOnHomepage: true,
    newArrivalBadge: false,
    limitedEditionSeries: false,
    weight: "142",
    insuranceVal: "High",
    regularPrice: "12500",
    salePrice: "",
    inventoryStatus: "Low Stock Alert",
    stockQty: "3",
    trackQuantities: true,
    productType: "BROOCHES",
    category: "New Arrival",
    currency: "USD",
    extraFields: [],
    seoDescription:
      "Discover the unmatched elegance of the Celestial Dawn, a master-crafted emerald brooch",
    variants: [
      { material: "18K Yellow Gold", gemstone: "Zambian Emerald", stock: "12" },

    ],
  });
  const [tagInput, setTagInput] = useState("");
  // const [images, setImages] = useState([
  //   { id: 1, url: "https://placehold.co/120x120/e8e0d5/8b6b08?text=IMG" },
  // ]);
  const [images, setImages] = useState([
    //  { id: 1, url: "https://placehold.co/120x120/e8e0d5/8b6b08?text=IMG" },
  ]);
  const [imageFiles, setImageFiles] = useState([]);
  const [publishedData, setPublishedData] = useState(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
  const slug = form.product
    .toLowerCase()
    .replaceAll(" ", "-");

  updateForm("urlSlug", slug);

}, [form.product]);
  useEffect(() => {

    if (editUser) {

      setForm({
        product: editUser.product || "",
        urlSlug: editUser.urlSlug || "",
        skuCode: editUser.skuCode || "",
        craftsmanshipDetails:
          editUser.craftsmanshipDetails || "",

        productType:
          editUser.productType || "BROOCHES",

        category:
          editUser.category || "New Arrival",

        primaryCollection:
          editUser.primaryCollection ||
          "Heritage Collection",

        regularPrice:
          editUser.regularPrice || "",

        salePrice:
          editUser.salePrice || "",

        stockQty:
          editUser.stockQty || "",

        inventoryStatus:
          editUser.inventoryStatus ||
          "In Stock",

        currency:
          editUser.currency || "USD",

        tags:
          editUser.tags || [],

        variants:
          editUser.variants || [],

        extraFields:
          editUser.extraFields || [],

        seoDescription:
          editUser.seoDescription || "",

        featuredOnHomepage:
          editUser.featuredOnHomepage || false,

        newArrivalBadge:
          editUser.newArrivalBadge || false,

        limitedEditionSeries:
          editUser.limitedEditionSeries || false,

        trackQuantities:
          editUser.trackQuantities || false,

        weight:
          editUser.weight || "",
      });

      setImages(
        editUser.images?.map((img, index) => ({
          id: index,
          url: img,
        }))
      );

    }

  }, [editUser]);
  // const set = (key, val) => {
  //   setForm((p) => ({ ...p, [key]: val }));
  //   setErrors((p) => ({ ...p, [key]: "" }));
  // };
  const updateForm = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.product.trim()) e.product = "Product title is required";
    if (!form.skuCode.trim()) e.skuCode = "SKU code is required";
    if (!form.regularPrice) e.regularPrice = "Regular price is required";
    return e;
  };
  //   const handlePublish = async () => {
  //     try {
  //       const formData = new FormData();

  //       Object.keys(form).forEach((key) => {
  //         if (
  //           key === "tags" ||
  //           key === "variants"
  //         ) {
  //           formData.append(
  //             key,
  //             JSON.stringify(form[key])
  //           );
  //         } else {
  //           formData.append(key, form[key]);
  //         }
  //       });

  //       imageFiles.forEach((img) => {
  //         formData.append("images", img);
  //       });

  //       // const res = await axios.post(
  //       //   "http://localhost:5000/api/products/create",
  //       //   formData
  //       // );

  //       // console.log(res.data);

  //       alert("Product Published");

  // fetchProducts();

  // setShowProduct(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      updateForm("tags", [...form.tags, `#${tagInput.trim().toUpperCase()}`]);
      setTagInput("");
    }
  };

  const removeTag = (i) =>
    updateForm(
      "tags",
      form.tags.filter((_, idx) => idx !== i)
    );

  const addVariant = () =>
    updateForm("variants", [
      ...form.variants,
      { material: "", gemstone: "", stock: "" },
    ]);

  const updateVariant = (i, key, val) =>
    updateForm(
      "variants",
      form.variants.map((v, idx) => (idx === i ? { ...v, [key]: val } : v))
    );

  const removeVariant = (i) =>
    updateForm(
      "variants",
      form.variants.filter((_, idx) => idx !== i)
    );

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];

  //   if (!file) return;

  //   setImageFiles((prev) => [...prev, file]);

  //   const url = URL.createObjectURL(file);

  //   setImages((prev) => [
  //     ...prev,
  //     {
  //       id: Date.now(),
  //       url,
  //     },
  //   ]);
  // };

  const handleImageUpload = (e) => {

  const files = Array.from(e.target.files);

  if (images.length + files.length > 8)
    return;

  const newImages = files.map((file) => ({
    id: Date.now() + Math.random(),
    url: URL.createObjectURL(file),
    file,
  }));

  setImages((prev) => [
    ...prev,
    ...newImages,
  ]);
};
  const Toggle = ({ val, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!val)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${val ? "bg-[#8b6b08]" : "bg-[#d0c9c0]"
        }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${val ? "left-5" : "left-0.5"
          }`}
      />
    </button>
  );

  const inputClass =
    "w-full bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl px-4 py-3 text-[13px] text-black placeholder:text-[#9a9388] outline-none focus:border-[#8b6b08] transition";
  const labelClass =
    "block text-[9px] uppercase tracking-[2px] text-[#8b6b08] font-semibold mb-2";

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   const validationErrors = validate();

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();

  //     Object.keys(form).forEach((key) => {
  //       if (
  //         key === "tags" ||
  //         key === "variants" ||
  //         key === "extraFields"
  //       ) {
  //         formData.append(
  //           key,
  //           JSON.stringify(form[key])
  //         );
  //       } else {
  //         formData.append(key, form[key]);
  //       }
  //     });

  //     imageFiles.forEach((img) => {
  //       formData.append("images", img);
  //     });

  //     // const { data } = await axios.post(
  //     //   "http://localhost:5000/api/products/create",
  //     //   formData,
  //     //   {
  //     //     headers: {
  //     //       "Content-Type": "multipart/form-data",
  //     //     },
  //     //   }
  //     // );
  //     const formDataToSend = new FormData();

  //     Object.keys(form).forEach((key) => {

  //       if (
  //         key === "tags" ||
  //         key === "variants" ||
  //         key === "extraFields"
  //       ) {

  //         formDataToSend.append(
  //           key,
  //           JSON.stringify(form[key])
  //         );

  //       } else {

  //         formDataToSend.append(
  //           key,
  //           form[key]
  //         );
  //       }
  //     });

  //     imageFiles.forEach((img) => {
  //       formDataToSend.append("images", img);
  //     });

  //     if (editUser) {

  //       await axios.put(
  //         `http://localhost:5000/api/products/update/${editUser._id}`,
  //         formDataToSend,
  //         {
  //           headers: {
  //             "Content-Type":
  //               "multipart/form-data",
  //           },
  //         }
  //       );

  //       Swal.fire({
  //         icon: "success",
  //         title: "Updated",
  //         text: "Product updated successfully",
  //       });

  //     } else {

  //       await axios.post(
  //         "http://localhost:5000/api/products/create",
  //         formDataToSend,
  //         {
  //           headers: {
  //             "Content-Type":
  //               "multipart/form-data",
  //           },
  //         }
  //       );

  //       Swal.fire({
  //         icon: "success",
  //         title: "Created",
  //         text: "Product added successfully",
  //       });
  //     }

  //     fetchProducts();

  //     setEditUser(null);

  //     setShowProduct(false);

  //     alert("Product Added Successfully");

  //     fetchProducts();

  //     setShowProduct(false);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const submitHandler = async (e) => {
  e.preventDefault();

  const eObj = validate();

  if (Object.keys(eObj).length > 0) {
    setErrors(eObj);
    return;
  }

  try {

    const formData = new FormData();

    // normal fields
    Object.keys(form).forEach((key) => {

      if (
        key === "tags" ||
        key === "variants"
      ) {

        formData.append(
          key,
          JSON.stringify(form[key])
        );

      } else {

        formData.append(
          key,
          form[key]
        );
      }
    });

    // images
    images.forEach((img) => {

      if (img.file) {
        formData.append(
          "images",
          img.file
        );
      }
    });

    const response =
      await createProductAPI(formData);

    console.log(response);

    setProduct(response.product);

    setShowProduct(false);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div
      className="min-h-screen bg-[#f8f6f3]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BsGem size={16} className="text-[#8b6b08]" />
              <span className="text-[9px] uppercase tracking-[2.5px] text-[#8b6b08] font-semibold">
                Technoviaan
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl lg:text-[34px] text-black leading-tight"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Add New Product
            </h1>
            <p className="text-[12px] text-[#9a9388] mt-1">
              Register a new masterpiece to the Technoviaan collection.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDraft}
              className="h-[42px] px-5 border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1.5px] rounded-full hover:border-[#8b6b08] hover:text-[#8b6b08] transition"
            >
              {draftSaved ? "Draft Saved ✓" : "Save Draft"}
            </button>
            <button
              // onClick={handlePublish}
              type="submit"
              className="h-[42px] px-5 bg-[#8b6b08] text-white text-[11px] uppercase tracking-[1.5px] rounded-full hover:bg-[#a07c10] transition"
            >
              Publish Product
            </button>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-6">
              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 sm:p-6">
                <h2
                  className="text-[18px] text-black mb-5 font-semibold"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  Basic Information
                </h2>

                <div className="mb-5">
                  <label className={labelClass}>Product Title</label>
                  <input
                    type="text"
                    value={form.product}
                    onChange={(e) => updateForm("product", e.target.value)}
                    placeholder="e.g. Celestial Dawn Emerald Brooch"
                    className={`${inputClass} text-[15px] py-4`}
                  />
                  {errors.product && (
                    <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                      <FiAlertCircle size={10} /> {errors.product}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className={labelClass}>URL Slug</label>
                    <div className="flex items-center bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl overflow-hidden focus-within:border-[#8b6b08] transition">
                      <span className="px-3 text-[11px] text-[#9a9388] whitespace-nowrap border-r border-[#e0d9d0] py-3">
                        technoviaan.com/p/
                      </span>
                      <input
                        type="text"
                        value={form.urlSlug}
                        readOnly
                        onChange={(e) => updateForm("urlSlug", e.target.value)}
                        placeholder="celestial-"
                        className="flex-1 bg-transparent px-3 py-3 text-[13px] text-black outline-none placeholder:text-[#9a9388]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>SKU Code</label>
                    <input
                      type="text"
                      value={form.skuCode}
                      onChange={(e) => updateForm("skuCode", e.target.value)}
                      placeholder="TV-BRO-0042"
                      className={inputClass}
                    />
                    {errors.skuCode && (
                      <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                        <FiAlertCircle size={10} /> {errors.skuCode}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Craftsmanship Details</label>
                  <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl overflow-hidden focus-within:border-[#8b6b08] transition">
                    <div className="flex items-center gap-3 px-4 py-2 border-b border-[#e0d9d0]">
                      {[FiBold, FiItalic, FiList, FiLink].map((Icon, i) => (
                        <button
                          key={i}
                          type="button"
                          className="text-[#9a9388] hover:text-[#8b6b08] transition"
                        >
                          <Icon size={15} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={form.craftsmanshipDetails}
                      onChange={(e) =>
                        updateForm("craftsmanshipDetails", e.target.value)
                      }
                      placeholder="Describe the heritage, gemstone quality, and artisan techniques used..."
                      rows={5}
                      className="w-full bg-transparent px-4 py-3 text-[13px] text-black placeholder:text-[#9a9388] outline-none resize-y"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2
                    className="text-[18px] text-black font-semibold"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    Product Imagery
                  </h2>
                  <span className="text-[11px] text-[#9a9388]">
                    {images.length} / 8 Files
                  </span>
                </div>

                {images.length < 8 && (
                  <label className="block border-2 border-dashed border-[#d0c9c0] rounded-xl p-8 text-center cursor-pointer hover:border-[#8b6b08] transition mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className="w-12 h-12 bg-[#f0ebe1] rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiUploadCloud size={22} className="text-[#8b6b08]" />
                    </div>
                    <p className="text-[13px] text-black font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-[11px] text-[#9a9388] mt-1">
                      Recommended: 2000 x 2000px High-Res TIFF or PNG
                    </p>
                  </label>
                )}

                <div className="flex flex-wrap gap-3">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-[#e0d9d0]"
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        // onClick={() =>
                        //   setImages((p) => p.filter((x) => x.id !== img.id))
                        // }
                        onClick={() => {
                          if (images.length === 1) return;

                          setImages((p) => p.filter((x) => x.id !== img.id));
                        }}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white"
                      >
                        <FiX size={10} />
                      </button>
                    </div>
                  ))}
                  {images.length < 8 && (
                    <label className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-[#d0c9c0] rounded-xl flex items-center justify-center cursor-pointer hover:border-[#8b6b08] transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <FiPlus size={20} className="text-[#9a9388]" />
                    </label>
                  )}
                </div>
              </div>

              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 sm:p-6">
                <h2
                  className="text-[18px] text-black mb-5 font-semibold"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  Valuation & Stock
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}><div>
                      <label className={labelClass}>
                        Currency
                      </label>

                      <select
                        value={form.currency}
                        onChange={(e) =>
                          updateForm("currency", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option>USD</option>
                        <option>INR</option>
                        <option>EUR</option>
                        <option>AED</option>
                      </select>
                    </div></label>
                    <div className="flex items-center bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl overflow-hidden focus-within:border-[#8b6b08] transition">
                      <span className="px-4 py-3 text-[#8b6b08] font-semibold border-r border-[#e0d9d0]">
                        $
                      </span>
                      <input
                        type="number"
                        value={form.regularPrice}
                        onChange={(e) => updateForm("regularPrice", e.target.value)}
                        className="flex-1 bg-transparent px-4 py-3 text-[15px] font-semibold text-black outline-none"
                      />
                    </div>
                    {errors.regularPrice && (
                      <p className="text-xs text-[#d94c3d] mt-1 flex items-center gap-1">
                        <FiAlertCircle size={10} /> {errors.regularPrice}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Sale Price (Optional)</label>
                    <div className="flex items-center bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl overflow-hidden focus-within:border-[#8b6b08] transition">
                      <span className="px-4 py-3 text-[#9a9388] border-r border-[#e0d9d0]">
                        $
                      </span>
                      <input
                        type="number"
                        value={form.salePrice}
                        onChange={(e) => updateForm("salePrice", e.target.value)}
                        placeholder="Enter amount"
                        className="flex-1 bg-transparent px-4 py-3 text-[13px] text-black outline-none placeholder:text-[#9a9388]"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Inventory Status</label>
                    <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl px-4 py-3 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#d94c3d] flex-shrink-0" />
                      <select
                        value={form.inventoryStatus}
                        onChange={(e) => updateForm("inventoryStatus", e.target.value)}
                        className="flex-1 bg-transparent text-[13px] text-black outline-none"
                      >
                        <option>Low Stock Alert</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                        <option>Pre-Order</option>
                        <option>Limited</option>
                        <option>Available</option>
                      </select>
                      <input
                        type="number"
                        value={form.stockQty}
                        onChange={(e) => updateForm("stockQty", e.target.value)}
                        className="w-14 bg-[#fbf9f7] border border-[#e0d9d0] rounded-lg text-center text-[13px] text-black outline-none py-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Track Quantities</label>
                    <div className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl px-4 py-3 flex items-center justify-between">
                      <span className="text-[13px] text-black">
                        Enable tracking
                      </span>
                      <Toggle
                        val={form.trackQuantities}
                        onChange={(v) => updateForm("trackQuantities", v)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2
                    className="text-[18px] text-black font-semibold"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    Artisan Variants
                  </h2>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-2 text-[11px] text-[#8b6b08] uppercase tracking-[1px] hover:text-[#a07c10] transition"
                  >
                    <FiPlus size={14} />
                    Add New Property
                  </button>
                </div>
                <div className="space-y-3">
                  {form.variants.map((v, i) => (
                    <div
                      key={i}
                      className="bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl p-4 grid grid-cols-1 sm:grid-cols-[1fr_1fr_120px_40px] gap-3 items-center"
                    >
                      <div>
                        <label className={labelClass}>Material</label>
                        <div className="flex items-center gap-1">
                          <select
                            value={v.material}
                            onChange={(e) =>
                              updateVariant(i, "material", e.target.value)
                            }
                            className="flex-1 bg-transparent text-[13px] text-black outline-none"
                          >
                            <option>18K Yellow Gold</option>
                            <option>18K White Gold</option>
                            <option>Sterling Silver</option>
                            <option>Platinum</option>
                            <option>Rose Gold</option>
                          </select>
                          <FiChevronDown size={12} className="text-[#9a9388]" />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Main Gemstone</label>
                        <div className="flex items-center gap-1">
                          <select
                            value={v.gemstone}
                            onChange={(e) =>
                              updateVariant(i, "gemstone", e.target.value)
                            }
                            className="flex-1 bg-transparent text-[13px] text-black outline-none"
                          >
                            <option>Zambian Emerald</option>
                            <option>Kashmir Sapphire</option>
                            <option>Burmese Ruby</option>
                            <option>Natural Diamond</option>
                            <option>Ceylon Sapphire</option>
                          </select>
                          <FiChevronDown size={12} className="text-[#9a9388]" />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>In Stock</label>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={v.stock}
                            onChange={(e) =>
                              updateVariant(i, "stock", e.target.value)
                            }
                            className="w-full bg-transparent text-[14px] font-semibold text-black outline-none"
                          />
                          <span className="text-[11px] text-[#9a9388] whitespace-nowrap">
                            Units
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        className="flex items-center justify-center text-[#9a9388] hover:text-[#d94c3d] transition mt-4 sm:mt-0"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 sm:p-6">

                  <div className="flex items-center justify-between mb-5">
                    <h2
                      className="text-[18px] text-black font-semibold"
                      style={{
                        fontFamily:
                          "Cormorant Garamond, serif",
                      }}
                    >
                      Additional Properties
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Label"
                      value={extraInput.label}
                      onChange={(e) =>
                        setExtraInput({
                          ...extraInput,
                          label: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <input
                      type="text"
                      placeholder="Value"
                      value={extraInput.value}
                      onChange={(e) =>
                        setExtraInput({
                          ...extraInput,
                          value: e.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addExtraField}
                    className="px-4 py-2 bg-[#8b6b08] text-white rounded-full text-[12px]"
                  >
                    Add Property
                  </button>

                  <div className="mt-5 space-y-2">
                    {form.extraFields.map(
                      (field, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-[#f0ebe1] px-4 py-3 rounded-xl"
                        >
                          <div>
                            <p className="text-[12px] font-semibold">
                              {field.label}
                            </p>

                            <p className="text-[12px] text-[#777]">
                              {field.value}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              updateForm(
                                "extraFields",
                                form.extraFields.filter(
                                  (_, i) =>
                                    i !== index
                                )
                              )
                            }
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5">
                <p className="text-[9px] uppercase tracking-[2.5px] text-[#8b6b08] font-semibold mb-4">
                  Organizational Meta
                </p>

                <div className="mb-4">
                  <label className={labelClass}>
                    Product Type
                  </label>

                  <select
                    value={form.productType}
                    onChange={(e) =>
                      updateForm("productType", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="BROOCHES">
                      BROOCHES
                    </option>

                    <option value="BADGES">
                      BADGES
                    </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className={labelClass}>
                    Category
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      updateForm("category", e.target.value)
                    }
                    className={inputClass}
                  >
                    {productCategories[
                      form.productType
                    ]?.map((cat) => (
                      <option key={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className={labelClass}>Primary Collection</label>
                  <div className="relative">
                    <select
                      value={form.primaryCollection}
                      onChange={(e) => updateForm("primaryCollection", e.target.value)}
                      className="w-full bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl px-4 py-3 text-[13px] text-black outline-none focus:border-[#8b6b08] transition appearance-none"
                    >
                      {collections.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <FiChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9a9388] pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 bg-[#f0ebe1] border border-[#d0c9c0] text-[#8b6b08] text-[10px] px-3 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(i)}
                          className="hover:text-[#d94c3d] transition ml-1"
                        >
                          <FiX size={10} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      placeholder="Add Tag"
                      className="bg-[#f0ebe1] border border-dashed border-[#d0c9c0] text-[11px] text-black px-3 py-1 rounded-full outline-none placeholder:text-[#9a9388] w-20 focus:border-[#8b6b08]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5 space-y-4">
                {[
                  { label: "Featured on Homepage", key: "featuredOnHomepage" },
                  { label: "New Arrival Badge", key: "newArrivalBadge" },
                  {
                    label: "Limited Edition Series",
                    key: "limitedEditionSeries",
                  },
                ].map(({ label, key }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-[13px] text-black">{label}</span>
                    <Toggle val={form[key]} onChange={(v) => updateForm(key, v)} />
                  </div>
                ))}
              </div>

              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5">
                <p className="text-[9px] uppercase tracking-[2.5px] text-[#8b6b08] font-semibold mb-4">
                  Logistics
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Weight (G)</label>
                    <input
                      type="number"
                      value={form.weight}
                      onChange={(e) => updateForm("weight", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  {/* <div>
                    <label className={labelClass}>Insurance Val.</label>
                    <select
                      value={form.insuranceVal}
                      onChange={(e) => updateForm("insuranceVal", e.target.value)}
                      className={`${inputClass} appearance-none`}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div> */}
                </div>
              </div>

              <div className="bg-[#fbf9f7] border border-[#e5dfd7] rounded-2xl p-5">
                <p className="text-[9px] uppercase tracking-[2.5px] text-[#8b6b08] font-semibold mb-3">
                  Search Performance
                </p>
                <div className="bg-white border border-[#e0d9d0] rounded-xl p-4 mb-4">
                  <p className="text-[13px] font-semibold text-[#1a0dab] leading-tight mb-1">
                    {form.product || "Celestial Dawn Emerald Brooch"} |
                    Technoviaan Luxury
                  </p>
                  <p className="text-[11px] text-[#006621] mb-1">
                    technoviaan.com/p/{form.urlSlug || "celestial-dawn-emerald"}
                  </p>
                  <p className="text-[11px] text-[#4a4540] leading-[1.5] line-clamp-3">
                    {form.seoDescription ||
                      "Discover the unmatched elegance..."}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={labelClass}>SEO Description</label>
                    <span
                      className={`text-[10px] ${form.seoDescription.length > 150
                        ? "text-[#d94c3d]"
                        : "text-[#9a9388]"
                        }`}
                    >
                      {form.seoDescription.length}/160
                    </span>
                  </div>
                  <textarea
                    value={form.seoDescription}
                    onChange={(e) => updateForm("seoDescription", e.target.value)}
                    rows={3}
                    maxLength={160}
                    className="w-full bg-[#f0ebe1] border border-[#e0d9d0] rounded-xl px-4 py-3 text-[12px] text-black outline-none focus:border-[#8b6b08] transition resize-none placeholder:text-[#9a9388]"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDraft}
                  className="flex-1 h-[44px] border border-[#c5bfb8] text-black text-[11px] uppercase tracking-[1.5px] rounded-full hover:border-[#8b6b08] hover:text-[#8b6b08] transition"
                >
                  {draftSaved ? "Saved ✓" : "Save Draft"}
                </button>
                <button
                  type="submit"
                  // onClick={handlePublish}
                  className="flex-1 h-[44px] bg-[#8b6b08] text-white text-[11px] uppercase tracking-[1.5px] rounded-full hover:bg-[#a07c10] transition"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddProduct;