import { openDB } from "idb";
import bcrypt from "bcryptjs";

const DB_NAME = "UserDB";
const STORE_NAME = "users";
const SALT_ROUNDS = 10; // Strength of password hashing

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "email" });
      }
    },
  });
};

// Function to add a new user with a hashed password
export const addUser = async (user: { email: string; password: string }) => {
  const db = await initDB();

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const newUser = { email: user.email, password: hashedPassword };

  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.add(newUser);
  await tx.done;
};

// Function to get a user by email
export const getUser = async (email: string) => {
  const db = await initDB();
  return db.get(STORE_NAME, email);
};

// Function to verify password during login
export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
