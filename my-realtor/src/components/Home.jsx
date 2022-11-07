import React from "react";
import image from "../assets/images/home-1.jpg";
import image1 from "../assets/images/home-2.jpg";
import image2 from "../assets/images/home-3.jpg";
import image3 from "../assets/images/home-4.jpg";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const Home = ({ items }) => {
  return (
    <Link to={`/category/${items.data.type}/${items.id}`}>
      <div className="home">
        <div className="image">
          {" "}
          <img className="image__top" src={items.data.imgUrls[0]} alt="" />
        </div>
        <div className="home_date">
          <Moment fromNow>{items.data.timestamp?.toDate()}</Moment>
        </div>
        <div className="home__about">
          <div className="home__location">
            <HiLocationMarker className="realtor__location" />{" "}
            {items.data.adresse}
          </div>
          <div className="home__title"> {items.data.name}</div>
          <div className="home__price">${items.data.price}</div>
          <div className="home__components">
            <span className="home__bads">
              {items.data.beds > 1
                ? `${items.data.beds} Beds`
                : `${items.data.beds} Bed`}
            </span>{" "}
            <span className="home__baths">
              {items.data.baths > 1
                ? `${items.data.baths} Baths`
                : `${items.data.baths} Bath`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
