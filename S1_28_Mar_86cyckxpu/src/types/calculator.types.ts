export type Operation =
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "sqrt"
  | "="
  | "C"
  | "CE"
  | "BS";

export interface CalculatorState {
  display: string;
  firstOperand: number | null;
  operation: Operation | null;
  waitingForSecondOperand: boolean;
  error: string | null;
  memory: number | null;
}

export interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  fullWidth?: boolean;
}

export interface CalculatorDisplayProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  error: string | null;
}

export interface CalculatorKeypadProps {
  onNumberClick: (digit: string) => void;
  onOperationClick: (operation: Operation) => void;
  onDecimalClick: () => void;
}
