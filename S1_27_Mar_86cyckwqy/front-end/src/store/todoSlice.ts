import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import { Todo } from "../types/todo.types";

interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filter: string;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: "",
  filter: "All",
};

export const fetchTodos = createAsyncThunk("/fetchTodos", async () => {
  const response = await api.get("/");
  return response.data;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = String(action.payload);
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.items.find((item) => item._id === id);
      if (todo) {
        todo.title = title;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      });
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  setSearchQuery,
  setFilter,
} = todoSlice.actions;
export default todoSlice.reducer;
