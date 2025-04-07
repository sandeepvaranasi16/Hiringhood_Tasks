import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useTransactions = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    sortedTransactions,
    income,
    expense,
    balance,
  };
};
