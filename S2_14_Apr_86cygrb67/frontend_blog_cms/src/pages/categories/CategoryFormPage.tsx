import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "../../services/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const CategoryFormPage = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const { data: categoryData, isLoading } = useGetCategoryByIdQuery(id!, {
    skip: !isEditMode,
  });

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await updateCategory({ id, ...values }).unwrap();
        } else {
          const data = { name: values.name }; // only send valid fields
          console.log("Sending category:", data);
          await createCategory(data).unwrap();
          navigate("/categories");
        }
        navigate("/categories");
      } catch (err) {
        console.error("Category save failed", err);
      }
    },
  });

  useEffect(() => {
    if (categoryData) {
      formik.setValues({
        name: categoryData.name,
      });
    }
  }, [categoryData]);

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? "Edit Category" : "Create Category"}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("name")}
        />
        <Box sx={{ m: 2, gap: 2, display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained">
            {isEditMode ? "Update" : "Create"}
          </Button>
          <Button variant="outlined" onClick={() => navigate("/categories")}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CategoryFormPage;
