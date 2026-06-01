import heritageImg from "../../assets/images/ourstory.png";

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-[#f4f1ef] py-28 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1450px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
        
        {/* LEFT CONTENT */}
        <div className="max-w-[720px]">
          {/* Small Heading */}
          <p className="uppercase tracking-[3px] text-[11px] text-[#8a6a1f] mb-8">
            Our Story
          </p>

          {/* Main Heading */}
          <h2
            className="
              text-[56px]
              leading-[1.1]
              text-[#111]
              font-medium
              mb-8
            "
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Heritage & Artistry
          </h2>

          {/* Description */}
          <p className="text-[20px] leading-[2] text-[#6b6b6b] font-light">
            Founded on the principles of classical jewelry making,
            Brooches.co bridges the gap between historical grandeur and
            modern minimalism. Every piece is hand-finished by master
            artisans in our atelier, using only the finest 18k gold and
            ethically sourced gemstones.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-20 mt-14">
            <div>
              <h3
                className="text-[34px] text-[#111] leading-none"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                40+ Years
              </h3>

              <p className="uppercase tracking-[3px] text-[10px] text-[#888] mt-2">
                Craft Heritage
              </p>
            </div>

            <div>
              <h3
                className="text-[38px] text-[#111] leading-none"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                100% Ethical
              </h3>

              <p className="uppercase tracking-[2px] text-[10px] text-[#888] mt-2">
                Sourced Materials
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            className="
              mt-14
              uppercase
              tracking-[2px]
              text-[12px]
              border-b
              border-[#111]
              pb-1
              text-[#111]
              hover:opacity-70
              transition
            "
          >
            Learn More About Us
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <img
              src={heritageImg}
              alt="Heritage"
              className="
                w-[520px]
                h-[720px]
                object-cover
              "
            />

            {/* Floating Box */}
            <div
              className="
                absolute
                -bottom-10
                -left-12    
                bg-[#e8cd74]
                w-[240px]
                h-[240px]
                flex
                items-end
                p-6
              "
            >
              <p
                className="
                  text-[30px]
                  leading-[1.2]
                  text-[#111]
                "
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                }}
              >
                Pure Gold
                <br />
                Edition
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;