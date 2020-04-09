const isOperator = /[x/+‑]/;

const endsWithOperator = /[x+‑/]$/;

const hasDecimal = (str) => str.includes('.')

const endsWithNegativeSign = /‑$/;

export {isOperator,hasDecimal,endsWithNegativeSign,endsWithOperator}