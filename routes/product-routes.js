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

router.post("/", asyncHandler(async (req, res) => {
  const fields = req.body;

  const newProduct = await Product.create(fields);

  res.json(newProduct._id);
}));

router.patch("/:id", asyncHandler(async (req, res) => {
  const updateFields = req.body;

  await Product.updateOne({ _id: req.params.id }, { $set: updateFields });

  res.json("OK");
}));

router.delete("/:id", asyncHandler(async (req, res) => {
  await Product.deleteOne({ _id: req.params.id });

  res.json("OK");
}))

export default router;
