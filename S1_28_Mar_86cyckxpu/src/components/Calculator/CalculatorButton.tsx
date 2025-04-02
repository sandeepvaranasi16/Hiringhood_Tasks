import React from "react";
import { Button } from "@mui/material";
import { CalculatorButtonProps } from "../../types/calculator.types";

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  fullWidth = true,
}) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      onClick={onClick}
      sx={{
        fontWeight: "bold",
        fontSize: "1.2rem",
        height: "56px",
        borderRadius: "8px",
      }}>
      {label}
    </Button>
  );
};

export default CalculatorButton;
