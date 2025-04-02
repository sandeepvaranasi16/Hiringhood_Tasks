import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../store/contactSlice";
import { useContact } from "../hooks/useContact";
import ContactForm from "../components/ContactForm";

const AddEditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const existingContact = useContact(id || "");

  const handleSubmit = (values: any) => {
    if (id) {
      dispatch(editContact({ ...values, id }));
    } else {
      dispatch(addContact({ ...values, id: Date.now().toString() }));
    }
    navigate("/");
  };

  return (
    <ContactForm
      initialValues={
        existingContact || { name: "", phone: "", email: "", address: "" }
      }
      onSubmit={handleSubmit}
    />
  );
};

export default AddEditContact;
