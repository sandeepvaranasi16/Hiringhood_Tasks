import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6200ea",
      light: "#9d46ff",
      dark: "#0a00b6",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00bfa5",
      light: "#5df2d6",
      dark: "#008e76",
      contrastText: "#000000",
    },
    error: {
      main: "#f50057",
      light: "#ff5983",
      dark: "#bb002f",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900",
      contrastText: "#000000",
    },
    info: {
      main: "#2196f3",
      light: "#6ec6ff",
      dark: "#0069c0",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c853",
      light: "#5efc82",
      dark: "#009624",
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 400,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 400,
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: "dark",
    primary: {
      main: "#bb86fc",
      light: "#eeb8ff",
      dark: "#8858c8",
      contrastText: "#000000",
    },
    secondary: {
      main: "#03dac6",
      light: "#66fff8",
      dark: "#00a896",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.6)",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
  },
});

export default theme;
