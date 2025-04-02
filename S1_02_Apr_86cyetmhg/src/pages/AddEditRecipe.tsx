import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRecipe, editRecipe } from "../redux/receipeSlice";
import { useRecipes } from "../hooks/useRecipes";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const RecipeSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  image: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  ingredients: Yup.array()
    .of(Yup.string().required("Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  instructions: Yup.string().required("Instructions are required"),
});

const AddEditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipes = useRecipes();
  const existingRecipe = recipes.find((r) => r.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        title: existingRecipe?.title || "",
        image: existingRecipe?.image || "",
        ingredients: existingRecipe?.ingredients || [""],
        instructions: existingRecipe?.instructions || "",
      }}
      validationSchema={RecipeSchema}
      onSubmit={(values) => {
        if (existingRecipe) {
          dispatch(editRecipe({ id: existingRecipe.id, ...values }));
          toast.success("Recipe updated successfully!");
        } else {
          dispatch(addRecipe({ id: uuidv4(), ...values }));
          toast.success("Recipe added successfully!");
        }
        navigate("/");
      }}>
      {({ values, errors, touched }) => (
        <Form>
          <Box
            sx={{
              bgcolor: "grey.900",
              color: "white",
              borderRadius: "8px",
              m: 4,
              p: 4,
              display: "flex",
              flexDirection: "column",
            }}
            gap={3}>
            <Button
              variant="contained"
              size="small"
              sx={{ width: 3 }}
              color="primary"
              onClick={() => navigate("/")}>
              Back
            </Button>
            <Typography variant="h4" mb={3} align="center">
              {existingRecipe ? "Edit Recipe" : "Add Recipe"}
            </Typography>
            <Field
              as={TextField}
              fullWidth
              name="title"
              label="Title"
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
            />
            <Field
              as={TextField}
              fullWidth
              name="image"
              label="Image URL"
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
            />
            <Typography variant="h6" mt={2}>
              Ingredients:
            </Typography>
            <FieldArray
              name="ingredients"
              render={(arrayHelpers) => (
                <div>
                  {values.ingredients.map((_, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", flexDirection: "row" }}>
                      <Field
                        as={TextField}
                        name={`ingredients.${index}`}
                        fullWidth
                        style={{ marginBottom: "8px" }}
                      />
                      <Button
                        type="button"
                        color="error"
                        sx={{ ml: 1, height: "50px" }}
                        onClick={() => arrayHelpers.remove(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    type="button"
                    color="primary"
                    onClick={() => arrayHelpers.push("")}>
                    Add Ingredient
                  </Button>
                </div>
              )}
            />
            <Field
              as={TextField}
              fullWidth
              name="instructions"
              label="Instructions"
              multiline
              rows={4}
              error={touched.instructions && Boolean(errors.instructions)}
              helperText={touched.instructions && errors.instructions}
            />
            <Button type="submit" variant="contained" color="primary">
              {existingRecipe ? "Update" : "Add"} Recipe
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddEditRecipe;
