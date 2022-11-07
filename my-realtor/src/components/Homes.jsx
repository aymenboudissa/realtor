import React from "react";
import Home from "./Home";

const Homes = ({ listings }) => {
  const getListings = () => {
    return listings.map((listing, index) => (
      <Home key={index} id={listing.id} listing={listing} />
    ));
  };
  return <section className="homes">{getListings()}</section>;
};

export default Homes;
