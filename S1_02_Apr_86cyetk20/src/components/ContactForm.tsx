import { Formik, Form, Field } from "formik";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import * as Yup from "yup";
import { Link } from "react-router-dom";

type ContactFormProps = {
  initialValues: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  onSubmit: (values: any) => void;
};

const ContactForm = ({ initialValues, onSubmit }: ContactFormProps) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        height: "100vh",
      }}>
        <Button variant="contained" component={Link} to="/" sx={{ alignSelf: "flex-start" }}>Back to Contacts</Button>
      <Typography variant="h4" align="center" gutterBottom>
        {initialValues.name ? "Edit Contact" : "Add Contact"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          phone: Yup.string()
            .matches(/^\d+$/, "Phone number must contain only digits")
            .min(10, "Phone number must be at least 10 digits")
            .required("Phone is required"),
          email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
          address: Yup.string().required("Address is required"),
        })}
        onSubmit={(values) => onSubmit(values)}>
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Box mb={2}>
              <Field
                as={TextField}
                label="Name"
                name="name"
                fullWidth
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                label="Phone Number"
                name="phone"
                fullWidth
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                label="Email"
                name="email"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                label="Address"
                name="address"
                fullWidth
                multiline
                rows={3}
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Contact
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ContactForm;
