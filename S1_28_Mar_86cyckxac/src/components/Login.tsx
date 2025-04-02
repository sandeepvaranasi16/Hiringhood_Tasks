import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getUser, verifyPassword } from "../utils/indexedDB";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

const Login = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setError("");
          const existingUser = await getUser(values.email);

          if (!existingUser) {
            setError("User not found");
            return;
          }

          const isValid = await verifyPassword(
            values.password,
            existingUser.password
          );
          if (!isValid) {
            setError("Invalid credentials");
            return;
          }

          login(values.email);
          navigate("/");
        }}>
        {({ errors, touched }) => (
          <Form>
            <Field
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              margin="normal"
            />
            {errors.email && touched.email && <div>{errors.email}</div>}

            <Field
              name="password"
              type="password"
              as={TextField}
              label="Password"
              fullWidth
              margin="normal"
            />
            {errors.password && touched.password && (
              <div>{errors.password}</div>
            )}

            {error && <Typography color="error">{error}</Typography>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}>
              Login
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
