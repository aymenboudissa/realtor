import React from "react";
import Category from "../category/Category";
import "./categories.css";
import { db } from "../../firebase";
import { xtype } from "xtypejs";
import Spinner from "../spinner/Spinner";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const Categories = () => {
  const [offers, setOffers] = React.useState([]);
  const [rents, setRents] = React.useState([]);
  const [sales, setSale] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchListings(parametre, value, state) {
      const listingRef = collection(db, "listings");

      const q = query(
        listingRef,
        where(parametre, "==", value),
        orderBy("timestamp", "desc"),
        limit(4)
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      state(listings);
    }
    fetchListings("offer", true, setOffers);
    fetchListings("type", "sell", setSale);
    fetchListings("type", "rent", setRents);
    setLoading(false);
  }, []);
  return (
    <div className="container__categories">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {offers.length > 0 && (
            <Category
              key={1}
              title={"Recent offers"}
              link={"/offers"}
              values={offers}
            />
          )}
          {sales.length > 0 && (
            <Category
              key={2}
              title={"Places for sale"}
              link={"/category/sale"}
              values={sales}
            />
          )}
          {rents.length > 0 && (
            <Category
              key={3}
              title={"Places for rent"}
              link={"/category/rent"}
              values={rents}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
