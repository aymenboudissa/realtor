import React from "react";
import logo from "../../assets/images/logo.jpg";
import "./header.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const [active, setActive] = React.useState("Sign in");
  const location = useLocation();
  const auth = getAuth();
  const pathName = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActive("Profile");
      } else {
        setActive("Sign in");
      }
    });
  }, [auth]);
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
            <li className={pathName("/") ? "nav-list active" : "nav-list"}>
              <a href="#">Home</a>
            </li>
          </Link>
          <Link to={"/offers"}>
            {" "}
            <li
              className={pathName("/offers") ? "nav-list active" : "nav-list"}
            >
              <a href="#offers">Offers</a>
            </li>
          </Link>

          <Link to={"/profile"}>
            {" "}
            <li
              className={
                pathName("/sign-in") || pathName("/profile")
                  ? "nav-list active"
                  : "nav-list"
              }
            >
              <a href="#">{active}</a>
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
