// import React from "react";
// import Aurora from "../../assets/images/Aurora.png";
// import Elysian from "../../assets/images/Elysian.png";
// import Heritage from "../../assets/images/Heritage.png";
// import Hummingbird from "../../assets/images/Hummingbird.png";
// import { ShoppingBag } from "lucide-react";
// import { useNavigate } from "react-router-dom";


// const products = [
//   {
//     id: 1,
//     name: "The Aurora Pin",
//     price: "₹3400",
//     image: Aurora,
//   },
//   {
//     id: 2,
//     name: "Elysian Leaf Pin",
//     price: "₹2900",
//     image: Elysian,
//     featured: true,
//   },
//   {
//     id: 3,
//     name: "Heritage Circle Brooch",
//     price: "₹4500",
//     image: Heritage,
//   },
//   {
//     id: 4,
//     name: "Hummingbird Jewel",
//     price: "₹5200",
//     image: Hummingbird,
//   },
// ];

// export default function TrendingProducts() {
//   const navigate = useNavigate();


//   // ADD TO CART
//   const handleAddToCart = async (product) => {

//     try {

//       // const user = JSON.parse(
//       //   localStorage.getItem("user")
//       // );

//       const storedUser =
//   localStorage.getItem("user");

// const user = storedUser
//   ? JSON.parse(storedUser)
//   : null;

//       // AGAR LOGIN NAHI HAI
//       // TAB BHI LOCAL CART ME ADD KAR DO
//       if (!user) {

//         dispatch(
//           addToCart({
//             ...product,
//             productId: product.id,
//             quantity: 1,
//           })
//         );

