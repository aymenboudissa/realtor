import React from "react";
import "./index.css";
import Select from "../../components/Select";
const CreateList = () => {
  const [rent, setRent] = React.useState(false);
  const [parking, setParking] = React.useState(false);
  const [Furnished, setFurnished] = React.useState(false);
  const [offer, setOffer] = React.useState(false);
  const [beds, setBeds] = React.useState(1);
  const [baths, setBaths] = React.useState(1);
  const [Price, setPrice] = React.useState(50);
  const [formData, setformData] = React.useState({
    type: rent,
    name: "",
    beds: 1,
    baths: 1,
    parking: false,
    furnished: false,
    adresse: "",
    description: "",
    offer: false,
    price: 50,
    images: {
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
      image6: "",
    },
  });

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setformData((prevState) => ({
      ...prevState,
      type: rent,
      beds: beds,
      baths: baths,
      parking: parking,
      furnished: Furnished,
      offer: offer,
      price: Price,
    }));
    console.log(formData);
  };
  return (
    <section className="container__profile">
      <form onSubmit={onSubmit} className="profile__about" id="w-sm">
        <h2 className="title">Create a Listing</h2>
        <Select
          title={"Sell / Rent"}
          button1={"SELL"}
          button2={"RENT"}
          setType={setRent}
          type={rent}
        />
        <div className="input__name">
          <h3 className="list__title">Name</h3>
          <input
            type="text"
            name=""
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
              onChange={(event) =>
                setBeds(event.target.value.replace(/\D/, ""))
              }
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
              onChange={(event) =>
                setBaths(event.target.value.replace(/\D/, ""))
              }
            />
          </div>
        </div>
        <Select
          title={"Parking spot"}
          button1={"YES"}
          button2={"NO"}
          setType={setParking}
          type={parking}
        />
        <Select
          title={"Furnished"}
          button1={"YES"}
          button2={"NO"}
          setType={setFurnished}
          type={Furnished}
        />
        <div className="adress">
          <h3 className="list__title">Address</h3>
          <textarea
            name=""
            id="adresse"
            placeholder="Address"
            cols="30"
            className="text__area"
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="adress">
          <h3 className="list__title">Description</h3>
          <textarea
            className="text__area "
            name=""
            id="description"
            placeholder="Description"
            cols="30"
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="price__list">
          <h3 className="list__title">Regular Price</h3>
          <div className="list__beds-baths">
            <input
              type="number"
              className="inputPrice"
              name=""
              id="price"
              value={Price}
              onChange={(event) =>
                setPrice(event.target.value.replace(/\D/, ""))
              }
            />
            <p>$ / Month</p>
          </div>
        </div>
        <Select
          title={"Offer"}
          button1={"YES"}
          button2={"NO"}
          setType={setOffer}
          type={offer}
        />
        <div className="input__name">
          <h3 className="list__title">Images</h3>
          <p className="text-muet">
            The first image will be the cover (max 6).
          </p>
          <input
            type={"file"}
            name=""
            className="inputFile"
            id="name"
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type="submit" className="btn__sign">
          CREATE LISTING
        </button>
      </form>
    </section>
  );
};

export default CreateList;
