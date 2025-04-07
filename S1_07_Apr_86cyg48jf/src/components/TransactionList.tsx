import { useDispatch } from "react-redux";
import { deleteTransaction } from "../store/transactionsSlice";
import { useTransactions } from "../hooks/useTransactions";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";

const TransactionList = () => {
  const { sortedTransactions } = useTransactions();
  const dispatch = useDispatch();

  return (
    <List>
      <AnimatePresence>
        {sortedTransactions.map((tx) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}>
            <ListItem
              divider
              secondaryAction={
                <IconButton onClick={() => dispatch(deleteTransaction(tx.id))}>
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemText
                primary={`${tx.type === "income" ? "+ " : "- "}${tx.title} -> ₹${
                  tx.amount
                }`}
                secondary={tx.date}
                sx={{ color: tx.type === "income" ? "green" : "red" }}
              />
            </ListItem>
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  );
};

export default TransactionList;
