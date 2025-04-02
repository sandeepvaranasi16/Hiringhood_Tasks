import { Box, Stack, MenuItem, TextField, Select, Button } from "@mui/material";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import React from "react";
import { ReactComponent as MoonIcon } from "../assets/moon.svg";
import { ReactComponent as SunIcon } from "../assets/sun.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setFilter, setSearchQuery } from "../store/todoSlice";

interface TodoHeaderProps {
  toggleTheme: () => void;
  themeMode: string;
}

const TodoHeader = ({ toggleTheme, themeMode }: TodoHeaderProps) => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.todos.filter);
  const searchQuery = useSelector(
    (state: RootState) => state.todos.searchQuery
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value)); 
  };

  return (
    <Box>
      <h2 style={{ textAlign: "center" }}>TODO LIST</h2>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          padding: "12px",
        }}>
       
        <TextField
          variant="outlined"
          placeholder="Search notes..."
          size="small"
          value={searchQuery} 
          onChange={handleSearchChange}
          sx={{ width: "100%", border: "5px solid primary.main" }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />

        <Select
          size="small"
          value={filter} // ✅ Controlled component
          onChange={(e) => dispatch(setFilter(e.target.value))} // ✅ Dispatch setFilter
          sx={{
            minWidth: 120,
            bgcolor: "primary.main",
            color: "white",
          }}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="COMPLETED">Completed</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
        </Select>

        {/* ✅ Fixed: Theme toggle using props */}
        <Button
          size="large"
          sx={{
            bgcolor: "primary.main",
            color: "primary.light",
            ":hover": { bgcolor: "primary.dark" },
          }}
          onClick={toggleTheme} // ✅ Use prop function
        >
          {themeMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Stack>
    </Box>
  );
};

export default TodoHeader;
