import { useState, useCallback } from "react";
import { Operation, CalculatorState } from "../types/calculator.types";
import {
  isValidNumber,
  performCalculation,
  formatDisplayValue,
  calculateSquareRoot,
  handleBackspace,
} from "../utils/calculatorUtils";

const initialState: CalculatorState = {
  display: "0",
  firstOperand: null,
  operation: null,
  waitingForSecondOperand: false,
  error: null,
  memory: null,
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  // Handle number input
  const handleNumberInput = useCallback((digit: string) => {
    setState((prevState) => {
      // Clear error if any
      if (prevState.error) {
        return {
          ...prevState,
          display: digit,
          error: null,
          waitingForSecondOperand: false,
        };
      }

      // If waiting for second operand, start a new input
      if (prevState.waitingForSecondOperand) {
        return {
          ...prevState,
          display: digit,
          waitingForSecondOperand: false,
        };
      }

      // Otherwise append to current display
      const newDisplay =
        prevState.display === "0" ? digit : prevState.display + digit;
      return {
        ...prevState,
        display: newDisplay,
      };
    });
  }, []);

  // Handle decimal point
  const handleDecimalPoint = useCallback(() => {
    setState((prevState) => {
      // Clear error if any
      if (prevState.error) {
        return {
          ...prevState,
          display: "0.",
          error: null,
          waitingForSecondOperand: false,
        };
      }

      // If waiting for second operand, start a new input with decimal
      if (prevState.waitingForSecondOperand) {
        return {
          ...prevState,
          display: "0.",
          waitingForSecondOperand: false,
        };
      }

      // Only add decimal if not already present
      if (!prevState.display.includes(".")) {
        return {
          ...prevState,
          display: prevState.display + ".",
        };
      }

      return prevState;
    });
  }, []);

  // Handle operations
  const handleOperation = useCallback((op: Operation) => {
    setState((prevState) => {
      // Clear error if any
      if (prevState.error && op !== "C") {
        return {
          ...prevState,
          error: null,
        };
      }

      // Clear all operation
      if (op === "C") {
        return initialState;
      }

      // Clear entry operation
      if (op === "CE") {
        return {
          ...prevState,
          display: "0",
        };
      }

      // Backspace operation
      if (op === "BS") {
        return {
          ...prevState,
          display: handleBackspace(prevState.display),
        };
      }

      // Handle square root
      if (op === "sqrt") {
        const value = parseFloat(prevState.display);
        const { result, error } = calculateSquareRoot(value);

        if (error) {
          return {
            ...prevState,
            error,
          };
        }

        return {
          ...prevState,
          display: result!.toString(),
          firstOperand: result,
          operation: null,
        };
      }

      // Parse the current display value
      const inputValue = parseFloat(prevState.display);

      // If we have a pending operation, perform it
      if (
        prevState.operation &&
        prevState.firstOperand !== null &&
        !prevState.waitingForSecondOperand
      ) {
        const { result, error } = performCalculation(
          prevState.firstOperand,
          inputValue,
          prevState.operation
        );

        if (error) {
          return {
            ...prevState,
            error,
          };
        }

        return {
          ...prevState,
          display: result!.toString(),
          firstOperand: result,
          operation: op === "=" ? null : op,
          waitingForSecondOperand: op !== "=",
        };
      }

      // No operation is pending, store the operand and operation
      return {
        ...prevState,
        firstOperand: inputValue,
        operation: op === "=" ? null : op,
        waitingForSecondOperand: op !== "=",
      };
    });
  }, []);

  // Handle display change from input field
  const handleDisplayChange = useCallback((value: string) => {
    if (value === "" || isValidNumber(value)) {
      setState((prevState) => ({
        ...prevState,
        display: value === "" ? "0" : formatDisplayValue(value),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        error: "Only numbers are allowed",
      }));
    }
  }, []);

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;

      // Handle number keys (0-9)
      if (/^[0-9]$/.test(key)) {
        handleNumberInput(key);
      }
      // Handle decimal point
      else if (key === ".") {
        handleDecimalPoint();
      }
      // Handle operations
      else if (key === "+") {
        handleOperation("+");
      } else if (key === "-") {
        handleOperation("-");
      } else if (key === "*") {
        handleOperation("*");
      } else if (key === "/") {
        handleOperation("/");
      } else if (key === "%") {
        handleOperation("%");
      } else if (key === "Enter" || key === "=") {
        handleOperation("=");
      } else if (key === "Escape") {
        handleOperation("C");
      } else if (key === "Delete") {
        handleOperation("CE");
      } else if (key === "Backspace") {
        handleOperation("BS");
      }
    },
    [handleNumberInput, handleDecimalPoint, handleOperation]
  );

  // Clear error
  const clearError = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  }, []);

  return {
    state,
    handleNumberInput,
    handleDecimalPoint,
    handleOperation,
    handleDisplayChange,
    handleKeyDown,
    clearError,
  };
};
