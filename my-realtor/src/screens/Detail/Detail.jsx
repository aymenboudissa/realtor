import React from "react";
import Slider from "../../components/slider/Slider";
import { HiLocationMarker } from "react-icons/hi";
import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import "./detai.css";
const Detail = () => {
  const [contact, setContact] = React.useState(false);
  return (
    <div className="container__detail">
      <Slider />
      <article className="realtor__about container">
        <div className="realtor__detail">
          <div className="realtor__title">
            Family Home in a Central! - $1,545 / month
          </div>
          <div className="realtor__location">
            <HiLocationMarker className="location-icon" /> 15A Kulai Place, Port
            Macquarie, NSW 2444
          </div>
          <div className="realtor__info">
            <div className="realtor__for btn-realtor">For Rent</div>
            <div className="realtor__discount btn-realtor">$5 discount</div>
          </div>
          <p className="realtor__desc">
            <span className="desc">Description</span> - This three bedroom home
            is located in a quiet cul-de-sac close to shops, transport and
            schools. it features a large screened Queensland room off the
            kitchen also over looking the pool.
          </p>
          <div className="realtor__icons">
            <span className="icon__info">
              <FaBed /> 2 Beds
            </span>
            <span className="icon__info">
              <FaBath /> 2 Baths
            </span>
            <span className="icon__info">
              <FaParking /> Parking Spot
            </span>
            <span className="icon__info">
              <FaChair /> Furnished
            </span>
          </div>
          {contact ? (
            <div className="text-hidden">
              <p>Contact Sahand Ghavidel for the family home in a central!</p>
              <textarea
                className="text__area"
                name=""
                id=""
                placeholder="Message"
              ></textarea>
            </div>
          ) : (
            ""
          )}
          <button
            onClick={() => setContact((prev) => !prev)}
            className="btn__message"
          >
            CONTACT LANDLORD
          </button>
        </div>
        <div class="mapouter">
          <div class="gmap_canvas">
            <iframe
              width="600"
              height="406"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
            <a href="https://fmovies-online.net">fmovies</a>
            <br />
            <a href="https://www.embedgooglemap.net">
              google maps code for wordpress
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Detail;
