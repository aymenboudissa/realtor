import React from "react";
import image from "../assets/images/home-1.jpg";
import image1 from "../assets/images/home-2.jpg";
import image2 from "../assets/images/home-3.jpg";
import image3 from "../assets/images/home-4.jpg";
import { HiLocationMarker } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import Moment from "react-moment";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Home = ({ items, onEdit, onDelete, lists, setLists }) => {
  const navigate = useNavigate();
  const id = items.id;
  const Delete = async () => {
    if (window.confirm("Are you shure your wante to delete")) {
      await deleteDoc(doc(db, "listings", id));
      const updateList = lists.filter((listing) => listing.id !== id);
      setLists(updateList);
      toast.success("Succesfully deleted the listing");
    }
  };
  const Edite = () => {
    navigate(`/edite-listing/${id}`);
  };
  return (
    <>
      <div className="home">
        <Link to={`/category/${items.data.type}/${id}`}>
          <div className="image">
            {" "}
            <img className="image__top" src={items.data.imgUrls[0]} alt="" />
          </div>
        </Link>
        <div className="home_date">
          <Moment fromNow>{items.data.timestamp?.toDate()}</Moment>
        </div>
        <div className="home__about">
          <div className="home__location">
            <HiLocationMarker className="realtor__location" />{" "}
            {items.data.adresse}
          </div>
          <div className="home__title"> {items.data.name}</div>
          <div className="home__price">${items.data.price}</div>
          <div className="home__components">
            <span className="home__bads">
              {items.data.beds > 1
                ? `${items.data.beds} Beds`
                : `${items.data.beds} Bed`}
            </span>{" "}
            <span className="home__baths">
              {items.data.baths > 1
                ? `${items.data.baths} Baths`
                : `${items.data.baths} Bath`}
            </span>
          </div>
        </div>
        {onDelete && <FaTrashAlt onClick={Delete} className="icon__delete" />}
        {onEdit && <AiFillEdit onClick={Edite} className="icon__edite" />}
      </div>
    </>
  );
};

export default Home;
