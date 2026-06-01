// import React from "react";
// import { FaPlay, FaStar } from "react-icons/fa";
// import heroBg from "../../assets/banners/hero-bg2.png";
// import testimonialBg from "../../assets/images/testimonial1.png";
// import testimonialBg2 from "../../assets/images/testimonial2.png";

// const testimonials = [
//   {
//     id: 1,
//     image: testimonialBg,
//     text: `"Brooches.co represents the pinnacle of jewelry design. The craftsmanship is about preserving a heritage of elegance."`,
//     name: "ELIZABETH VANDERBILT",
//     role: "Fashion Curator, Milan",
//   },
//   {
//     id: 2,
//     image: testimonialBg2,
//     text: `"The architectural series is a masterclass in modern luxury. Each piece is a conversation starter."`,
//     name: "MARCUS CHENG",
//     role: "Design Director, London",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="relative w-full bg-[#f5f2ef] py-28 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0 opacity-50">
//         <img
//           src={heroBg}
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-[#f5f2ef]/85"></div>

//       {/* Content */}
//       <div className="relative max-w-[1700px] mx-auto px-6 lg:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {testimonials.map((item) => (
//             <div
//               key={item.id}
//               className="
//                 bg-[#fbf9f7]
//                 rounded-[14px]
//                 shadow-[0_10px_40px_rgba(0,0,0,0.06)]
//                 px-8
//                 lg:px-14
//                 py-12
//                 flex
//                 flex-col
//                 md:flex-row
//                 items-center
//                 gap-8
//                 min-h-[360px]
//               "
//             >
//               {/* Image */}
//               <div className="relative w-[170px] h-[170px] shrink-0 overflow-hidden rounded-[4px]">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />

//                 {/* Play Button */}
//                 <button
//                   className="
//                     absolute
//                     inset-0
//                     m-auto
//                     w-[54px]
//                     h-[54px]
//                     rounded-full
//                     bg-[#8b6a12]
//                     flex
//                     items-center
//                     justify-center
//                     transition
//                     hover:scale-105
//                   "
//                 >
//                   <FaPlay className="text-white text-[12px] ml-[2px]" />
//                 </button>
//               </div>

//               {/* Text Content */}
//               <div className="flex flex-col">
//                 {/* Stars */}
//                 <div className="flex items-center gap-[7px] mb-6">
//                   {[...Array(5)].map((_, index) => (
//                     <FaStar
//                       key={index}
//                       className="text-[#8b6a12] text-[16px]"
//                     />
//                   ))}
//                 </div>

//                 {/* Review Text */}
//                 <p
//                   className="
//                     text-[#2d2d2d]
//                     text-[20px]
//                     leading-[1.8]
//                     italic
//                     font-light
//                     max-w-[470px]
//                   "
//                   style={{
//                     fontFamily: "Cormorant Garamond, serif",
//                   }}
//                 >
//                   {item.text}
//                 </p>

//                 {/* User Info */}
//                 <div className="mt-8">
//                   <h3 className="tracking-[4px] text-[15px] font-semibold text-[#1f1f1f]">
//                     {item.name}
//                   </h3>

//                   <p className="text-[15px] text-[#555] mt-2">
//                     {item.role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;


import React from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import heroBg from "../../assets/banners/hero-bg2.png";
import testimonialBg from "../../assets/images/testimonial1.png";
import testimonialBg2 from "../../assets/images/testimonial2.png";

const testimonials = [
  {
    id: 1,
    image: testimonialBg,
    text: `"Brooches.co represents the pinnacle of jewelry design. The craftsmanship is about preserving a heritage of elegance."`,
    name: "ELIZABETH VANDERBILT",
    role: "Fashion Curator, Milan",
  },
  {
    id: 2,
    image: testimonialBg2,
    text: `"The architectural series is a masterclass in modern luxury. Each piece is a conversation starter."`,
    name: "MARCUS CHENG",
    role: "Design Director, London",
  },
];

const Testimonials = () => {
  return (
    <section className="relative w-full bg-[#f5f2ef] py-14 md:py-20 lg:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-50">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#f5f2ef]/85"></div>

      {/* Content */}
      <div className="relative max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#fbf9f7]
                rounded-[14px]
                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                p-6
                sm:p-8
                lg:px-14
                lg:py-12
                flex
                flex-col
                md:flex-row
                items-center
                md:items-start
                text-center
                md:text-left
                gap-6
                lg:gap-8
                min-h-auto
                lg:min-h-[360px]
              "
            >
              {/* Image */}
              <div
                className="
                  relative
                  w-[140px]
                  h-[140px]
                  sm:w-[160px]
                  sm:h-[160px]
                  lg:w-[170px]
                  lg:h-[170px]
                  shrink-0
                  overflow-hidden
                  rounded-[4px]
                "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                {/* Play Button */}
                <button
                  className="
                    absolute
                    inset-0
                    m-auto
                    w-[46px]
                    h-[46px]
                    sm:w-[50px]
                    sm:h-[50px]
                    lg:w-[54px]
                    lg:h-[54px]
                    rounded-full
                    bg-[#8b6a12]
                    flex
                    items-center
                    justify-center
                    transition
                    hover:scale-105
                  "
                >
                  <FaPlay className="text-white text-[10px] sm:text-[12px] ml-[2px]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center md:items-start">
                {/* Stars */}
                <div className="flex items-center gap-[5px] sm:gap-[7px] mb-4 sm:mb-6">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="text-[#8b6a12] text-[14px] sm:text-[16px]"
                    />
                  ))}
                </div>

                {/* Review */}
                <p
                  className="
                    text-[#2d2d2d]
                    text-[16px]
                    sm:text-[18px]
                    lg:text-[20px]
                    leading-[1.7]
                    lg:leading-[1.8]
                    italic
                    font-light
                    max-w-full
                    lg:max-w-[470px]
                  "
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  {item.text}
                </p>

                {/* User Info */}
                <div className="mt-6 lg:mt-8">
                  <h3
                    className="
                      tracking-[2px]
                      sm:tracking-[3px]
                      lg:tracking-[4px]
                      text-[13px]
                      sm:text-[14px]
                      lg:text-[15px]
                      font-semibold
                      text-[#1f1f1f]
                    "
                  >
                    {item.name}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#555] mt-2">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;