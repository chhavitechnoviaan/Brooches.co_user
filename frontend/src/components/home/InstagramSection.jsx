import { FaHeart } from "react-icons/fa";

import insta1 from "../../assets/images/insta1.png";
import insta2 from "../../assets/images/insta2.png";
import insta3 from "../../assets/images/insta3.png";
import insta4 from "../../assets/images/insta4.png";

const instagramData = [
  {
    id: 1,
    image: insta1,
  },
  {
    id: 2,
    image: insta2,
  },
  {
    id: 3,
    image: insta3,
  },
  {
    id: 4,
    image: insta4,
  },
];

const InstagramSection = () => {
  return (
    <section className="w-full bg-[#f5f2ef] py-14 px-2 lg:px-16 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-20">
        <h2
          className="
            text-[38px]
            leading-none
            text-[#111]
            font-light
            
          "
          style={{
            fontFamily: "Cormorant Garamond, serif",
          }}
        >
          Connect with us on Instagram
        </h2>

        <p className="mt-6 text-[20px] text-[#4c4c4c] font-light">
          Follow our editorial journey @brooches_co
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-[1750px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  ">
        {instagramData.map((item) => (
          <div
            key={item.id}
            className="
              relative
              overflow-hidden
              rounded-[6px]
              group
              cursor-pointer
            "
          >
            {/* Image */}
            <img
              src={item.image}
              alt=""
              className="
                w-full
                h-[520px]
                object-cover
                transition-all
                duration-700
                group-hover:scale-110
              "
            />

            {/* Overlay */}
            <div
              className="
                absolute
                inset-0
                bg-black/10
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-500
              "
            ></div>

            {/* Heart Icon */}
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                opacity-0
                scale-75
                group-hover:opacity-100
                group-hover:scale-100
                transition-all
                duration-500
              "
            >
              <div
                className="
                  w-[70px]
                  h-[70px]
                  rounded-full
                  bg-white/90
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <FaHeart className="text-[#c9a227] text-[28px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;