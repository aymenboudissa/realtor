import React from "react";
import "./Create-listing/index.css";

import Spinner from "../components/spinner/Spinner";
import { toast } from "react-toastify";
import { v4 } from "uuid";
// import { async } from "@firebase/util";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { async } from "@firebase/util";
const CreateList = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [listing, setListing] = React.useState(null);
  const params = useParams();
  const [formData, setformData] = React.useState({
    type: "rent",
    name: "",
    beds: 1,
    baths: 1,
    parking: false,
    furnished: false,
    adresse: "",
    description: "",
    offer: false,
    price: 0,
    discountedPrice: 0,
    images: {},
  });
  React.useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setformData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not existe");
      }
    }
    fetchListing();
  }, [params.id]);
  React.useEffect(() => {
    if (listing && listing.useRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [auth.currentUser.uid]);
  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.files) {
      setformData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setformData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  const StoreImage = (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}-${image.name}-${v4()}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +price) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
    // let gealocation = {};
    // let location;
    // if (!geolocationEnabled) {
    //   const response = await fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${adresse}&key=AIzaSyCuH6TEF_juse-Y-DcGrP_Y43IAOb7jFns`
    //   );
    //   const data = await response.json();
    //   console.log(data);
    // }]
    const imgUrls = await Promise.all(
      [...images].map((image) => StoreImage(image))
    ).catch((error) => {
      toast.error("Image not uploaded");
      return;
    });
    setLoading(false);

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      useRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = doc(db, "listings", params.id);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing Edited");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (loading) {
    return <Spinner />;
  }
  const {
    type,
    beds,
    baths,
    parking,
    furnished,
    offer,
    price,
    discountedPrice,
    images,
    description,
    adresse,
  } = formData;
  return (
    <section className="container__profile">
      <form onSubmit={onSubmit} className="profile__about" id="w-sm">
        <h2 className="title">Edite Listing</h2>
        <div className="list__buttons">
          <h3 className="list__title">Sell / Rent</h3>
          <div className="lists__display">
            <div className="label">
              <button
                type={"button"}
                id="type"
                value={"sell"}
                className={type === "sell" ? "btn__list active" : "btn__list "}
                onClick={onChange}
              >
                SELL
              </button>
            </div>
            <button
              type={"button"}
              id="type"
              value={"rent"}
              className={type === "rent" ? "btn__list active" : "btn__list "}
              onClick={onChange}
            >
              RENT
            </button>
          </div>
        </div>
        <div className="input__name">
          <h3 className="list__title">Name</h3>
          <input
            type="text"
            name=""
            min={"12"}
            max={"100"}
            required
            placeholder="Name"
            id="name"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="list__beds-baths">
          <div className="list-beds">
            <h3 className="list__title">Beds</h3>
            <input
              type="number"
              className="inputNumber"
              name=""
              id="beds"
              value={beds}
              min="0"
              max={"100"}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="list-baths">
            <h3 className="list__title">Baths</h3>
            <input
              type="number"
              className="inputNumber"
              name=""
              id="baths"
              value={baths}
              onChange={(event) => onChange(event)}
            />
          </div>
        </div>
        <div className="list__buttons">
          <h3 className="list__title">Parking spot</h3>
          <div className="lists__display">
            <div className="label">
              <button
                type={"button"}
                id="parking"
                value={true}
                className={
                  parking === true ? "btn__list active" : "btn__list  "
                }
                onClick={onChange}
              >
                Yes
              </button>
            </div>
            <button
              type={"button"}
              id="parking"
              value={false}
              className={parking === false ? "btn__list active" : " btn__list "}
              onClick={onChange}
            >
              No
            </button>
            {parking}
          </div>
        </div>
        <div className="list__buttons">
          <h3 className="list__title">Furnished</h3>
          <div className="lists__display">
            <div className="label">
              <button
                type={"button"}
                id="furnished"
                value={true}
                className={furnished ? "btn__list active" : "btn__list "}
                onClick={(e) => onChange(e)}
              >
                Yes
              </button>
            </div>
            <button
              type={"button"}
              id="furnished"
              value={false}
              className={!furnished ? "btn__list active" : "btn__list "}
              onClick={(e) => onChange(e)}
            >
              No
            </button>
          </div>
        </div>

        <div className="adress">
          <h3 className="list__title">Address</h3>
          <textarea
            name=""
            id="adresse"
            placeholder="Address"
            cols="30"
            className="text__area"
            onChange={(e) => onChange(e)}
          >
            {adresse}
          </textarea>
        </div>

        <div className="adress">
          <h3 className="list__title">Description</h3>
          <textarea
            className="text__area"
            name=""
            id="description"
            placeholder="Description"
            cols="30"
            onChange={(e) => onChange(e)}
          >
            {description}
          </textarea>
        </div>
        <div className="list__buttons">
          <h3 className="list__title">Offer</h3>
          <div className="lists__display">
            <div className="label">
              <button
                type={"button"}
                id="offer"
                value={true}
                className={offer ? "btn__list active" : "btn__list "}
                onClick={(e) => onChange(e)}
              >
                Yes
              </button>
            </div>
            <button
              type={"button"}
              id="offer"
              value={false}
              className={!offer ? "btn__list active" : "btn__list "}
              onClick={(e) => onChange(e)}
            >
              No
            </button>
          </div>
        </div>

        <div className="price__list">
          <h3 className="list__title">Regular Price</h3>
          <div className="list__beds-baths">
            <input
              type="number"
              className="inputPrice"
              name=""
              id="price"
              value={price}
              min={"50"}
              onChange={(event) => onChange(event)}
            />
            <p>$ / Month</p>
          </div>
        </div>
        {offer && (
          <div className="price__list">
            <h3 className="list__title">Regular Price</h3>
            <div className="list__beds-baths">
              <input
                type="number"
                className="inputPrice"
                name=""
                min={"50"}
                id="discountedPrice"
                value={discountedPrice}
                onChange={(event) => onChange(event)}
              />
            </div>
          </div>
        )}
        <div className="input__name">
          <h3 className="list__title">Images</h3>
          <p className="text-muet">
            The first image will be the cover (max 6).
          </p>
          <input
            accept=".jpg,.png,.jpeg"
            multiple
            required
            type={"file"}
            name=""
            className="inputFile"
            id="images"
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type="submit" className="btn__sign">
          Edite LISTING
        </button>
      </form>
    </section>
  );
};

export default CreateList;
