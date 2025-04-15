import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deleteTask } from "../store/taskSlice";
import {
  Box,
  Button,
  Typography,
  Chip,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!task) return <Typography>Task not found</Typography>;

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    navigate("/");
  };

  return (
    <Box>
      <Button component={Link} to="/" variant="outlined" sx={{float: "left", mt: 8}}>
        Home
      </Button>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        direction="row"
        spacing={2}
        mt={2}>
        <Box
        display={"flex"}
        flexDirection={"column"}
        gap={4}
          alignItems={"center"}
          justifyContent={"center"}
          p={2}
          sx={{
            width: 600,height: 400,
            border: "1px solid rgb(0, 0, 0)",
            borderRadius: 3,
          }}>
          <Typography variant="h4">{task.title}</Typography>
          <Typography mt={2}>{task.description}</Typography>
          <Stack direction="row" spacing={1} mt={2}>
            <Chip label={task.status} color="secondary" />
            <Chip label={task.priority} color="primary" />
            <Chip label={`Due: ${task.dueDate}`} />
          </Stack>
          <Stack direction="row" spacing={1} mt={1}>
            {task.tags?.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" />
            ))}
          </Stack>
          <Box mt={3}>
            <Button
              variant="contained"
              onClick={() => navigate(`/edit/${task.id}`)}>
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(true)}
              sx={{ ml: 2 }}>
              Delete
            </Button>
          </Box>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Delete Task?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this task?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Stack>
    </Box>
  );
}
