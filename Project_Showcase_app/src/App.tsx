import { useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme, { darkTheme } from "./theme/theme";
import Header from "./components/Header";
import ProjectShowcase from "./components/ProjectShowcase";
import SkillsRadar from "./components/SkillsRadar";
import InteractiveDemo from "./components/InteractiveDemo";
import Footer from "./components/Footer";
import { projects, skills, codeExamples } from "./data/mockData";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

        <ProjectShowcase projects={projects} />

        <SkillsRadar skills={skills} />

        <InteractiveDemo codeExamples={codeExamples} />

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
