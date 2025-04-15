import { Router } from "express"; // Corrected import statement

const router = Router();
import { authenticate } from "../middleware/authMiddleware.js";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

router
  .route("/")
  .get(authenticate, getCategories)
  .post(authenticate, createCategory);

router
  .route("/:id")
  .get(authenticate, getCategoryById)
  .put(authenticate, updateCategory)
  .delete(authenticate, deleteCategory);

export default router;
