import React from "react";
import login from "../../assets/images/login.jpg";
import { toast } from "react-toastify";
import "./index.css";
import { Link } from "react-router-dom";
import OAuth from "../../components/OAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [formData, setFormData] = React.useState("");
  const onChange = (e) => {
    setFormData(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, formData);
      toast.success("Email was send");
    } catch (error) {
      toast.success("Could not send reset password");
    }
  };

  return (
    <div className="container__categories sign__container">
      <div className="offers__title">
        <h1>Forgot Password</h1>
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

          <div className="connect__info">
            <div className="info__register">
              Don't have an account?{" "}
              <Link to={"/sign-in"}>
                <button href="#" className="btn__register">
                  Register
                </button>
              </Link>
            </div>
            <Link to={"/sign-up"}>
              {" "}
              <button href="" className="btn__password">
                Sign in instead
              </button>
            </Link>
          </div>
          <button type="submit" className="btn__sign">
            SEND RESET EMAIL
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
