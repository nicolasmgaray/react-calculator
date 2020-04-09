import React from "react";
import "./Button.css";

const Button = ({ value, id, handleClick }) => {
  return (
    <div className="button" onClick={handleClick} id={id} style={{ gridArea: id }}>
      {value}
    </div>
  );
};

export default Button;
