import React from "react";
import "./Display.css";

const Display = ({ formula = 0,output }) => {
  return (
    <div id="display-container">
      <div id="display-formula">{formula}</div>
      <div id="display">{output}</div>
    </div>
  );
};

export default Display;
