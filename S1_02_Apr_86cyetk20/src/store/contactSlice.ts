import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

type ContactsState = {
  contacts: Contact[];
};

const initialState: ContactsState = {
  contacts: JSON.parse(localStorage.getItem("contacts") || "[]"),
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      const existingContact = state.contacts.find(
        (contact) => contact.name === action.payload.name
      );
      if (!existingContact) {
        
        state.contacts.push(action.payload);
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
    },
  },
});

export const { addContact, editContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
