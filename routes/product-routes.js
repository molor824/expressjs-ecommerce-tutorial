import express from "express";
import Product from "../models/product.js";
import asyncHandler from "../middleware/async-handler.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (_, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
