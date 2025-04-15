import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();
  res.json(user);
};
