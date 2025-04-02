import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import { ReactComponent as Empty } from "../assets/Detective-check-footprint 1.svg";
import { Edit, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";

const HomePage = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderedContacts, setOrderedContacts] = useState(contacts);

  useEffect(() => {
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedContacts = filteredContacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setOrderedContacts(sortedContacts);
  }, [contacts, searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container
      sx={{
        display: "flex",
        width: { md: "50%", xs: "100%" },
        flexDirection: "column",
        gap: 2,
      }}>
      <Typography variant="h4" gutterBottom align="center" margin={2}>
        Contacts
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}>
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add-edit">
          + Add Contact
        </Button>
      </Stack>
      {orderedContacts.length === 0 ? (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}>
          <Empty />
          <Typography variant="body1">No contacts found.</Typography>
        </Container>
      ) : (
        <List
          sx={{
            display: "flex",
            fontSize: "20px",
            flexDirection: "column",
            gap: 2,
          }}>
          {orderedContacts.map((contact) => (
            <ListItem
              style={{
                cursor: "pointer",
                backgroundColor: "#f5f5ff",
                borderRadius: "8px",
              }}

              key={contact.id}
              component={Link}
              to={`/contact/${contact.id}`}>
              <ListItemText
                primary={contact.name}
                secondary={`${contact.phone} - ${contact.email}`}
                
                sx={{ display: "flex", justifyContent: "space-between" }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default HomePage;
