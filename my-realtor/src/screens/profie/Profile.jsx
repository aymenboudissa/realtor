import React from "react";
import "./profile.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { getAuth } from "firebase/auth";
const Profile = () => {
  const auth = getAuth();
  const [formData, setFormData] = React.useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [Disabled, setDisabled] = React.useState(true);
  const { name, email } = formData;
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <div className="container__profile" id="container-profile">
      <div className="profile__about">
        <h2 className="title">My Profile</h2>
        <div className="input__name">
          {Disabled == true ? (
            <input
              className="input__profile"
              disabled
              type="text"
              name=""
              id="name"
              value={name}
            />
          ) : (
            <input
              className="input__profile bg-red"
              type="text"
              name=""
              id="name"
              value={name}
            />
          )}
        </div>
        <div className="input__email">
          <input
            className="input__profile "
            disabled
            type="email"
            name=""
            id="email"
            value={email}
          />
        </div>
        <div className="profile__change">
          <p>
            Do Want to change your name ?{" "}
            <a
              href="#"
              className="btn__register"
              onClick={() => setDisabled((prev) => !prev)}
            >
              {Disabled ? "Edit" : "Apply change"}
            </a>{" "}
          </p>
          <Link to={"/sign-in"}>
            <a href="#Sign-out" className="btn__password" onClick={logOut}>
              Sign Out
            </a>
          </Link>
        </div>
        <Link to={"/create-listing"}>
          {" "}
          <button className="btn__sign" id="btn__insert">
            <FcHome className="icon__home" /> SELL OR RENT YOUR HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
