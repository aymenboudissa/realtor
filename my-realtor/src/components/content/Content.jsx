import React from "react";
import Homes from "../Homes";
import "./content.css";
const Content = ({ cat }) => {
  return (
    <div className="container__offers ">
      <div className="offers__title">
        {cat ? <h1>Place for {cat}</h1> : <h1>Offers</h1>}
      </div>
      <Homes />
    </div>
  );
};

export default Content;
