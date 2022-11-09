import React from "react";
import Category from "../category/Category";
import "./categories.css";
import { db } from "../../firebase";
import { xtype } from "xtypejs";
import Spinner from "../spinner/Spinner";
import Slider from "../slider/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const Categories = () => {
  const [offers, setOffers] = React.useState(null);
  const [rents, setRents] = React.useState(null);
  const [sales, setSale] = React.useState(null);
  const [lists, setList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    async function fetchListings(parametre, value, state, slider) {
      const listingRef = collection(db, "listings");
      let q;
      !slider
        ? (q = query(
            listingRef,
            where(parametre, "==", value),
            orderBy("timestamp", "desc"),
            limit(4)
          ))
        : (q = query(listingRef, orderBy("timestamp", "desc"), limit(5)));
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
    fetchListings("", "", setList, true);
    setLoading(false);
  }, []);
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {offers && sales && rents ? (
        <div>
          <Slider images={lists} list={true} />

          <div className="container__categories">
            <>
              <Category
                key={1}
                title={"Recent offers"}
                link={"/offers"}
                values={offers}
              />

              <Category
                key={2}
                title={"Places for sale"}
                link={"/category/sell"}
                values={sales}
              />
              <Category
                key={3}
                title={"Places for rent"}
                link={"/category/rent"}
                values={rents}
              />
            </>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Categories;
