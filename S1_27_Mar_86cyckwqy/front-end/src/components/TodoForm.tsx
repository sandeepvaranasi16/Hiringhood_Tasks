import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Container,
  Stack,
} from "@mui/material";
import { ReactComponent as AddIcon } from "../assets/Add icon.svg";
import { addTodo } from "../store/todoSlice";
import api from "../services/api";

export const TodoForm = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const response = await api.post("/", { title: title.trim() });
      dispatch(addTodo(response.data));
      handleClose();
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("Failed to add todo. Please try again.");
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
              NEW NOTE
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  autoFocus
                  label="Input your note..."
                  variant="outlined"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError("");
                  }}
                  error={!!error}
                  helperText={error}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="inherit">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!title.trim()}>
                  Add Todo
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Box>
        <Stack
          bottom={{ xs: 16, sm: 32 }}
          sx={{
            position: "fixed",
            bottom: { xs: 16, sm: 32, md: 48 },
            right: { xs: 16, sm: 32, md: 48 },
          }}>
          <Fab
            onClick={handleOpen}
            aria-label="add"
            sx={{
              mb: 2,
              mr: { xs: 0, sm: 2, lg: 40 },
              bgcolor: "primary.main",
              ":hover": { bgcolor: "primary.dark" },
            }}>
            <AddIcon />
          </Fab>
        </Stack>
      </Container>
    </>
  );
};

export default TodoForm;
