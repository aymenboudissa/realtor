import spinner from "../../assets/Spinner.svg";
import "./spinner.css";
const Spinner = () => {
  return (
    <div className="container__spinner">
      <img src={spinner} className="image__spinner" alt="" />
    </div>
  );
};

export default Spinner;
