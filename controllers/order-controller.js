import asyncHandler from "../middleware/async-handler.js";
import Order from "../models/order.js";

function adminOrOwnOrder(order, user, res) {
  if (order.user.toString() !== user._id.toString() && !user.isAdmin) {
    res.status(401);
    throw new Error("Not allowed to access order");
  }
}
export const createOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const order = new Order();
  Object.assign(order, req.body);
  order.user = user._id;
  order.orderItems = req.body.orderItems.map((item) => ({
    name: item.name,
    qty: item.qty,
    image: item.image,
    price: item.price,
    product: item._id,
  }));
  await order.save();
  res.json(order);
});
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ _id: req.user._id });
  res.json(orders);
});
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  res.json(orders);
});
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  adminOrOwnOrder(order, req.user, res);
  res.json(order);
});
export const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  adminOrOwnOrder(order, req.user, res);
  Object.assign(order, req.body);
  await order.save();
  res.json(order);
});
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.deleteOne({ _id: req.params.id });
  adminOrOwnOrder(order, req.user, res);
  res.json(order);
});
