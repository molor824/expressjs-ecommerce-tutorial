import Product from "../models/product.js";

export async function getAll(_, res) {
  const products = await Product.find({});
  res.json(products);
}
export async function get(req, res) {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    throw new Error("Product not found");
  }
}
export async function add(req, res) {
  const fields = req.body;
  const newProduct = await Product.create(fields);

  res.json(newProduct._id);
}
export async function update(req, res) {
  const updateFields = req.body;
  await Product.updateOne({ _id: req.params.id }, { $set: updateFields });

  res.json("OK");
}
export async function $delete(req, res) {
  await Product.deleteOne({ _id: req.params.id });

  res.json("OK");
}
