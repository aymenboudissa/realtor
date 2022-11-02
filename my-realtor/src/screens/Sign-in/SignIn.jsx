import React from "react";
import login from "../../assets/images/login.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./index.css";
import { Link } from "react-router-dom";
const SignIn = () => {
  const toggle = () => {
    setRegister((prev) => !prev);
  };
  const [show, setShow] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [forgotPassword, setforgotPassword] = React.useState(false);
  return (
    <div className="container__categories sign__container">
      <div className="offers__title">
        <h1>Sign In</h1>
      </div>
      <div className="connect">
        <img src={login} alt="" className="image" />
        <div className="form">
          <div className="">
            <input type="email" placeholder="Email adresse" name="" id="" />
          </div>

          <div className="passwordInput">
            <input
              type={show ? "text" : "password"}
              className=""
              placeholder="Password"
              name=""
              id=""
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
              <Link to={"/sign-up"}>
                {" "}
                <button href="#" className="btn__register">
                  Register
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
          <button className="btn__sign">Sign Up</button>
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
