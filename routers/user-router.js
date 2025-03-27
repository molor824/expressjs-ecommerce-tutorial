import express from "express";
import * as UserController from "../controllers/user-controller.js";
import authenticate from "../middleware/authenticate.js";
import checkAdmin from "../middleware/check-admin.js";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/auth", UserController.login);
router
  .route("/profile")
  .get(authenticate, UserController.info)
  .put(authenticate, UserController.updateInfo)
  .delete(authenticate, UserController.logout);
router.route("/").get(authenticate, checkAdmin, UserController.allUsers);
router
  .route("/:id")
  .get(authenticate, checkAdmin, UserController.getUser)
  .put(authenticate, checkAdmin, UserController.updateUser);
router.post("/logout", authenticate, checkAdmin, UserController.deleteUser);

export default router;
