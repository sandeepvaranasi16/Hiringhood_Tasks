import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <Box maxWidth={400} mx="auto" mt={6}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>

      {error && (
        <Typography color="error" align="center" mb={2}>
          {error}
        </Typography>
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setError("");
            const user = await login(values);

            if (user) {
              navigate("/");
            } else {
              setError("Invalid user role");
            }
          } catch (err: any) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed");
          } finally {
            setSubmitting(false);
          }
        }}>
        {({ isSubmitting, errors, touched, handleChange, values }) => (
          <Form>
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography variant="body2" align="center" mt={2}>
              Don't have an account?
              <Button color="primary" onClick={() => navigate("/register")}>
                Register
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
