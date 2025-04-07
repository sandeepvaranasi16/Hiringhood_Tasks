import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useTransactions } from "../hooks/useTransactions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const BalanceSummary = () => {
  const { balance, income, expense } = useTransactions();
  return (
    <Card
      sx={{
        border: "1px solid #ccc",
        mt: 2,
      }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
        }}>
        <Typography variant="h5">Balance: ₹{balance}</Typography>
        <Stack sx={{ alignItems: "center" }}>
          <AddCircleIcon color="success" sx={{ fontSize: 25 }} />
          <Typography color="green">Income: ₹{income}</Typography>
        </Stack>
        <Stack sx={{ alignItems: "center" }}>
          <RemoveCircleIcon color="error" sx={{ fontSize: 25 }} />
          <Typography color="red">Expense: ₹{expense}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BalanceSummary;
