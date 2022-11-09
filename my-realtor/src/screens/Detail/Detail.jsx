import React, { useRef } from "react";
import Slider from "../../components/slider/Slider";
import { HiLocationMarker } from "react-icons/hi";
import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./detai.css";
import Spinner from "../../components/spinner/Spinner";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Contact from "../../components/Contact";
const Detail = () => {
  const params = useParams();
  let id = params.id;
  const [list, setList] = React.useState(null);
  const auth = getAuth();
  const [loading, setLoading] = React.useState(true);
  const [contact, setContact] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "listings", id);
      const querySnap = await getDoc(docRef);
      if (querySnap.exists()) {
        setList(querySnap.data());
      }
    }
    fetchListing();

    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container__detail">
      {list ? (
        <>
          <Slider images={list.imgUrls} />
          <article className="realtor__about container">
            <div className="realtor__detail">
              <div className="realtor__title">{list.name}</div>
              <div className="realtor__location">
                <HiLocationMarker className="location-icon" /> {list.adresse}
              </div>
              <div className="realtor__info">
                <div className="realtor__for btn-realtor">
                  For {list.type == "rent" ? "Rent" : "Sale"}
                </div>
                <div className="realtor__discount btn-realtor">
                  ${list.price} discount
                </div>
              </div>
              <p className="realtor__desc">
                <span className="desc">Description</span> -{list.description}
              </p>
              <div className="realtor__icons">
                <span className="icon__info">
                  <FaBed />{" "}
                  {list.beds > 1 ? `${list.beds} Beds` : `${list.beds} Bed`}
                </span>
                <span className="icon__info">
                  <FaBath />{" "}
                  {list.baths > 1
                    ? `${list.baths} Baths`
                    : `${list.baths} Bath`}
                </span>
                {list.parking && (
                  <span className="icon__info">
                    <FaParking /> Parking Spot
                  </span>
                )}
                {list.furnished && (
                  <span className="icon__info">
                    <FaChair /> Furnished
                  </span>
                )}
              </div>
              {contact ? <Contact id={list.useRef} product={list.name} /> : ""}

              {!contact && (
                <button
                  onClick={() => setContact((prev) => !prev)}
                  className="btn__message"
                >
                  CONTACT LANDLORD
                </button>
              )}
            </div>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width="600"
                  height="406"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginwidth="0"
                ></iframe>
                <br />
                <a href="https://www.embedgooglemap.net">
                  google maps code for wordpress
                </a>
              </div>
            </div>
          </article>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Detail;
