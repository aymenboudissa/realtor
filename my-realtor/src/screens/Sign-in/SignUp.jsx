import React from "react";
import login from "../../assets/images/login.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

import { db } from "../../firebase";

const SignIn = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const [show, setShow] = React.useState(false);
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      toast.success("Sign Up was success");
    } catch (error) {
      toast.error("Something went wrong with the regisration");
    }
  }
  return (
    <div className="container__categories sign__container">
      <div className="offers__title">
        <h1>Sign Up</h1>
      </div>
      <div className="connect">
        <img src={login} alt="" className="image" />
        <div className="form">
          <form onSubmit={onSubmit} className="form">
            <div className="">
              <input
                type="text"
                placeholder="Full name"
                name=""
                id="name"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="">
              <input
                type="email"
                placeholder="Email adresse"
                name="email"
                id="email"
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="passwordInput">
              <input
                type={show ? "text" : "password"}
                className=""
                placeholder="Password"
                name=""
                id="password"
                onChange={(e) => onChange(e)}
              />
              <div
                className="eyes__icon"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? (
                  <AiFillEyeInvisible className="" />
                ) : (
                  <AiFillEye className="" />
                )}
              </div>
            </div>

            <div className="connect__info">
              <div className="info__register">
                Don't have an account?{" "}
                <Link to={"/sign-in"}>
                  <button href="#" className="btn__register">
                    Sign In
                  </button>
                </Link>
              </div>
              <Link to={"/forgot-password"}>
                {" "}
                <button href="" className="btn__password">
                  Forgot password ?
                </button>
              </Link>
            </div>
            <button type="submit" className="btn__sign">
              Sign Up
            </button>
          </form>
          <div className="outline__display">
            <div className="outline"></div>
            <div className="text_or">OR</div>
            <div className="outline"></div>
          </div>
          <button className="btn__sign" id="google">
            <FcGoogle className="icon__google" /> CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
