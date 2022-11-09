import React from "react";
import "./slider.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import "swiper/css";
const slider = ({ images, list }) => {
  const getList = () => {
    let array = [];
    if (list) {
      array = images.map((image) => {
        return (
          <>
            <SwiperSlide>
              <img
                src={image.data.imgUrls[0]}
                className="image__slider"
                alt=""
              />
              <div className="home__title">images.name{image.data.name}</div>

              <div className="homer__price">${image.data.price} / month</div>
            </SwiperSlide>
          </>
        );
      });
    } else {
      array = images.map((image) => {
        return (
          <SwiperSlide>
            <img src={image} className="image__slider" alt="" />
          </SwiperSlide>
        );
      });
    }
    return array;
  };

  return (
    <div className="container__slider">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
      >
        {getList()}
      </Swiper>
    </div>
  );
};

export default slider;
