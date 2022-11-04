import React from "react";
const Select = ({ title, button1, button2, setType, type }) => {
  return (
    <div className="list__buttons">
      <h3 className="list__title">{title}</h3>
      <div className="lists__display">
        <div className="label">
          <button
            className={type ? "btn__list active" : "btn__list "}
            onClick={() => setType((prev) => !prev)}
          >
            {button1}
          </button>
        </div>
        <button
          className={type ? "btn__list " : "btn__list active"}
          onClick={() => setType((prev) => !prev)}
        >
          {button2}
        </button>
      </div>
    </div>
  );
};

export default Select;
