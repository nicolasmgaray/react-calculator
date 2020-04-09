import {
  isOperator,
  hasDecimal,
  endsWithNegativeSign,
  endsWithOperator,
} from "./regex.js";

const initialState = {
  output: "0",
  formula: "",
  prevVal: null,
  evaluated: false,
};

function reducer(state, action) {
  const { type, label } = action;

  switch (type) {
    case "number":
      if (state.output.length >= 20) return { ...state };
      if (state.evaluated)
        return { ...state, evaluated: false, formula: label, output: label };
      let newOutput =
        state.output === "0" || isOperator.test(state.output)
          ? label
          : state.output + label;
      let newFormula = state.formula + label;
      return { ...state, output: newOutput, formula: newFormula };
    case "decimal":
      if (state.output.length >= 20 || hasDecimal(state.output))
        return { ...state };
      else
        return {
          ...state,
          output: state.output + label,
          formula: state.formula + label,
        };
    case "operator":
      let newState = { ...state };
      newState = { ...newState, output: label, evaluated: false };
      if (state.evaluated) {
        newState = { ...newState, formula: state.prevVal + label };
      } else if (!endsWithOperator.test(state.formula)) {
        newState = {
          ...newState,
          prevVal: state.formula,
          formula: state.formula + label,
        };
      } else if (!endsWithNegativeSign.test(state.formula)) {
        newState = {
          ...newState,
          formula:
            (endsWithNegativeSign.test(state.formula + label)
              ? state.formula
              : state.prevVal) + label,
        };
      } else if (label !== "‑") {
        newState = {
          ...newState,
          formula: state.prevVal + label,
        };
      }
      return { ...newState };
    case "evaluate":
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
        formula:
          expression.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + answer,
        prevVal: answer,
        evaluated: true,
      };

    case "clear":
      return { ...initialState };
    default:
      return { ...state };
  }
}

export { initialState, reducer };
