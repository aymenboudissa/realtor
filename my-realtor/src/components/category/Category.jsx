import React from "react";
import "./category.css";
import { Link } from "react-router-dom";
import Homes from "../Homes";
import Home from "../Home";

const Category = ({ title, link, values }) => {
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
      <section className="homes">
        {values.map((item) => (
          <Home items={item} />
        ))}
      </section>
    </div>
  );
};

export default Category;
