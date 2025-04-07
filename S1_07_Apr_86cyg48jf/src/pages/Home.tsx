import BalanceSummary from "../components/BalanceSummary";
import TransactionList from "../components/TransactionList";
import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => (
  <>
    <Container sx={{ p: 2, border: "1px solid #ccc", borderRadius: "10px" }}>
      <h1 style={{ textAlign: "center" }}>Budget Finance Tracker</h1>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          sx={{ bgcolor: "green", ":hover": { color: "white" } }}
          component={Link}
          to="/add">
          + Add New Transaction
        </Button>
      </Box>
      <BalanceSummary />
      <h2 style={{ textAlign: "center" }}>Transaction List</h2>
      <TransactionList />
    </Container>
  </>
);

export default Home;
