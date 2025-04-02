import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactDetails from "./pages/ContactDetails";
import AddEditContact from "./pages/AddEditContact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact/:id" element={<ContactDetails />} />
      <Route path="/add-edit" element={<AddEditContact />} />
      <Route path="/add-edit/:id" element={<AddEditContact />} />
    </Routes>
  );
};

export default App;
