import React from "react";
import Category from "../category/Category";
import "./categories.css";
const Categories = () => {
  return (
    <div className="container__categories">
      <Category title={"Recent offers"} link={"/offers"} />
      <Category title={"Places for rent"} link={"/category/rent"} />
      <Category title={"Places for sale"} link={"/category/sale"} />
    </div>
  );
};

export default Categories;