//         return;
//       }

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/cart/add`,
//         {
//           userId: user.id,

//           product: {
//             productId: product.id,
//             name: product.name,
//             image: product.image,
//             price: product.price,
//             quantity: 1,
//           },
//         }
//       );

//       if (response.data.success) {

//         dispatch(
//           setCart(response.data.cart.items)
//         );
//       }

//     } catch (error) {

//       console.log(
//         error.response?.data || error.message
//       );

//     }
//   };

//   return (
//     <section className="bg-[#f5f3f1] min-h-screen px-6 md:px-16 py-14">

//       {/* HEADING */}
//       <div className="flex items-start justify-between">

//         <div>
//           <p className="text-[13px] tracking-[4px] uppercase text-[#8d7b5d] font-medium">
//             Must Haves
//           </p>

//           <h2 className="mt-5 text-4xl md:text-5xl font-serif text-[#1f1f1f]">
//             Trending Now
//           </h2>
//         </div>

//         <button className="mt-10 border-b border-black text-sm tracking-[2px] uppercase pb-1 hover:opacity-70 transition">
//           View All
//         </button>

//       </div>

//       {/* DIVIDER */}
//       <div className="border-t border-[#d9d4cf] mt-10"></div>

//       {/* PRODUCTS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

//         {products.map((product) => (

//           <div
//             key={product.id}
//             className="
//               group
//               relative
//               bg-[#f8f6f4]
//               border
//               border-transparent
//               hover:border-[#bfb8b0]
//               rounded-sm
//               p-6
//               transition-all
//               duration-300
//               hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
//             "
//           >

//             {/* IMAGE */}
//             <div className="relative overflow-hidden bg-white">

//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-[300px] object-cover"
//               />

//               {/* ADD TO CART */}
//               {/* <button
//                 onClick={() =>
//                   handleAddToCart(product)
//                 } */}
//               <button
//                 onClick={() =>
//                   navigate("/productcart", {
//                     state: {
//                       product,
//                     },
//                   })
//                 }
//                 className="
//                   absolute
//                   bottom-4
//                   right-4
//                   w-14
//                   h-14
//                   rounded-full
//                   bg-white
//                   shadow-lg
//                   flex
//                   items-center
//                   justify-center
//                   opacity-0
//                   translate-y-3
//                   group-hover:opacity-100
//                   group-hover:translate-y-0
//                   transition-all
//                   duration-300
//                 "
//               >

//                 <ShoppingBag
//                   size={20}
//                   className="text-[#a67c2d]"
//                   strokeWidth={1.8}
//                 />

//               </button>
//             </div>

//             {/* INFO */}
//             <div className="text-center pt-7">

//               <h5
//                 className="
//                   text-[18px]
//                   leading-tight
//                   font-serif
//                   text-[#222]
//                   transition-colors
//                   duration-300
//                   group-hover:text-[#725B1E]
//                 "
//               >
//                 {product.name}
//               </h5>

//               <p className="mt-3 text-sm tracking-[3px] uppercase text-[#333]">
//                 {product.price}
//               </p>

//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



import React, {
  useEffect,
  useState,
} from "react";

import {
  ShoppingBag,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import placeholder from "../../assets/images/placeholder.jpg";

export default function TrendingProducts() {

  const navigate =
    useNavigate();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH NEW ARRIVAL PRODUCTS
  // =========================================

  useEffect(() => {

    const fetchProducts =
      async () => {

        try {

          const response =
            await axios.get(
              // `${import.meta.env.VITE_API_URL}/api/products/new-arrivals`
              `${import.meta.env.VITE_API_URL}/api/products/trending`

            );

          if (
            response.data.success
          ) {

            setProducts(
              response.data.products
            );

          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchProducts();

  }, []);

  return (

    <section className="bg-[#f5f3f1] px-4 sm:px-6 md:px-10 lg:px-16 py-14 sm:py-20">

      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[11px] sm:text-[13px] tracking-[4px] uppercase text-[#8d7b5d] font-medium">

            Must Haves

          </p>

          <h2
            className="mt-4 text-[42px] sm:text-[60px] leading-none text-[#111]"
            style={{
              fontFamily:
                '"Cormorant Garamond", serif',
            }}
          >

            Trending Now

          </h2>

        </div>

        {/* VIEW ALL */}

        <button
          onClick={() =>
            navigate(
              "/explore/new-arrivals"
            )
          }
          className="mt-3 border-b border-black text-[11px] sm:text-[13px] tracking-[2px] uppercase pb-1 hover:opacity-70 transition"
        >

          View All

        </button>

      </div>

      {/* DIVIDER */}

      <div className="border-t border-[#d8d2cc] mt-10"></div>

      {/* LOADING */}

      {loading && (

        <div className="py-20 text-center">

          Loading...

        </div>

      )}

      {/* PRODUCTS */}

      {!loading && (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-10 mt-12 sm:mt-16">

          {products
            .slice(0, 4)
            .map((product) => (

              <div
                key={product._id}
                className="group"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden bg-white">

                  <img
                    src={
                      product
                        .images?.[0] ||
                      placeholder
                    }
                    alt={
                      product.product
                    }
                    className="w-full h-[220px] sm:h-[320px] lg:h-[380px] object-cover"
                  />

                  {/* HOVER BUTTON */}

                  <button
                    onClick={() =>
                      navigate(
                        `/productcart/${product._id}`
                      )
                    }
                    className="
                      absolute
                      bottom-4
                      right-4
                      w-11
                      h-11
                      rounded-full
                      bg-white
                      flex
                      items-center
                      justify-center
                      shadow-md
                      opacity-0
                      translate-y-4
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all
                      duration-300
                    "
                  >

                    <ShoppingBag
                      size={18}
                      className="text-[#a67c2d]"
                    />

                  </button>

                </div>

                {/* INFO */}

                <div className="text-center pt-6">

                  <h3
                    className="text-[20px] sm:text-[24px] text-[#111]"
                    style={{
                      fontFamily:
                        '"Cormorant Garamond", serif',
                    }}
                  >

                    {product.product}

                  </h3>

                  <p className="mt-2 text-[13px] tracking-[4px] uppercase text-[#111]">

                    ₹
                    {(
                      product.salePrice ||
                      product.regularPrice
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

            ))}

        </div>

      )}

    </section>

  );
}
