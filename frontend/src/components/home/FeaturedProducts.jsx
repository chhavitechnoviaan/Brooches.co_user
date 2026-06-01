import React from "react";
import royalHeritage from "../../assets/images/royal-heritage.png";
import vintageArchive from "../../assets/images/vintage-archive.png";
import weddingLuxe from "../../assets/images/wedding-luxe.png";

import { Link } from "react-router-dom";

const categoryData = [
  {
    id: 1,
    title: "Royal Heritage",
    image: royalHeritage,
  },
  {
    id: 2,
    title: "Vintage Archive",
    image: vintageArchive,
  },
  {
    id: 3,
    title: "Wedding Luxe",
    image: weddingLuxe,
  },
];

const FeaturedProducts = () => {

  return (

    <section className="w-full bg-[#f5f1f1] px-4 sm:px-6 md:px-10 py-14 sm:py-20 overflow-hidden">

      {/* HEADER */}
      <div className="text-center mb-10 sm:mb-14">

        <p className="text-[10px] sm:text-[12px] tracking-[3px] text-[#725B1E] uppercase font-sans mb-3">

          The Curation

        </p>

        <h2
          className="text-[32px] sm:text-[42px] md:text-[52px] text-[#1e1e1e] font-normal leading-tight"
          style={{
            fontFamily:
              '"Cormorant Garamond", serif',
          }}
        >

          Shop by Category

        </h2>

      </div>

      {/* CARDS */}
      {/* <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

        {categoryData.map((item) => (

          <div
            key={item.id}
            className="relative h-[420px] sm:h-[500px] md:h-[650px] lg:h-[80vh] overflow-hidden rounded-[4px] group cursor-pointer"
          >


            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />


            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-10 text-white">


              <h3
                className="text-[24px] sm:text-[30px] md:text-[36px] font-normal mb-2 leading-tight"
                style={{
                  fontFamily:
                    '"Cormorant Garamond", serif',
                }}
              >

                {item.title}

              </h3>

              <Link
                to={`/explore/collection/${item.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="inline-block group/link"
              >

                <span className="text-[10px] sm:text-[11px] tracking-[2px] uppercase font-sans">

                  Discover

                </span>

                <span className="block w-[55px] sm:w-[65px] h-[1px] bg-white mt-1 transition-all duration-300 group-hover/link:w-[90px]" />

              </Link>

            </div>

          </div>

        ))}

      </div> */}

<div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

  {categoryData.map((item) => (

    <div
      key={item.id}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md"
    >

      {/* IMAGE WRAPPER (IMPORTANT FIX) */}
      <div className="w-full aspect-[3/4] overflow-hidden">

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-4 left-4 text-white">

        <h3
          className="text-[20px] sm:text-[28px] font-medium"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {item.title}
        </h3>

        <Link
          to={`/explore/collection/${item.title
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="text-xs tracking-[2px] uppercase"
        >
          Discover →
        </Link>

      </div>

    </div>

  ))}

</div>
    </section>

  );
};

export default FeaturedProducts;
