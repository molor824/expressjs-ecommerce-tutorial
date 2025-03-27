import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyOrders,
  getOrder,
  getUserOrders,
  updateOrder,
} from "../controllers/order-controller.js";
import authenticate from "../middleware/authenticate.js";
import checkAdmin from "../middleware/check-admin.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, checkAdmin, getAllOrders);
router.get("/user/:id", authenticate, checkAdmin, getUserOrders);
router.get("/mine", authenticate, getMyOrders);
router.get("/:id", authenticate, getOrder);
router.put("/:id", authenticate, updateOrder);
router.delete("/:id", authenticate, deleteOrder);

export default router;
