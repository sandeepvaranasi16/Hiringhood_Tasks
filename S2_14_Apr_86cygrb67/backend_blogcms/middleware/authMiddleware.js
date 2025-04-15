import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Optional: also export your authorizeAdmin function here
export const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "Admin") {
    console.log(req.user);
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
