import React, { useReducer } from "react";
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
