import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  role: Yup.string()
    .oneOf(["jobseeker", "employer"])
    .required("Role is required"),
});

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          role: "jobseeker",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Cast role safely
            const castRole = values.role as "jobseeker" | "employer";
            const success = await register({ ...values, role: castRole });

            if (success) {
              navigate("/");
            }
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}>
        {({ isSubmitting, errors, touched, handleChange, values }) => (
          <Form>
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              margin="normal"
              value={values.fullName}
              onChange={handleChange}
              error={touched.fullName && !!errors.fullName}
              helperText={touched.fullName && errors.fullName}
            />

            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={values.email}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={values.password}
              onChange={handleChange}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />

            <TextField
              select
              name="role"
              label="Role"
              fullWidth
              margin="normal"
              value={values.role}
              onChange={handleChange}
              error={touched.role && !!errors.role}
              helperText={touched.role && errors.role}>
              <MenuItem value="jobseeker">Job Seeker</MenuItem>
              <MenuItem value="employer">Employer</MenuItem>
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "Register"}
            </Button>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Already have an account?{" "}
              <Button
                color="primary"
                
                onClick={() => navigate("/login")}>
                Login here
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
