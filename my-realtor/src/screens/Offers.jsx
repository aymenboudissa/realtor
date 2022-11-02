import React from "react";
import Content from "../components/content/Content";
import { useParams } from "react-router-dom";
const Offers = () => {
  let params = useParams() ?? "";
  return (
    <div className="container__categories">
      <Content cat={params.cat} />
    </div>
  );
};

export default Offers;
