import { Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "../context/AuthContext";

const HeroContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center",
  backgroundColor: "#f5f5f5",
}));

const Hero = () => {
  const { logout } = useAuth();

  return (
    <HeroContainer>
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our App
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          A simple and secure authentication system using IndexedDB and
          localStorage.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={logout}
          size="large">
          Logout
        </Button>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
