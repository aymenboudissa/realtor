import React from "react";
import login from "../../assets/images/login.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./index.css";
import { Link } from "react-router-dom";
import OAuth from "../../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { toast } from "react-toastify";
const SignIn = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [show, setShow] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const [forgotPassword, setforgotPassword] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {}
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="container__categories sign__container">
      <div className="offers__title">
        <h1>Sign In</h1>
      </div>
      <div className="connect">
        <img src={login} alt="" className="image" />
        <form className="form" onSubmit={onSubmit}>
          <div className="">
            <input
              type="email"
              placeholder="Email adresse"
              name=""
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
          <button type="submit" className="btn__sign">
            Sign In
          </button>
          <div className="outline__display">
            <div className="outline"></div>
            <div className="text_or">OR</div>
            <div className="outline"></div>
          </div>
          <OAuth />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
