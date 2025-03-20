import express from "express";
import Product from "../models/product.js";
import asyncHandler from "../middleware/async-handler.js";
import * as ProductController from "../controllers/product-controller.js";

const router = express.Router();

router.get("/", asyncHandler(ProductController.getAll));
router.get("/:id", asyncHandler(ProductController.get));
router.post("/", asyncHandler(ProductController.add));
router.patch("/:id", asyncHandler(ProductController.update));
router.delete("/:id", asyncHandler(ProductController.$delete));

export default router;
