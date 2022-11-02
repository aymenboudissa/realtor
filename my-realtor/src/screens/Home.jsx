import React from "react";

import Slider from "../components/slider/Slider";
import Categories from "../components/categories/Categories";
const Home = () => {
  return (
    <div className="container__home">
      <Slider />
      <Categories />
    </div>
  );
};

export default Home;
