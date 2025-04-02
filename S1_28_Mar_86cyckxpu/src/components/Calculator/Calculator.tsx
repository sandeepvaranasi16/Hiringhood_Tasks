import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKeypad from "./CalculatorKeypad";
import { useCalculator } from "../../hooks/useCalculator";

const Calculator: React.FC = () => {
  const {
    state,
    handleNumberInput,
    handleDecimalPoint,
    handleOperation,
    handleDisplayChange,
    handleKeyDown,
    clearError,
  } = useCalculator();

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          p: 3,
          mt: 5,
          borderRadius: "16px",
          background: "linear-gradient(145deg, #f0f0f0, #e6e6e6)",
          boxShadow: "10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff",
        }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 3,
          }}>
          Calculator
        </Typography>

        <Box sx={{ mb: 3 }}>
          <CalculatorDisplay
            value={state.display}
            onChange={handleDisplayChange}
            onKeyDown={handleKeyDown}
            error={state.error}
          />
        </Box>

        <CalculatorKeypad
          onNumberClick={handleNumberInput}
          onOperationClick={handleOperation}
          onDecimalClick={handleDecimalPoint}
        />
      </Paper>

      {/* Error Snackbar */}
      <Snackbar
        open={!!state.error}
        autoHideDuration={4000}
        onClose={clearError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={clearError} severity="error" sx={{ width: "100%" }}>
          {state.error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Calculator;
