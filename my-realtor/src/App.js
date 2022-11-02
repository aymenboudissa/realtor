import React from "react";
import Home from "./screens/Home";
import Offers from "./screens/Offers";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/header/Header";
import SignIn from "./screens/Sign-in/SignIn";
import Detail from "./screens/Detail/Detail";
import SignUp from "./screens/Sign-in/SignUp";
import ForgotPassword from "./screens/Sign-in/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:cat" element={<Offers />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/category/:cat/:id" element={<Detail />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
