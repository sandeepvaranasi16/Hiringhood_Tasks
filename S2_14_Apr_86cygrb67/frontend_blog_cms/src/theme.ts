// src/theme.ts
import { createTheme } from "@mui/material/styles";
import { green, teal } from "@mui/material/colors";

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: green,
            secondary: teal,
            background: {
              default: "#f0fdf4", // light green background
              paper: "#ffffff",
            },
          }
        : {
            primary: green,
            secondary: teal,
            background: {
              default: "#0d1b12", // dark green background
              paper: "#1a2e22",
            },
          }),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: `"Segoe UI", "Roboto", "Arial", sans-serif`,
    },
  });

export default getTheme;
