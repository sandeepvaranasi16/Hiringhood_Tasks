import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    image: string;
    description?: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      sx={{
        cursor: "pointer",
        width: 350,
        
        bgcolor: "grey.900",
        color: "white",
      }}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>
        <Typography variant="body2" color="grey.400">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
