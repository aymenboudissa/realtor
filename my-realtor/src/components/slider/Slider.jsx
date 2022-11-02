import React from "react";
import "./slider.css";
import image from "../../assets/images/home-1.jpg";
import image1 from "../../assets/images/home-2.jpg";
import image2 from "../../assets/images/home-3.jpg";
import image3 from "../../assets/images/home-4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import "swiper/css";
const slider = () => {
  return (
    <div className="container__slider">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
      >
        <SwiperSlide>
          <img src={image} className="image__slider" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image1} className="image__slider" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} className="image__slider" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} className="image__slider" alt="" />
        </SwiperSlide>
      </Swiper>
      <div className="home__title">Elegant,spacious three bedroom</div>
      <div className="homer__price">$1975 / month</div>
    </div>
  );
};

export default slider;
