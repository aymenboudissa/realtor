import React from "react";
import image from "../assets/images/home-1.jpg";
import image1 from "../assets/images/home-2.jpg";
import image2 from "../assets/images/home-3.jpg";
import image3 from "../assets/images/home-4.jpg";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Link to={"/category/sale/" + 1}>
      <article className="home">
        <div className="image">
          {" "}
          <img className="image__top" src={image} alt="" />
        </div>
        <div className="home_date">3 DAYS AGO</div>
        <div className="home__about">
          <div className="home__location">
            <HiLocationMarker className="realtor__location" /> 15A Kulai,Port
            Road stMorris
          </div>
          <div className="home__title">Family Home in a Central !</div>
          <div className="home__price">$500</div>
          <div className="home__components">
            <span className="home__bads">2 Beds</span>{" "}
            <span className="home__baths">2 Baths</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Home;
