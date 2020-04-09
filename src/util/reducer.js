import {
  handleDecimal,
  handleNumber,
  handleOperator,
  handleEvaluate,
} from "./operations";

const initialState = {
  output: "0",
  formula: "",
  prevVal: null,
  evaluated: false,
};

function reducer(state, action) {
  const { type, value } = action;

  switch (type) {
    case "number":
      return handleNumber(state, value);
    case "decimal":
      return handleDecimal(state, value);
    case "operator":
      return handleOperator(state, value);
    case "evaluate":
      return handleEvaluate(state, value);

    case "clear":
      return { ...initialState };
    default:
      return { ...state };
  }
}

export { initialState, reducer };
