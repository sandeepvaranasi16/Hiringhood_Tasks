import { Operation } from "../types/calculator.types";

// Check if value is a valid number
export const isValidNumber = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

// Perform calculation based on the operation
export const performCalculation = (
  firstOperand: number,
  secondOperand: number,
  operation: Operation
): { result: number | null; error: string | null } => {
  let result: number | null = null;
  let error: string | null = null;

  try {
    switch (operation) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "*":
        result = firstOperand * secondOperand;
        break;
      case "/":
        if (secondOperand === 0) {
          error = "Division by zero is not allowed";
          return { result, error };
        }
        result = firstOperand / secondOperand;
        break;
      case "%":
        if (secondOperand === 0) {
          error = "Modulo by zero is not allowed";
          return { result, error };
        }
        result = firstOperand % secondOperand;
        break;
      default:
        result = secondOperand;
    }

    // Check for NaN or Infinity result
    if (!isFinite(result)) {
      error = "Invalid calculation result";
      result = null;
    }

    return { result, error };
  } catch (e) {
    return { result: null, error: "Calculation error occurred" };
  }
};

// Format display value for better readability
export const formatDisplayValue = (value: string): string => {
  // If the value is just "0", return it as is
  if (value === "0") return value;

  // Remove leading zeros for non-decimal numbers
  if (value.length > 1 && value[0] === "0" && value[1] !== ".") {
    return value.slice(1);
  }

  return value;
};

// Handle square root operation
export const calculateSquareRoot = (
  value: number
): { result: number | null; error: string | null } => {
  if (value < 0) {
    return {
      result: null,
      error: "Cannot calculate square root of a negative number",
    };
  }

  return { result: Math.sqrt(value), error: null };
};

// Handle backspace functionality
export const handleBackspace = (value: string): string => {
  if (value.length <= 1) {
    return "0";
  }
  return value.slice(0, -1);
};
