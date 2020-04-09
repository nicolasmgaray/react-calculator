import {
  isOperator,
  hasDecimal,
  endsWithNegativeSign,
  endsWithOperator,
} from "./regex.js";

const handleNumber = (state, value) => {
  if (state.output.length >= 20) return { ...state };
  if (state.evaluated)
    return { ...state, evaluated: false, formula: value, output: value };
  let newOutput =
    state.output === "0" || isOperator.test(state.output)
      ? value
      : state.output + value;
  let newFormula = state.formula + value;
  return { ...state, output: newOutput, formula: newFormula };
};

const handleDecimal = (state, value) => {
  if (state.output.length >= 20 || hasDecimal(state.output))
    return { ...state };
  else
    return {
      ...state,
      output: state.output + value,
      formula: state.formula + value,
    };
};

const handleOperator = (state, value) => {
  let newState = { ...state };
  newState = { ...newState, output: value, evaluated: false };
  if (state.evaluated) {
    newState = { ...newState, formula: state.prevVal + value };
  } else if (!endsWithOperator.test(state.formula)) {
    newState = {
      ...newState,
      prevVal: state.formula,
      formula: state.formula + value,
    };
  } else if (!endsWithNegativeSign.test(state.formula)) {
    newState = {
      ...newState,
      formula:
        (endsWithNegativeSign.test(state.formula + value)
          ? state.formula
          : state.prevVal) + value,
    };
  } else if (value !== "‑") {
    newState = {
      ...newState,
      formula: state.prevVal + value,
    };
  }
  return { ...newState };
};

const handleEvaluate = (state, value) => {
  if (state.evaluated) return { ...state };
  let expression = state.formula;
  while (endsWithOperator.test(expression)) {
    expression = expression.slice(0, -1);
  }
  expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
  // eslint-disable-next-line
  let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
  return {
    ...state,
    output: answer.toString(),
    formula: expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer,
    prevVal: answer,
    evaluated: true,
  };
};

export { handleDecimal, handleNumber, handleOperator, handleEvaluate };
