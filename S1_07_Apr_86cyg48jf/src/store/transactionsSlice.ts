import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
