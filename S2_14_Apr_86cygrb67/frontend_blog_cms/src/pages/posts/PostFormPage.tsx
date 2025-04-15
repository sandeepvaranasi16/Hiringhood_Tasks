import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
} from "../../services/postApi";
import { useGetCategoriesQuery } from "../../services/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const PostFormPage = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const { data: postData, isLoading: postLoading } = useGetPostByIdQuery(id!, {
    skip: !isEditMode,
  });

  type Category = {
    _id: string;
    name: string;
  };

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery({}) as {
      data: Category[];
      isLoading: boolean;
    };

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
      status: "Draft",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      const payload = { ...values };
      try {
        if (isEditMode) {
          await updatePost({ id, ...payload }).unwrap();
        } else {
          console.log("Sending post:", payload);
          await createPost(payload).unwrap();
        }
        navigate("/posts");
      } catch (err) {
        console.error("Post save error:", err);
      }
    },
  });

  useEffect(() => {
    if (postData) {
      formik.setValues({
        title: postData.title || "",
        content: postData.content || "",
        category: postData.category || "",
        status: postData.status || "Draft",
        image: postData.image || "",
      });
    }
  }, [postData]);

  if (postLoading || categoriesLoading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? "Edit Post" : "Create New Post"}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("title")}
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          {...formik.getFieldProps("content")}
          error={formik.touched.content && !!formik.errors.content}
          helperText={formik.touched.content && formik.errors.content}
        />
        <TextField
          label="Category"
          select
          fullWidth
          margin="normal"
          {...formik.getFieldProps("category")}
          error={formik.touched.category && !!formik.errors.category}
          helperText={formik.touched.category && formik.errors.category}>
          <MenuItem value="">Select Category</MenuItem>
          {categories.map((cat: Category) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Status"
          select
          fullWidth
          margin="normal"
          {...formik.getFieldProps("status")}>
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {isEditMode ? "Update" : "Create"}
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          sx={{ mt: 2, ml: 2 }}
          onClick={() => navigate("/posts")}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default PostFormPage;
