// import React, {
//   useState,
//   useEffect,
// } from "react";
// import { ChevronDown } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

// import category1 from "../../assets/images/category1.png";
// import category2 from "../../assets/images/category2.png";
// import category3 from "../../assets/images/category3.png";
// import category4 from "../../assets/images/category4.png";
// import category5 from "../../assets/images/category5.png";
// import category6 from "../../assets/images/category6.png";
// import category7 from "../../assets/images/category7.png";
// import category8 from "../../assets/images/category8.png";
// import placeholder from "../../assets/images/placeholder.jpg";
// import { useDispatch } from "react-redux";
// import {
//   addToCart,
//   setCart,
// } from "../../redux/slices/cartSlice";

// export default function ExploreNow() {
//   const dispatch = useDispatch();
//   const [products, setProducts] =
//     useState([]);
//   const fetchProducts = async () => {

//     try {

//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/products/all`
//       );

//       if (response.data.success) {

//         setProducts(
//           response.data.products
//         );

//       }

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   useEffect(() => {

//     fetchProducts();

//   }, []);
//   const handleAddToCart = async (
//     product
//   ) => {

//     try {

//       const storedUser =
//         localStorage.getItem("user");

//       const user = storedUser
//         ? JSON.parse(storedUser)
//         : null;

//       // IF USER LOGGED IN
//       if (user) {

//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/cart/add`,
//           {
//             userId: user.id,

//             product: {
//               productId: product._id,

//               name: product.product,

//               image:
//                 product.images?.[0] || placeholder,

//               price:
//                 `₹${(
//                   product.salePrice ||
//                   product.regularPrice
//                 ).toLocaleString()}`,
//               quantity: 1,
//             },
//           }
//         );

//         dispatch(
//           setCart(
//             response.data.cartItems
//           )
//         );

//       } else {

//         // GUEST USER
//         dispatch(
//           addToCart({
//             // productId: product.id,
//             // name: product.name,
//             // image: product.image,
//             // price: product.price,
//             // quantity: 1,
//             productId: product.id,
//             name: product.name,
//             image: product.image,
//             price: product.price,
//           })
//         );

//       }

//     } catch (error) {

//       console.log(
//         error.response?.data ||
//         error.message
//       );

//     }
//   };
//   const [openSort, setOpenSort] = useState(false);
//   const [visibleProducts, setVisibleProducts] = useState(8);
//   const [quantities, setQuantities] = useState({});

//   const navigate = useNavigate();
//   const { category } = useParams();

//   const handleLoadMore = () => {
//     setVisibleProducts((prev) => prev + 4);
//   };
//   const updateQuantity = (id, type) => {
//     setQuantities((prev) => {
//       const currentQty = prev[id] || 1;

//       return {
//         ...prev,
//         [id]:
//           type === "increase"
//             ? currentQty + 1
//             : currentQty > 1
//               ? currentQty - 1
//               : 1,
//       };
//     });
//   };
//   return (
//     <div className="bg-[#f6f4f4] min-h-screen">
//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="w-full flex items-center justify-center px-6 py-32">
//         <div className="text-center max-w-5xl">
//           <div className="mb-10 flex items-center justify-center gap-2 text-[12px] tracking-[4px] uppercase font-medium">
//             <span className="text-[#1f2f46]">Home</span>
//             <span className="text-[#1f2f46]">/</span>

//             <span className="text-[#1f2f46]">Collections</span>
//             <span className="text-[#1f2f46]">/</span>

//             <span className="text-[#a67c00]">
//               {category || "Marketplace"}
//             </span>
//           </div>

//           <h1
//             className="text-[#111] text-[30px] md:text-[72px] leading-none font-medium"
//             style={{
//               fontFamily: '"Cormorant Garamond", serif',
//             }}
//           >
//             Luxury Brooch Collections
//           </h1>

//           <p className="mt-8 mx-auto max-w-3xl text-[#2f3b46] text-[20px] leading-[1.5] font-light">
//             Discover a curated assembly of masterfully crafted pieces.
//             From heritage-inspired heirlooms to avant-garde contemporary
//             designs, each brooch is a testament to the artisan's soul.
//           </p>
//         </div>
//       </section>

//       <div className="min-h-screen bg-[#f7f5f3] px-10 py-5">
//         {/* SORT SECTION */}
//         <div className="flex items-center justify-end px-12 py-6">
//           <div className="relative flex items-center gap-6 border-l border-[#ddd6cc] pl-10">
//             <span className="text-[12px] tracking-[3px] uppercase text-[#6e665e]">
//               Sort By:
//             </span>

//             <button
//               onClick={() => setOpenSort(!openSort)}
//               className="group flex items-center gap-4 text-[15px] tracking-[3px] uppercase text-[#3e3a35]"
//             >
//               <span>Popularity</span>

//               <ChevronDown
//                 size={18}
//                 className={`transition-transform duration-500 ${openSort ? "rotate-180" : ""
//                   }`}
//               />
//             </button>

//             {/* DROPDOWN */}
//             <div
//               className={`absolute right-0 top-[60px] w-[260px] bg-[#f7f5f2] border border-[#d8d1c7] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 origin-top ${openSort
//                 ? "opacity-100 visible translate-y-0"
//                 : "opacity-0 invisible -translate-y-3"
//                 }`}
//             >
//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] bg-[#2f6fcc] text-white">
//                 Popularity
//               </button>

//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
//                 Newest
//               </button>

//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
//                 Price: Low To High
//               </button>

//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
//                 Price: High To Low
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* PRODUCT GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
//           {products.slice(0, visibleProducts).map((product) => (
//             <div key={product._id} className="group cursor-pointer">
//               {/* IMAGE BOX */}
//               <div className="relative overflow-hidden bg-[#ece8e3]">
//                 {/* DISCOUNT BADGE */}
//                 {product.badge && (
//                   <div className="absolute top-4 right-4 z-20 bg-[#d7b780] text-[9px] tracking-[1px] text-white px-3 py-1">
//                     {product.badge}
//                   </div>
//                 )}

//                 {/* IMAGE */}
//                 <div className="overflow-hidden">
//                   <img
//                     // src={product.image}
//                     src={
//                       product.images?.[0]
//                     } alt={product.product}
//                     className="w-full h-[440px] object-cover transition-all duration-700 group-hover:scale-110"
//                   />
//                 </div>

//                 {/* OVERLAY */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#a67c34]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

//                 {/* BUTTONS */}
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30">

//                   <button
//                     onClick={() =>
//                       handleAddToCart(product)
//                     }
4//                     className="w-full bg-[#8b6b08] text-white py-3 text-[12px] tracking-[1px] uppercase font-medium hover:bg-black transition"
//                   >
//                     Add To Cart
//                   </button>

//                   {/* BUY NOW */}


//                   <button
//                     onClick={() =>
//                       navigate(`/productcart/${product._id}`)
//                     }
//                     className="w-full mt-2 bg-black text-white py-3 text-[12px] tracking-[1px] uppercase font-medium border border-black hover:bg-white hover:text-black transition"
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               </div>

//               {/* PRODUCT INFO */}
//               <div className="mt-4">
//                 <div className="flex items-start justify-between">
//                   <h3
//                     className="text-[33px] leading-none text-[#4d433b] font-light"
//                     style={{
//                       fontFamily: "Cormorant Garamond, serif",
//                     }}
//                   >
//                     {/* {product.name} */}
//                     {product.product}
//                   </h3>

//                   {product.rating && (
//                     <div className="flex items-center gap-1 mt-1 text-[11px] text-[#7a6d61]">
//                       <span className="text-[#9c7c20]">★</span>
//                       {product.rating}
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-3 flex items-center gap-3">
//                   <span className="text-[16px] font-semibold text-[#1f1f1f]">
//                     ₹
//                     {(
//                       product.salePrice ||
//                       product.regularPrice
//                     ).toLocaleString()}
//                   </span>

//                   {product.regularPrice && (
//                     <span className="text-[#9f9488] line-through text-[13px]">
//                       {product.regularPrice.toLocaleString()}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* LOAD MORE BUTTON */}
//         {visibleProducts < products.length && (
//           <div className="flex justify-center mt-16">
//             <button
//               onClick={handleLoadMore}
//               className="border border-[#a8893b] text-[#8f6f1f] uppercase tracking-[2px] text-[11px] px-10 py-4 hover:bg-[#8f6f1f] hover:text-white transition duration-300"
//             >
//               Load More
//             </button>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }


import React, {
  useState,
  useEffect,
} from "react";

import { ChevronDown } from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import placeholder from "../../assets/images/placeholder.jpg";

import { useDispatch } from "react-redux";
import {
  useLocationData,
} from "../../context/LocationContext";
import {
  addToCart,
  setCart,
} from "../../redux/slices/cartSlice";

export default function ExploreNow() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const state =
  //   localStorage.getItem(
  //     "userState"
  //   ) || "";


  const { state } = useLocationData();
  // const {
  //   productType,
  //   category,
  // } = useParams();
  const {
    productType,
    category,
    collection,
  } = useParams();
  const [products, setProducts] =
    useState([]);

  const [openSort, setOpenSort] =
    useState(false);

  // 16 PRODUCTS INITIALLY
  const [visibleProducts, setVisibleProducts] =
    useState(16);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      console.log("Frontend State:", state);
      let response;

      if (
        window.location.pathname ===
        "/explore/new-arrivals"
      ) {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/new-arrivals?state=${state}`
        );
      }
      else if (collection) {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/collection/${collection}?state=${state}`
        );
      }
      else if (
        productType &&
        category
      ) {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/filter/${productType}/${category}?state=${state}`
        );
      }
      else {
        response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/all?state=${state}`
        );
      }

      if (response.data.success) {
        setProducts(
          response.data.products
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
// useEffect(() => {

//   fetchProducts();

//   setVisibleProducts(16);

// }, [
//   productType,
//   category,
//   collection,
// ]);
useEffect(() => {
  fetchProducts();
  setVisibleProducts(16);
}, [
  productType,
  category,
  collection,
  state,
]);

// ADD TO CART
const handleAddToCart = async (
  product
) => {

  try {

    const storedUser =
      localStorage.getItem("user");

    const user = storedUser
      ? JSON.parse(storedUser)
      : null;

    // LOGGED IN USER
    if (user) {

      const response =
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/cart/add`,
          {
            userId:
              user.id,

            product: {
              productId:
                product._id,

              name:
                product.product,

              image:
                product.images?.[0] ||
                placeholder,

              price:
                `₹${(
                  product.salePrice ||
                  product.regularPrice
                ).toLocaleString()}`,

              quantity: 1,
            },
          }
        );

      dispatch(
        setCart(
          response.data
            .cartItems
        )
      );

    }

    // GUEST USER
    else {

      dispatch(
        addToCart({
          productId:
            product._id,

          name:
            product.product,

          image:
            product.images?.[0] ||
            placeholder,

          price:
            product.salePrice ||
            product.regularPrice,

          quantity: 1,
        })
      );

    }

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message
    );

  }
};

// LOAD MORE
const handleLoadMore = () => {

  setVisibleProducts(
    (prev) => prev + 8
  );

};

return (

  <div className="bg-[#f6f4f4] min-h-screen overflow-hidden">

    <Navbar />

    {/* HERO SECTION */}
    <section className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-10 pt-32 pb-16 sm:pt-40 sm:pb-24">

      <div className="text-center max-w-6xl">

        {/* BREADCRUMB */}
        <div className="mb-6 sm:mb-10 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[12px] tracking-[2px] sm:tracking-[4px] uppercase font-medium">

          <span className="text-[#1f2f46]">
            Home
          </span>

          <span className="text-[#1f2f46]">
            /
          </span>

          <span className="text-[#1f2f46]">
            Collections
          </span>

          <span className="text-[#1f2f46]">
            /
          </span>

          <span className="text-[#a67c00]">

            {category
              ? category.replace(
                /-/g,
                " "
              )
              : "Marketplace"}

          </span>

        </div>

        {/* TITLE */}
        <h1
          className="text-[#111] text-[34px] sm:text-[52px] md:text-[68px] lg:text-[82px] leading-[1] font-medium"
          style={{
            fontFamily:
              '"Cormorant Garamond", serif',
          }}
        >
          Luxury Brooch Collections
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 sm:mt-8 mx-auto max-w-4xl text-[#2f3b46] text-[15px] sm:text-[18px] md:text-[20px] leading-[1.7] font-light px-2">

          Discover a curated assembly
          of masterfully crafted
          pieces. From
          heritage-inspired heirlooms
          to avant-garde contemporary
          designs, each brooch is a
          testament to the artisan's
          soul.

        </p>

      </div>

    </section>

    {/* MAIN */}
    <div className="bg-[#f7f5f3] px-4 sm:px-6 lg:px-10 py-5">

      {/* SORT */}
      <div className="flex justify-end mb-8 sm:mb-12">

        <div className="relative flex items-center gap-3 sm:gap-6 border-l border-[#ddd6cc] pl-4 sm:pl-8">

          <span className="text-[10px] sm:text-[12px] tracking-[2px] sm:tracking-[3px] uppercase text-[#6e665e]">
            Sort By:
          </span>

          <button
            onClick={() =>
              setOpenSort(
                !openSort
              )
            }
            className="flex items-center gap-2 sm:gap-4 text-[12px] sm:text-[15px] tracking-[2px] sm:tracking-[3px] uppercase text-[#3e3a35]"
          >

            <span>
              Popularity
            </span>

            <ChevronDown
              size={18}
              className={`transition-transform duration-500 ${openSort
                ? "rotate-180"
                : ""
                }`}
            />

          </button>

          {/* DROPDOWN */}
          <div
            className={`absolute right-0 top-[45px] sm:top-[60px] w-[220px] sm:w-[260px] bg-[#f7f5f2] border border-[#d8d1c7] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 origin-top z-50 ${openSort
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-3"
              }`}
          >

            <button className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 uppercase tracking-[2px] text-[12px] sm:text-[14px] bg-[#2f6fcc] text-white">
              Popularity
            </button>

            <button className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 uppercase tracking-[2px] text-[12px] sm:text-[14px] hover:bg-[#efe9de] transition">
              Newest
            </button>

            <button className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 uppercase tracking-[2px] text-[12px] sm:text-[14px] hover:bg-[#efe9de] transition">
              Price: Low To High
            </button>

            <button className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 uppercase tracking-[2px] text-[12px] sm:text-[14px] hover:bg-[#efe9de] transition">
              Price: High To Low
            </button>

          </div>

        </div>

      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12 lg:gap-y-16">

        {products
          .slice(
            0,
            visibleProducts
          )
          .map((product) => (

            <div
              key={product._id}
              className="group cursor-pointer"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden bg-[#ece8e3] rounded-md">

                {/* BADGE */}
                {product.badge && (

                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-[#d7b780] text-[8px] sm:text-[9px] tracking-[1px] text-white px-2 sm:px-3 py-1">

                    {product.badge}

                  </div>

                )}

                {/* PRODUCT IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={
                      product.images?.[0] ||
                      placeholder
                    }
                    alt={
                      product.product
                    }
                    className="w-full h-[220px] sm:h-[320px] lg:h-[440px] object-cover transition-all duration-700 group-hover:scale-110"
                  />

                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#a67c34]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* BUTTONS */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-[88%] opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-5 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500 z-30">

                  {/* ADD TO CART */}
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product
                      )
                    }
                    className="w-full bg-[#8b6b08] text-white py-2.5 sm:py-3 text-[10px] sm:text-[12px] tracking-[1px] uppercase font-medium hover:bg-black transition"
                  >
                    Add To Cart
                  </button>

                  {/* BUY NOW */}
                  <button
                    onClick={() =>
                      navigate(
                        `/productcart/${product._id}`
                      )
                    }
                    className="w-full mt-2 bg-black text-white py-2.5 sm:py-3 text-[10px] sm:text-[12px] tracking-[1px] uppercase font-medium border border-black hover:bg-white hover:text-black transition"
                  >
                    Buy Now
                  </button>

                </div>

              </div>

              {/* INFO */}
              <div className="mt-3 sm:mt-5">

                <div className="flex items-start justify-between gap-2">

                  {/* PRODUCT NAME */}
                  <h3
                    className="text-[20px] sm:text-[28px] lg:text-[33px] leading-none text-[#4d433b] font-light"
                    style={{
                      fontFamily:
                        "Cormorant Garamond, serif",
                    }}
                  >
                    {
                      product.product
                    }
                  </h3>

                  {/* RATING */}
                  {product.rating && (

                    <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px] text-[#7a6d61] shrink-0">

                      <span className="text-[#9c7c20]">
                        ★
                      </span>

                      {
                        product.rating
                      }

                    </div>

                  )}

                </div>

                {/* PRICE */}
                <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3">

                  <span className="text-[14px] sm:text-[16px] font-semibold text-[#1f1f1f]">

                    ₹
                    {(
                      product.salePrice ||
                      product.regularPrice
                    ).toLocaleString()}

                  </span>

                  {product.salePrice && (

                    <span className="text-[#9f9488] line-through text-[11px] sm:text-[13px]">

                      ₹
                      {product.regularPrice.toLocaleString()}

                    </span>

                  )}

                </div>

              </div>

            </div>

          ))}

      </div>

      {/* NO PRODUCTS */}
      {products.length === 0 && (

        <div className="text-center py-20">

          <h2 className="text-[24px] sm:text-[32px] text-[#444]">
            No Products Found
          </h2>

        </div>

      )}

      {/* LOAD MORE */}
      {visibleProducts <
        products.length && (

          <div className="flex justify-center mt-14 sm:mt-20">

            <button
              onClick={
                handleLoadMore
              }
              className="border border-[#a8893b] text-[#8f6f1f] uppercase tracking-[2px] text-[10px] sm:text-[11px] px-8 sm:px-10 py-3 sm:py-4 hover:bg-[#8f6f1f] hover:text-white transition duration-300"
            >
              Load More
            </button>

          </div>

        )}

    </div>

    <Footer />

  </div>
)
}









// import React, {
//   useState,
//   useEffect,
// } from "react";

// import { ChevronDown } from "lucide-react";

// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import axios from "axios";

// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

// import placeholder from "../../assets/images/placeholder.jpg";

// import { useDispatch } from "react-redux";

// import {
//   addToCart,
//   setCart,
// } from "../../redux/slices/cartSlice";

// export default function ExploreNow() {

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   // const { category } = useParams();
//   const {
//     productType,
//     category,
//   } = useParams();
//   const [products, setProducts] =
//     useState([]);

//   const [openSort, setOpenSort] =
//     useState(false);

//   const [visibleProducts, setVisibleProducts] =
//     useState(8);

//   const [quantities, setQuantities] =
//     useState({});

//   // FORMAT CATEGORY
//   const formattedCategory = category
//     ?.replace(/-/g, " ")
//     .toLowerCase();

//   // FETCH PRODUCTS
//   const fetchProducts = async () => {

//     try {

//       if (
//         productType &&
//         category
//       ) {

//         const response =
//           await axios.get(
//             `${import.meta.env.VITE_API_URL}/api/products/filter/${productType}/${category}`
//           );

//         if (
//           response.data.success
//         ) {

//           setProducts(
//             response.data.products
//           );

//         }

//       } else {

//         const response =
//           await axios.get(
//             `${import.meta.env.VITE_API_URL}/api/products/all`
//           );

//         if (
//           response.data.success
//         ) {

//           setProducts(
//             response.data.products
//           );

//         }

//       }

//     } catch (error) {

//       console.log(error);

//     }
//   };
// useEffect(() => {

//   fetchProducts();

// }, [productType, category]);

//   // ADD TO CART
//   const handleAddToCart = async (
//     product
//   ) => {

//     try {

//       const storedUser =
//         localStorage.getItem("user");

//       const user = storedUser
//         ? JSON.parse(storedUser)
//         : null;

//       // LOGGED IN USER
//       if (user) {

//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/cart/add`,
//           {
//             userId: user.id,

//             product: {
//               productId: product._id,

//               name: product.product,

//               image:
//                 product.images?.[0] ||
//                 placeholder,

//               price:
//                 `₹${(
//                   product.salePrice ||
//                   product.regularPrice
//                 ).toLocaleString()}`,

//               quantity: 1,
//             },
//           }
//         );

//         dispatch(
//           setCart(
//             response.data.cartItems
//           )
//         );

//       } else {

//         // GUEST USER
//         dispatch(
//           addToCart({
//             productId: product._id,
//             name: product.product,
//             image:
//               product.images?.[0] ||
//               placeholder,
//             price:
//               product.salePrice ||
//               product.regularPrice,
//             quantity: 1,
//           })
//         );

//       }

//     } catch (error) {

//       console.log(
//         error.response?.data ||
//         error.message
//       );

//     }
//   };

//   // LOAD MORE
//   const handleLoadMore = () => {

//     setVisibleProducts(
//       (prev) => prev + 4
//     );

//   };

//   // UPDATE QUANTITY
//   const updateQuantity = (
//     id,
//     type
//   ) => {

//     setQuantities((prev) => {

//       const currentQty =
//         prev[id] || 1;

//       return {
//         ...prev,

//         [id]:
//           type === "increase"
//             ? currentQty + 1
//             : currentQty > 1
//               ? currentQty - 1
//               : 1,
//       };
//     });
//   };

//   return (

//     <div className="bg-[#f6f4f4] min-h-screen">

//       <Navbar />

//       {/* HERO SECTION */}
//       <section className="w-full flex items-center justify-center px-6 py-32">

//         <div className="text-center max-w-5xl">

//           <div className="mb-10 flex items-center justify-center gap-2 text-[12px] tracking-[4px] uppercase font-medium">

//             <span className="text-[#1f2f46]">
//               Home
//             </span>

//             <span className="text-[#1f2f46]">
//               /
//             </span>

//             <span className="text-[#1f2f46]">
//               Collections
//             </span>

//             <span className="text-[#1f2f46]">
//               /
//             </span>

//             <span className="text-[#a67c00]">
//               {category
//                 ? category.replace(
//                   /-/g,
//                   " "
//                 )
//                 : "Marketplace"}
//             </span>

//           </div>

//           <h1
//             className="text-[#111] text-[30px] md:text-[72px] leading-none font-medium"
//             style={{
//               fontFamily:
//                 '"Cormorant Garamond", serif',
//             }}
//           >
//             Luxury Brooch Collections
//           </h1>

//           <p className="mt-8 mx-auto max-w-3xl text-[#2f3b46] text-[20px] leading-[1.5] font-light">

//             Discover a curated assembly
//             of masterfully crafted pieces.
//             From heritage-inspired
//             heirlooms to avant-garde
//             contemporary designs,
//             each brooch is a testament
//             to the artisan's soul.

//           </p>

//         </div>

//       </section>

//       {/* MAIN SECTION */}
//       <div className="min-h-screen bg-[#f7f5f3] px-10 py-5">

//         {/* SORT */}
//         <div className="flex items-center justify-end px-12 py-6">

//           <div className="relative flex items-center gap-6 border-l border-[#ddd6cc] pl-10">

//             <span className="text-[12px] tracking-[3px] uppercase text-[#6e665e]">
//               Sort By:
//             </span>

//             <button
//               onClick={() =>
//                 setOpenSort(!openSort)
//               }
//               className="group flex items-center gap-4 text-[15px] tracking-[3px] uppercase text-[#3e3a35]"
//             >

//               <span>
//                 Popularity
//               </span>

//               <ChevronDown
//                 size={18}
//                 className={`transition-transform duration-500 ${openSort
//                     ? "rotate-180"
//                     : ""
//                   }`}
//               />

//             </button>

//             {/* DROPDOWN */}
//             <div
//               className={`absolute right-0 top-[60px] w-[260px] bg-[#f7f5f2] border border-[#d8d1c7] shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 origin-top ${openSort
//                   ? "opacity-100 visible translate-y-0"
//                   : "opacity-0 invisible -translate-y-3"
//                 }`}
//             >

//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] bg-[#2f6fcc] text-white">
//                 Popularity
//               </button>

//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
//                 Newest
//               </button>

//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
//                 Price: Low To High
//               </button>

//               <button className="w-full text-left px-6 py-4 uppercase tracking-[2px] text-[14px] hover:bg-[#efe9de] transition">
//                 Price: High To Low
//               </button>

//             </div>

//           </div>

//         </div>

//         {/* PRODUCT GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">

//           {products
//             .slice(0, visibleProducts)
//             .map((product) => (

//               <div
//                 key={product._id}
//                 className="group cursor-pointer"
//               >

//                 {/* IMAGE BOX */}
//                 <div className="relative overflow-hidden bg-[#ece8e3]">

//                   {/* BADGE */}
//                   {product.badge && (

//                     <div className="absolute top-4 right-4 z-20 bg-[#d7b780] text-[9px] tracking-[1px] text-white px-3 py-1">

//                       {product.badge}

//                     </div>

//                   )}

//                   {/* IMAGE */}
//                   <div className="overflow-hidden">

//                     <img
//                       src={
//                         product.images?.[0] ||
//                         placeholder
//                       }
//                       alt={product.product}
//                       className="w-full h-[440px] object-cover transition-all duration-700 group-hover:scale-110"
//                     />

//                   </div>

//                   {/* OVERLAY */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#a67c34]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

//                   {/* BUTTONS */}
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30">

//                     {/* ADD TO CART */}
//                     <button
//                       onClick={() =>
//                         handleAddToCart(
//                           product
//                         )
//                       }
//                       className="w-full bg-[#8b6b08] text-white py-3 text-[12px] tracking-[1px] uppercase font-medium hover:bg-black transition"
//                     >
//                       Add To Cart
//                     </button>

//                     {/* BUY NOW */}
//                     <button
//                       onClick={() =>
//                         navigate(
//                           `/productcart/${product._id}`
//                         )
//                       }
//                       className="w-full mt-2 bg-black text-white py-3 text-[12px] tracking-[1px] uppercase font-medium border border-black hover:bg-white hover:text-black transition"
//                     >
//                       Buy Now
//                     </button>

//                   </div>

//                 </div>

//                 {/* PRODUCT INFO */}
//                 <div className="mt-4">

//                   <div className="flex items-start justify-between">

//                     <h3
//                       className="text-[33px] leading-none text-[#4d433b] font-light"
//                       style={{
//                         fontFamily:
//                           "Cormorant Garamond, serif",
//                       }}
//                     >
//                       {product.product}
//                     </h3>

//                     {product.rating && (

//                       <div className="flex items-center gap-1 mt-1 text-[11px] text-[#7a6d61]">

//                         <span className="text-[#9c7c20]">
//                           ★
//                         </span>

//                         {product.rating}

//                       </div>

//                     )}

//                   </div>

//                   {/* PRICE */}
//                   <div className="mt-3 flex items-center gap-3">

//                     <span className="text-[16px] font-semibold text-[#1f1f1f]">

//                       ₹
//                       {(
//                         product.salePrice ||
//                         product.regularPrice
//                       ).toLocaleString()}

//                     </span>

//                     {product.salePrice && (

//                       <span className="text-[#9f9488] line-through text-[13px]">

//                         ₹
//                         {product.regularPrice.toLocaleString()}

//                       </span>

//                     )}

//                   </div>

//                 </div>

//               </div>

//             ))}

//         </div>

//         {/* NO PRODUCTS */}
//         {products.length === 0 && (

//           <div className="text-center py-20">

//             <h2 className="text-[28px] text-[#444]">
//               No Products Found
//             </h2>

//           </div>

//         )}

//         {/* LOAD MORE */}
//         {visibleProducts <
//           products.length && (

//             <div className="flex justify-center mt-16">

//               <button
//                 onClick={handleLoadMore}
//                 className="border border-[#a8893b] text-[#8f6f1f] uppercase tracking-[2px] text-[11px] px-10 py-4 hover:bg-[#8f6f1f] hover:text-white transition duration-300"
//               >
//                 Load More
//               </button>

//             </div>

//           )}

//       </div>

//       <Footer />

//     </div>
//   );
// }







