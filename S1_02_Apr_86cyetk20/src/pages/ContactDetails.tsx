import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteContact } from "../store/contactSlice";
import { useContact } from "../hooks/useContact";
import { ReactComponent as DeleteIcon } from "../assets/trash-svgrepo-com 1 (2).svg";
import { ReactComponent as EditIcon } from "../assets/Vector (6).svg";

import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Stack,
} from "@mui/material";

const ContactDetails = () => {
  const { id } = useParams();
  const contact = useContact(id || "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!contact) return <Typography variant="h6">Contact not found!</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Contacts
      </Button>

      <Card sx={{ mt: 4, bgcolor: "#f5f5ff", borderRadius: "8px" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}>
          <Typography variant="h3">{contact.name}</Typography>
          <Typography variant="h4">📞 {contact.phone}</Typography>
          <Typography variant="h5">✉️ {contact.email}</Typography>
          <Typography variant="h5">📍 {contact.address}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
            }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/add-edit/${contact.id}`)}>
              <EditIcon style={{ marginRight: "8px" }} /> Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(deleteContact(contact.id));
                navigate("/");
              }}>
              <DeleteIcon style={{ marginRight: "8px" }} /> Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactDetails;
