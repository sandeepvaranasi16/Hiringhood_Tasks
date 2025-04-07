import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/transactionsSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const TransactionForm = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "income",
    date: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.date) return;

    dispatch(
      addTransaction({
        id: uuidv4(),
        title: form.title,
        amount: +form.amount,
        type: form.type as "income" | "expense",
        date: form.date,
      })
    );

    navigate("/");
  };

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Card>
        <CardContent component="form" onSubmit={handleSubmit}>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{ mb: 2 }}>
            Back
          </Button>
          <Typography variant="h3" textAlign={"center"}>
            Add Transaction
          </Typography>
          <TextField
            label="Title*"
            name="title"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            label="Amount*"
            name="amount"
            type="number"
            fullWidth
            margin="normal"
            onChange={handleChange}
            InputProps={{ startAdornment: "₹" }}
          />
          <TextField
            select
            label="Type*"
            name="type"
            fullWidth
            value={form.type}
            onChange={handleChange}
            margin="normal">
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <TextField
            label="Date*"
            name="date"
            type="date"
            fullWidth
            margin="normal"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Add Transaction
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TransactionForm;
