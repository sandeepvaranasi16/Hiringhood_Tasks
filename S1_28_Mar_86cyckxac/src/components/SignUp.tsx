import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addUser, getUser } from "../utils/indexedDB";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

const Signup = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setError("");
          const existingUser = await getUser(values.email);

          if (existingUser) {
            setError("User already exists");
            return;
          }

          await addUser(values);
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
              Sign Up
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/login")}>
                Login
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Signup;
