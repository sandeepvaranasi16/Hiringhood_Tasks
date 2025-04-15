import {
  Autocomplete,
  Box,
  Button,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { addTask, updateTask } from "../store/taskSlice";
import { taskSchema } from "../hooks/useTaskForm";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskPriority, TaskStatus } from "../types/task";

export default function TaskFormPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingTask = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  const defaultTask: Task = {
    id: uuidv4(),
    title: "",
    description: "",
    dueDate: "",
    priority: "Low" as TaskPriority,
    status: "To Do" as TaskStatus,
    tags: [],
  };

  const formik = useFormik<Task>({
    initialValues: existingTask ?? defaultTask,
    validationSchema: taskSchema,
    onSubmit: (values) => {
      if (existingTask) dispatch(updateTask(values));
      else dispatch(addTask(values));
      navigate("/");
    },
  });

  return (
    <Box
      sx={{ p: { xs: 1, md: 4, lg: 8 }, width: "80%" }}
      component="form"
      onSubmit={formik.handleSubmit}>
      <Button component={Link} to="/" variant="outlined" sx={{ float: "left" }}>
        Home
      </Button>
      <Typography
        variant="h4"
        fontSize={{ xs: "1.5rem", md: "2rem" }}
        fontWeight={"bold"}
        textAlign={"center"}>
        {existingTask ? "Edit Task" : "Add Task"}
      </Typography>
      <Stack spacing={2} mt={2}>
        <TextField
          label="Title*"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={!!formik.errors.title}
          helperText={formik.errors.title}
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <TextField
          type="date"
          label="Due Date*"
          name="dueDate"
          InputLabelProps={{ shrink: true }}
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          error={!!formik.errors.dueDate}
          helperText={formik.errors.dueDate}
        />
        <TextField
          select
          label="Priority*"
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          fullWidth>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>

        <TextField
          select
          label="Status*"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          fullWidth>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>

        <Autocomplete
          multiple
          freeSolo
          options={[]} // empty array, since users define tags freely
          value={formik.values.tags || []}
          onChange={(_, value) => formik.setFieldValue("tags", value)}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Type and press Enter"
            />
          )}
        />

        <Button type="submit" variant="contained">
          {existingTask ? "Update" : "Create"}
        </Button>
      </Stack>
    </Box>
  );
}
