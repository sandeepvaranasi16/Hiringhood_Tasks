import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./pages/Home";
import AddTransaction from "./components/TransactionForm";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddTransaction />} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
