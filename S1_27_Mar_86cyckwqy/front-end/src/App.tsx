// App.tsx
import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
const App = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Create a dynamic theme
  const theme = createTheme({
    palette: {
      mode: themeMode, // 'light' or 'dark'
      primary: { main: "#6C63FF", light: "#F7F7F7" },
      background: { default: themeMode === "dark" ? "#252525" : "#F7F7F7" },
    },
    typography: {
      fontFamily: "Kanit",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <CssBaseline /> {/* Ensures global dark mode styling */}
        <TodoHeader toggleTheme={toggleTheme} themeMode={themeMode} />
        <TodoList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
