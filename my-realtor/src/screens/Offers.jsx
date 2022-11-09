import React from "react";
import Content from "../components/content/Content";
import { useParams } from "react-router-dom";
const Offers = () => {
  let params = useParams() ?? "";

  return <Content cat={params.cat} />;
};

export default Offers;
