import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { useState } from "react";
  import TaskCard from "../components/TaskCard";
  import { useFilteredTasks } from "../hooks/useFilteredTasks";
  import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
  import { useNavigate } from "react-router-dom";
  
  export default function HomePage() {
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebouncedSearch(search, 100);
    const filteredTasks = useFilteredTasks(status, priority, debouncedSearch);
    const navigate = useNavigate();
  
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Task Manager
        </Typography>
  
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          mb={3}
        >
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth={isMobile}
          />
          <Select
            displayEmpty
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth={isMobile}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
          <Select
            displayEmpty
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth={isMobile}
          >
            <MenuItem value="">All Priority</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <Button variant="contained" onClick={() => navigate("/add")}>
            Add Task
          </Button>
        </Stack>
  
        <Grid container spacing={2}>
          {filteredTasks.map((task) => (
            <Grid key={task.id}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  