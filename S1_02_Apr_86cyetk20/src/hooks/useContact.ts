import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useContact = (id: string) => {
  return useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );
};
