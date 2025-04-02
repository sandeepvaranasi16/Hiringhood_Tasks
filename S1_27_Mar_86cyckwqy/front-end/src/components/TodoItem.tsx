import { useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import { ReactComponent as DeleteIcon } from "../assets/trash-hover.svg";
import { ReactComponent as EditIcon } from "../assets/editIcon.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { ReactComponent as Delete } from "../assets/trash.svg";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "../store/todoSlice";
import { Todo } from "../types/todo.types";
import api from "../services/api";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [hover, setHover] = useState(false);
  const [hoverDelete, setHoverDelete] = useState(false);

  const handleToggle = async () => {
    try {
      await api.patch(`/${todo._id}`, { completed: !todo.completed });
      dispatch(toggleTodo(todo._id));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/${todo._id}`);
      dispatch(deleteTodo(todo._id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      try {
        await api.patch(`editTitle/${todo._id}`, { title: editText });
        dispatch(editTodo({ id: todo._id, title: editText }));
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else if (event.key === "Escape") {
      setIsEditing(false); // Cancel edit on Esc
      setEditText(todo.title); // Reset text
    }
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton
            edge="end"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleEditClick}
            sx={{ mr: 1 }}>
            {hover ? <EditIcon /> : <Edit />}
          </IconButton>
          <IconButton
            onMouseEnter={() => setHoverDelete(true)}
            onMouseLeave={() => setHoverDelete(false)}
            edge="end"
            onClick={handleDelete}>
            {hoverDelete ? <DeleteIcon /> : <Delete />}
          </IconButton>
        </>
      }
      divider>
      <Checkbox edge="start" checked={todo.completed} onChange={handleToggle} />

      {isEditing ? (
        <TextField
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus
          variant="standard"
          fullWidth
        />
      ) : (
        <ListItemText
          primary={todo.title}
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "grey" : "text.primary",
          }}
        />
      )}
    </ListItem>
  );
};

export default TodoItem;
