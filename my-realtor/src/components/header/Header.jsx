import React from "react";
import logo from "../../assets/images/logo.jpg";
import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  const [active, setActive] = React.useState("home");
  return (
    <header className="header">
      <div className="container">
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        <ul className="nav">
          <Link to={"/"}>
            {" "}
            <li
              className={active === "home" ? "nav-list active" : "nav-list"}
              onClick={() => setActive("home")}
            >
              <a href="#">Home</a>
            </li>
          </Link>
          <Link to={"/offers"}>
            {" "}
            <li
              className={active === "offers" ? "nav-list active" : "nav-list"}
              onClick={() => setActive("offers")}
            >
              <a href="#offers">Offers</a>
            </li>
          </Link>

          <Link to={"/sign-in"}>
            {" "}
            <li
              className={active === "sign" ? "nav-list active" : "nav-list"}
              onClick={() => setActive("sign")}
            >
              <a href="#login">Sign in</a>
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
