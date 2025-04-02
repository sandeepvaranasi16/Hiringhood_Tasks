import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, CircularProgress, Alert, Box } from "@mui/material";
import { RootState, AppDispatch } from "../store/store";
import { fetchTodos } from "../store/todoSlice";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import Container from "@mui/material/Container";
import { ReactComponent as EmptyIcon } from "../assets/emptyIcon.svg";

export const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, searchQuery, filter } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const filteredTodos = items
    .filter(
      (todo) => todo.title.toLowerCase().includes(searchQuery.toLowerCase()) // Search filtering
    )
    .filter((todo) => {
      if (filter === "COMPLETED") return todo.completed;
      if (filter === "PENDING") return !todo.completed;
      return true; // "All" case
    });

  return (
    <Container maxWidth="md">
      <List>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        ) : (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <EmptyIcon style={{ width: "40%", height: "auto" }} />
            <h3>Empty...</h3>
          </Box>
        )}
      </List>
      <TodoForm />
    </Container>
  );
};

export default TodoList;
