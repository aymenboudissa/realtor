import React from "react";
import "./profile.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";
import { getAuth, updateProfile } from "firebase/auth";
import Homes from "../../components/Homes";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { async } from "@firebase/util";
import Home from "../../components/Home";
const Profile = () => {
  const auth = getAuth();
  const [Listings, setListings] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [Disabled, setDisabled] = React.useState(false);
  const { name, email } = formData;
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    navigate("/");
  };
  const onChange = (e) => {
    e.preventDefault();
    setFormData((prevSatate) => ({
      ...prevSatate,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  };

  React.useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");

      const q = query(
        listingRef,
        where("useRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  return (
    <div className="container__profile" id="container-profile">
      <div className="profile__about">
        <h2 className="title">My Profile</h2>
        <div className="input__name">
          <input
            className={!Disabled ? "input__profile" : "input__profile bg-red"}
            disabled={!Disabled}
            type="text"
            name=""
            id="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
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
              onClick={() => {
                Disabled && onSubmit();
                setDisabled((prev) => !prev);
              }}
            >
              {!Disabled ? "Edit" : "Apply change"}
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

      {!loading && Listings.length > 0 && (
        <section className="container__listings container">
          <h2 className="title">My listing</h2>
          <div className="homes">
            {Listings.map((listing) => (
              <Home items={listing} lists={Listings} setLists={setListings} />
            ))}
          </div>
          ;
        </section>
      )}
      {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illum excepturi at! */}
    </div>
  );
};

export default Profile;
