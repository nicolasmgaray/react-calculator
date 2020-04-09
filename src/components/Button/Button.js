import React from "react";
import "./Button.css";

const Button = ({ label, id, handleClick }) => {
  return (
    <div className="button" onClick={handleClick} id={id} style={{ gridArea: id }}>
      {label}
    </div>
  );
};

export default Button;
