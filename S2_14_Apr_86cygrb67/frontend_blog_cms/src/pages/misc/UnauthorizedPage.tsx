import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const UnauthorizedPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" gutterBottom>
        403 - Unauthorized
      </Typography>
      <Typography variant="body1" mb={2}>
        You don’t have permission to access this page.
      </Typography>
      <Button
        variant="contained"
        onClick={
          role !== "Admin" ? () => navigate("/dashboard") : () => navigate("/")
        }>
        Go Home
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
