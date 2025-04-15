import { Router } from "express";

const router = Router();
import { authenticate } from "../middleware/authMiddleware.js";
import allowRoles from "../middleware/roleMiddleware.js";
import { getUsers, updateUserRole } from "../controllers/userController.js";

router.use(authenticate);
router.use(allowRoles("Admin"));

router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);

export default router;
