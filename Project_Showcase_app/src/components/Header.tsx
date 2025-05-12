import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  Container,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  Sunny as Sun,
  NightsStay as Moon,
  Menu as MenuIcon,
  GitHub,
  CodeSharp,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(90deg, #121212 0%, #1e1e1e 100%)"
      : "linear-gradient(90deg, #6200ea 0%, #7c4dff 100%)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.5)"
      : "0 4px 20px rgba(98, 0, 234, 0.2)",
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0, sm: 2 } }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <Logo variant="h5">
              <CodeSharp />
              The Expose
            </Logo>
          </motion.div>

          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                aria-label="toggle theme">
                {isDarkMode ? <Sun /> : <Moon />}
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleMenuClick}
                aria-label="menu">
                <MenuIcon />
              </IconButton>
              {isMenuOpen && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: 56,
                    left: 0,
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    padding: 2,
                  }}>
                  <Button color="primary" onClick={() => setIsMenuOpen(false)}>
                    Projects
                  </Button>
                  <Button color="primary" onClick={() => setIsMenuOpen(false)}>
                    Skills
                  </Button>
                  <Button color="primary" onClick={() => setIsMenuOpen(false)}>
                    About
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit">Projects</Button>
              <Button color="inherit">Skills</Button>
              <Button color="inherit">About</Button>
              <Button
                color="inherit"
                startIcon={<GitHub />}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer">
                GitHub
              </Button>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                aria-label="toggle theme">
                {isDarkMode ? <Sun /> : <Moon />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
