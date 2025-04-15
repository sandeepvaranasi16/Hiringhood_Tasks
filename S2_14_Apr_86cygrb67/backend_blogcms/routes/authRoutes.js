
import { Router } from "express"; // Corrected import statement
import { login } from "../controllers/authController.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { generateToken } from "../controllers/authController.js";

const router = Router(); // Create a new Router instance

router.post("/login", login);

// @route   POST /api/auth/register
// @desc    Register new editor
// @access  Public
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Editor", // default
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

export default router;
