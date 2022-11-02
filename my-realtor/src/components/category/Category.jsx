import React from "react";
import "./category.css";
import { Link } from "react-router-dom";
import Homes from "../Homes";

const Category = ({ title, link }) => {
  return (
    <div className="container__category container">
      <div className="category__header">
        <h2 className="category__title">{title}</h2>
        <Link to={link}>
          <a href="" className="sous__title">
            Show more offers
          </a>
        </Link>
      </div>
      <Homes />
    </div>
  );
};

export default Category;
