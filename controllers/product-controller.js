import asyncHandler from "../middleware/async-handler.js";
import Product from "../models/product.js";

const getAll = asyncHandler(async (_, res) => {
  const products = await Product.find({});
  res.json({ products });
});
const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error(`Project with id ${id} not found`);
  }
  res.json(product);
});
const create = asyncHandler(async (req, res) => {
  const fields = req.body;
  const newProduct = await Product.create({
    name: fields.name || "Sample Name",
    description: fields.description || "Sample Description",
    price: fields.price || 0,
    user: req.user._id,
    image: fields.image || "/images/sample.jpg",
    brand: fields.brand || "Sample brand",
    category: fields.category || "Sample Category",
    countInStock: fields.countInStock || 0,
  });

  res.json(newProduct);
});
const update = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.countInStock = countInStock || product.countInStock;

  await product.save();
  res.json(product);
});
const $delete = asyncHandler(async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.deleteOne({ _id: product._id });
  res.end();
});
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }
  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.end();
});
const reviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product.reviews);
});
const getTop = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getAll,
  getById,
  create,
  update,
  $delete,
  getTop,
  createReview,
  reviews,
};
