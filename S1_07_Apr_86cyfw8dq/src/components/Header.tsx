import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Brightness4, Brightness7, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ThunderstormTwoToneIcon from "@mui/icons-material/ThunderstormTwoTone";

interface Props {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header = ({ toggleTheme, isDarkMode }: Props) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          sx={{ flexGrow: 1, fontSize: { xs: "20px", sm: "30px" } }}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}>
          <ThunderstormTwoToneIcon color="warning" fontSize="large" /> Weather
          App
        </Typography>
        <Typography sx={{ fontSize: { xs: "15px", sm: "15px", md: "20px" } }}>
          To Search for specific city{" "}
        </Typography>
        <IconButton color="inherit" onClick={() => navigate("/search")}>
          <Search />
        </IconButton>
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
