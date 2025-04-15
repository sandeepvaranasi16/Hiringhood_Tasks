import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../../services/authApi";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const { confirmPassword, ...registerData } = values;
    try {
      const res = await registerUser(registerData).unwrap();
      toast.success("Registered successfully!");
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Paper sx={{ padding: 4, mt: 8, width: 600 }}>
        <Typography variant="h4" gutterBottom>
          Register as Editor
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ values, handleChange, touched, errors }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Button type="submit" variant="contained">
                  Register
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
