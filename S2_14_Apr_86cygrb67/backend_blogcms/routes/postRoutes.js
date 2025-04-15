import { Router } from "express"; // Corrected import statement

const router = Router();
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

router.route("/").get(authenticate, getPosts).post(authenticate, createPost);

router
  .route("/:id")
  .get(authenticate, getPostById)
  .put(authenticate, updatePost)
  .delete(authenticate, deletePost);

export default router;
