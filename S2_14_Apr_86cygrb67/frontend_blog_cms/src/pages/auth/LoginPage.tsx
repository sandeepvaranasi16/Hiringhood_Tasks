import { useLoginMutation } from "../../services/authApi";
import { setCredentials } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: "Admin" | "Editor";
  };
}

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = (await login(values).unwrap()) as LoginResponse;

        const { token, user } = res;
        const { _id, name, email, role } = user;

        // Store token
        localStorage.setItem("token", token);

        // Save to Redux
        dispatch(
          setCredentials({
            token,
            user: {
              id: _id,
              name,
              email,
              role,
            },
          })
        );

        // Redirect based on role
        navigate(role === "Admin" ? "/" : "/dashboard");
      } catch (err: any) {
        setError(err?.data?.message || "Login failed");
      }
    },
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Paper sx={{ p: 3, width: "100%" }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Button sx={{ mt: 2 }} onClick={() => navigate("/register")}>
            Create an account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
