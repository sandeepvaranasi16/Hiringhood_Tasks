import Category from "../models/Category.js";
import Post from "../models/Post.js";

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
};

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    console.error("Category create error:", err);
    res.status(400).json({ message: err.message }); // <-- show real reason
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

export const deleteCategory = async (req, res) => {
  const isUsed = await Post.findOne({ category: req.params.id });
  if (isUsed)
    return res.status(400).json({ message: "Cannot delete category in use" });

  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};
