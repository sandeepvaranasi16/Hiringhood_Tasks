import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./pages/Home";
import RecipeDetails from "./pages/ReceipeDetails";
import AddEditRecipe from "./pages/AddEditRecipe";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CardHeader, Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00A36C",
    },
  },
  typography: {
    fontFamily: "Kanit",
  },  
});

const App: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/add" element={<AddEditRecipe />} />
              <Route path="/edit/:id" element={<AddEditRecipe />} />
            </Routes>
          </Router>
          <ToastContainer />
        </ThemeProvider>
      </Provider>
    </Container>
  );
};

export default App;
