import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
  }
});

export default mongoose.model("User", userSchema);
