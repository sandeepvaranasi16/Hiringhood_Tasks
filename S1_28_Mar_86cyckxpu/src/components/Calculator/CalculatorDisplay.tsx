import React from "react";
import { TextField, Paper } from "@mui/material";
import { CalculatorDisplayProps } from "../../types/calculator.types";

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
  onChange,
  onKeyDown,
  error,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        mb: 2,
        overflow: "hidden",
        borderRadius: "8px",
      }}>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        inputProps={{
          style: {
            textAlign: "right",
            fontSize: "2rem",
            padding: "16px",
            fontFamily: "monospace",
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
        }}
      />
    </Paper>
  );
};

export default CalculatorDisplay;
