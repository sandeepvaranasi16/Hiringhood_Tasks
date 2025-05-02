import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const JobSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  salary: Yup.string().required("Salary is required"),
});

const CreateJob = () => {
  const navigate = useNavigate();

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>
        Post New Job
      </Typography>

      <Formik
        initialValues={{ title: "", description: "", location: "", salary: "" }}
        validationSchema={JobSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.post("/jobs", values);
            navigate("/employer/jobs");
          } catch (err) {
            console.error("Job creation failed", err);
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
              fullWidth
              type="number"
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
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateJob;
