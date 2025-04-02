import React from "react";
import Grid from "@mui/material/Grid";
import CalculatorButton from "./CalculatorButton";
import { CalculatorKeypadProps, Operation } from "../../types/calculator.types";


const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onNumberClick,
  onOperationClick,
  onDecimalClick,
}) => {
  return (
    <Grid container spacing={1}>
      {/* First row - Clear functions and basic operations */}
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="C"
          onClick={() => onOperationClick("C")}
          color="error"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="CE"
          onClick={() => onOperationClick("CE")}
          color="warning"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="<-"
          onClick={() => onOperationClick("BS")}
          color="info"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="÷"
          onClick={() => onOperationClick("/")}
          color="secondary"
        />
      </Grid>

      {/* Second row - Numbers 7-9 and multiplication */}
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="7"
          onClick={() => onNumberClick("7")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="8"
          onClick={() => onNumberClick("8")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="9"
          onClick={() => onNumberClick("9")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="×"
          onClick={() => onOperationClick("*")}
          color="secondary"
        />
      </Grid>

      {/* Third row - Numbers 4-6 and subtraction */}
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="4"
          onClick={() => onNumberClick("4")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="5"
          onClick={() => onNumberClick("5")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="6"
          onClick={() => onNumberClick("6")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="-"
          onClick={() => onOperationClick("-")}
          color="secondary"
        />
      </Grid>

      {/* Fourth row - Numbers 1-3 and addition */}
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="1"
          onClick={() => onNumberClick("1")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="2"
          onClick={() => onNumberClick("2")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="3"
          onClick={() => onNumberClick("3")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="+"
          onClick={() => onOperationClick("+")}
          color="secondary"
        />
      </Grid>

      {/* Fifth row - Advanced operations, zero, decimal and equals */}
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="√"
          onClick={() => onOperationClick("sqrt")}
          color="info"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="0"
          onClick={() => onNumberClick("0")}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton label="." onClick={onDecimalClick} color="primary" />
      </Grid>
      <Grid size={{ xs: 3, md: 3 }}>
        <CalculatorButton
          label="%"
          onClick={() => onOperationClick("%")}
          color="info"
        />
      </Grid>

      {/* Additional row for modulo */}
      <Grid size={{ xs: 12, md: 12 }}>
        <CalculatorButton
          label="="
          onClick={() => onOperationClick("=")}
          color="success"
        />
      </Grid>
    </Grid>
  );
};

export default CalculatorKeypad;
