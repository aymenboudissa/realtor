import React from "react";
import Homes from "../Homes";
import "./content.css";
import Spinner from "../spinner/Spinner";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import Home from "../Home";
const Content = ({ cat }) => {
  const [lists, seListing] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    async function fetchListings() {
      const listingRef = collection(db, "listings");
      let q;
      cat
        ? (q = query(
            listingRef,
            where("type", "==", cat),
            orderBy("timestamp", "desc")
          ))
        : (q = query(
            listingRef,
            where("offer", "==", true),
            orderBy("timestamp", "desc")
          ));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      seListing(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);
  console.log(lists);
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container__categories " id="offers">
      <div className="container__offers ">
        <div className="offers__title">
          {cat ? <h1>Place for {cat}</h1> : <h1>Offers</h1>}
        </div>
        <section className="homes">
          {lists.map((item) => (
            <Home items={item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Content;
