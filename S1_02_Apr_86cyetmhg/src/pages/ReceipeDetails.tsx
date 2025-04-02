import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../redux/receipeSlice";
import { useRecipes } from "../hooks/useRecipes";
import { Box, Typography, Button, Stack } from "@mui/material";
import { toast } from "react-toastify";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipes = useRecipes();
  const recipe = recipes.find((r) => r.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!recipe) {
    return <Typography variant="h6">Recipe not found!</Typography>;
  }

  return (
    <Box
      p={3}
      sx={{ bgcolor: "grey.900", color: "white", m: 4, borderRadius: "8px" }}>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Back
      </Button>
      <Typography variant="h4" align="center" m={2}>
        {recipe.title}
      </Typography>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <Stack sx={{ ml: 3 }}>
        <Typography variant="h6" mt={2}>
          Ingredients:
        </Typography>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <Typography variant="h6">Instructions:</Typography>
        <Typography>{recipe.instructions}</Typography>
        <Stack direction="row" spacing={2} mt={2} justifyContent={"center"}>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate(`/edit/${recipe.id}`)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              dispatch(deleteRecipe(recipe.id));
              toast.success("Recipe deleted successfully!");
              navigate("/");
            }}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default RecipeDetails;
