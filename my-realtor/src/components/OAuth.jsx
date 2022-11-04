import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  const OnGoogleclick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  };
  return (
    <button
      type="submit"
      className="btn__sign"
      id="google"
      onClick={OnGoogleclick}
    >
      <FcGoogle className="icon__google" /> CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;
