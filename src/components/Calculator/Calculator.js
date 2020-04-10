import React, { useReducer, useEffect } from "react";
import Display from "../Display";
import Button from "../Button";
import { reducer, initialState } from "../../util/reducer";
import { buttons } from "../../util/consts";
import "./Calculator.css";

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { output, formula } = state;

  const handleClick = ({ type, id, value }) => {
    return () => dispatch({ type: type, id: id, value: value });
  };

  const handleKeyPress = (e) => {
    const { key, keyCode } = e;

    if (key >= 0 && key <= 9) {
      dispatch({ type: "number", value: key });
    } else if (keyCode === 13) {
      dispatch({ type: "evaluate", value: key });
    } else if (key === "*" || key === "/" || key === "-" || key === "+") {
      dispatch({ type: "operator", value: key });
    } else if (key === ".") {
      dispatch({ type: "decimal", value: key });
    } else if (keyCode === 46) {
      dispatch({ type: "clear", value: key });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div id="calculator">
      <Display formula={formula} output={output}></Display>
      {buttons.map((x) => (
        <Button key={x.id} {...x} handleClick={handleClick(x)}></Button>
      ))}
    </div>
  );
};

export default Calculator;
