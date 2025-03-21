import express from "express";
import asyncHandler from "../middleware/async-handler.js";
import * as UserController from "../controllers/user-controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", asyncHandler(UserController.register));
router
  .route("/")
  .post(UserController.login)
  .get(authenticate, asyncHandler(UserController.info))
  .delete(authenticate, asyncHandler(UserController.logout));

export default router;
