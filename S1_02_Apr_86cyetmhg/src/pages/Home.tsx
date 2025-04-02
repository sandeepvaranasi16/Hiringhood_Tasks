import React, { useState } from "react";
import { useRecipes } from "../hooks/useRecipes";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RestaurantMenu } from "@mui/icons-material";

const Home: React.FC = () => {
  const recipes = useRecipes();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      p={3}
      m={4}
      sx={{ bgcolor: "grey.900", color: "white", borderRadius: "8px", gap: 3 }}>
      <Box>
        <Typography variant="h4" align="center" mb={3}>
          Recipe Book App <RestaurantMenu fontSize="large" />
        </Typography>
        <SearchBar onSearch={setSearch} />
        <Button
          fullWidth
          sx={{ mb: 3 }}
          variant="contained"
          onClick={() => navigate("/add")}
          color="primary">
          +Add Recipe
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
