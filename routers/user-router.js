import express from "express";
import asyncHandler from "../middleware/async-handler.js";
import * as UserController from "../controllers/user-controller.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/login", asyncHandler(UserController.login));
router.post("/register", asyncHandler(UserController.register));
router.get("/", authenticate, asyncHandler(UserController.info));

export default router;
