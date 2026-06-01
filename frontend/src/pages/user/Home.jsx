import React from "react";
import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/home/HeroSection";
import FeaturedProducts from "../../components/home/FeaturedProducts"
import TrendingProducts from "../../components/home/TrendingProducts";
import NewArrivals from '../../components/home/NewArrivals';
import Testimonials from "../../components/home/Testimonials";
import WhyChooseUs from "../../components/home/WhyChooseUs"
import InstagramSection from "../../components/home/InstagramSection"
import Footer from "../../components/common/Footer"

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturedProducts/>
      <TrendingProducts />
      <NewArrivals />
      <Testimonials />
      <WhyChooseUs/>
      <InstagramSection/>
      <Footer/>
    </div>
  );
};

export default Home;