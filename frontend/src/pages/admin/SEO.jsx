import React, { useState } from "react";
import {
  FiSearch,
  FiGlobe,
  FiLink,
  FiFileText,
  FiImage,
  FiTag,
  FiCheckCircle,
  FiSettings,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";

export default function Seo() {
  const [seoData, setSeoData] = useState({
    pageTitle: "",
    metaDescription: "",
    keywords: "",
    slug: "",
    canonicalUrl: "",
    robots: "Index, Follow",
    ogTitle: "",
    ogDescription: "",
    twitterTitle: "",
    twitterDescription: "",
    imageAlt: "",
  });

  const [seoPages, setSeoPages] = useState([
    {
      id: 1,
      title: "Luxury Diamond Rings",
      slug: "/luxury-diamond-rings",
      status: "Indexed",
      keywords: "diamond ring, luxury jewellery",
    },
    {
      id: 2,
      title: "Gold Necklace Collection",
      slug: "/gold-necklace",
      status: "Optimized",
      keywords: "gold necklace, luxury gold",
    },
  ]);

  const handleChange = (e) => {
    setSeoData({
      ...seoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSeo = {
      id: Date.now(),
      title: seoData.pageTitle,
      slug: seoData.slug,
      status: "Indexed",
      keywords: seoData.keywords,
    };

    setSeoPages([newSeo, ...seoPages]);

    setSeoData({
      pageTitle: "",
      metaDescription: "",
      keywords: "",
      slug: "",
      canonicalUrl: "",
      robots: "Index, Follow",
      ogTitle: "",
      ogDescription: "",
      twitterTitle: "",
      twitterDescription: "",
      imageAlt: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-black text-2xl sm:text-3xl font-bold">
            SEO Management
          </h1>

          <p className="text-[#8b6b08] text-sm sm:text-base mt-2 font-medium">
            Manage search engine optimization and social visibility
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[430px_1fr] gap-6">
          <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] p-5 sm:p-6 h-fit">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-14 h-14 rounded-full bg-[#8b6b08]/10 border border-[#8b6b08]/20 flex items-center justify-center">
                <FiSearch className="text-[#8b6b08] text-2xl" />
              </div>

              <div>
                <h2 className="text-black text-xl font-bold">
                  Add SEO Details
                </h2>

                <p className="text-[#8b6b08] text-sm font-medium">
                  Optimize website pages and products
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Page Title
                </label>

                <div className="relative">
                  <FiFileText className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="pageTitle"
                    value={seoData.pageTitle}
                    onChange={handleChange}
                    placeholder="Luxury Diamond Rings"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Meta Description
                </label>

                <textarea
                  name="metaDescription"
                  value={seoData.metaDescription}
                  onChange={handleChange}
                  placeholder="Write SEO description"
                  rows={4}
                  className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none focus:border-[#8b6b08] text-black resize-none"
                />
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Meta Keywords
                </label>

                <div className="relative">
                  <FiTag className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="keywords"
                    value={seoData.keywords}
                    onChange={handleChange}
                    placeholder="diamond ring, luxury jewellery"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Slug URL
                </label>

                <div className="relative">
                  <FiLink className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="slug"
                    value={seoData.slug}
                    onChange={handleChange}
                    placeholder="/luxury-diamond-rings"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Canonical URL
                </label>

                <div className="relative">
                  <FiGlobe className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="canonicalUrl"
                    value={seoData.canonicalUrl}
                    onChange={handleChange}
                    placeholder="https://brooches.com/page"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Robots Settings
                </label>

                <select
                  name="robots"
                  value={seoData.robots}
                  onChange={handleChange}
                  className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                >
                  <option>Index, Follow</option>
                  <option>No Index, Follow</option>
                  <option>Index, No Follow</option>
                  <option>No Index, No Follow</option>
                </select>
              </div>

              <div>
                <label className="text-black text-sm font-semibold block mb-2">
                  Product Image Alt
                </label>

                <div className="relative">
                  <FiImage className="absolute top-1/2 -translate-y-1/2 left-4 text-[#8b6b08]" />

                  <input
                    type="text"
                    name="imageAlt"
                    value={seoData.imageAlt}
                    onChange={handleChange}
                    placeholder="Luxury Gold Necklace"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8b6b08] text-[#f8f6f3] py-3 rounded-xl font-semibold shadow-[0_0_30px_rgba(139,107,8,0.25)]"
              >
                SAVE SEO SETTINGS
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-14 h-14 rounded-full bg-[#8b6b08]/10 border border-[#8b6b08]/20 flex items-center justify-center">
                  <FiFacebook className="text-[#8b6b08] text-2xl" />
                </div>

                <div>
                  <h2 className="text-black text-xl font-bold">
                    Social SEO
                  </h2>

                  <p className="text-[#8b6b08] text-sm font-medium">
                    Facebook and Twitter optimization
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-black text-sm font-semibold block mb-2">
                     Title
                  </label>

                  <input
                    type="text"
                    name="ogTitle"
                    value={seoData.ogTitle}
                    onChange={handleChange}
                    placeholder="Facebook SEO title"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>

                <div>
                  <label className="text-black text-sm font-semibold block mb-2">
                    Description
                  </label>

                  <input
                    type="text"
                    name="ogDescription"
                    value={seoData.ogDescription}
                    onChange={handleChange}
                    placeholder="Facebook SEO description"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>

                <div>
                  <label className="text-black text-sm font-semibold block mb-2">
                    Twitter Title
                  </label>

                  <input
                    type="text"
                    name="twitterTitle"
                    value={seoData.twitterTitle}
                    onChange={handleChange}
                    placeholder="Twitter SEO title"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>

                <div>
                  <label className="text-black text-sm font-semibold block mb-2">
                    Twitter Description
                  </label>

                  <input
                    type="text"
                    name="twitterDescription"
                    value={seoData.twitterDescription}
                    onChange={handleChange}
                    placeholder="Twitter SEO description"
                    className="w-full bg-[#f8f6f3] border border-[#d8d2c7] rounded-xl px-4 py-3 outline-none focus:border-[#8b6b08] text-black"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#fbf9f7] border border-[#8b6b08]/20 rounded-2xl shadow-[0_0_40px_rgba(139,107,8,0.08)] overflow-hidden">
              <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-[#e4ddd0]">
                <div>
                  <h2 className="text-black text-xl sm:text-2xl font-bold">
                    SEO Pages
                  </h2>

                  <p className="text-[#8b6b08] text-sm font-medium mt-1">
                    Optimized pages and products
                  </p>
                </div>

                <div className="bg-[#8b6b08]/10 text-[#8b6b08] px-4 py-2 rounded-xl font-semibold text-sm">
                  {seoPages.length} Pages
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
                {seoPages.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#f8f6f3] border border-[#ddd5c8] rounded-2xl p-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <h2 className="text-black text-lg font-bold leading-8">
                          {item.title}
                        </h2>

                        <p className="text-[#8b6b08] text-sm font-semibold mt-1 break-all">
                          {item.slug}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <FiCheckCircle />
                        {item.status}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[#5f5f5f] text-sm mb-2">
                          Keywords
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.keywords
                            .split(",")
                            .map((keyword, index) => (
                              <span
                                key={index}
                                className="bg-[#8b6b08]/10 text-[#8b6b08] px-3 py-1 rounded-full text-xs font-semibold"
                              >
                                {keyword}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-6 border border-[#8b6b08]/20 text-[#8b6b08] py-3 rounded-xl font-semibold bg-[#8b6b08]/5 flex items-center justify-center gap-2">
                      <FiSettings />
                      Manage SEO
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}