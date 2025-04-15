import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

import { CssBaseline } from "@mui/material";
import { CustomThemeProvider } from "./ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemeProvider>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </CustomThemeProvider>
  </StrictMode>
);
