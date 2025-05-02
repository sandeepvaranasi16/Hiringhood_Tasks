import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  TextareaAutosize,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const JobSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  salary: Yup.string().required("Salary is required"),
});

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setInitialValues(res.data);
    } catch (err) {
      console.error("Failed to load job", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>
        Edit Job
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={JobSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.put(`/jobs/${id}`, values);
            navigate("/employer/jobs");
          } catch (err) {
            console.error("Job update failed", err);
          } finally {
            setSubmitting(false);
          }
        }}>
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form>
            <TextField
              required
              name="title"
              label="Title"
              fullWidth
              margin="normal"
              value={values.title}
              onChange={handleChange}
              error={touched.title && !!errors.title}
              helperText={touched.title && errors.title}
            />

            <TextareaAutosize
              required
              minRows={4}
              placeholder="Enter job description*"
              value={values.description}
              onChange={handleChange}
              name="description"
              style={{
                width: "100%",
                fontSize: "1rem",

                padding: "12px",
                borderRadius: "4px",
                borderColor:
                  touched.description && errors.description ? "red" : "#ccc",
              }}
            />
            {touched.description && errors.description && (
              <Typography color="error" variant="caption">
                {errors.description}
              </Typography>
            )}

            <TextField
              required
              name="location"
              label="Location"
              fullWidth
              margin="normal"
              value={values.location}
              onChange={handleChange}
              error={touched.location && !!errors.location}
              helperText={touched.location && errors.location}
            />

            <TextField
              required
              name="salary"
              label="Salary"
              type="number"
              fullWidth
              margin="normal"
              value={values.salary}
              onChange={handleChange}
              error={touched.salary && !!errors.salary}
              helperText={touched.salary && errors.salary}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditJob;
