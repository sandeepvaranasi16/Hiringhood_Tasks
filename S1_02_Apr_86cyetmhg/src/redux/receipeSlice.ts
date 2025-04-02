import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: JSON.parse(localStorage.getItem("recipes") || "[]"),
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe(state, action: PayloadAction<Recipe>) {
      state.recipes.push(action.payload);
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    },
    editRecipe(state, action: PayloadAction<Recipe>) {
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
        localStorage.setItem("recipes", JSON.stringify(state.recipes));
      }
    },
    deleteRecipe(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    },
  },
});
export const { addRecipe, editRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
