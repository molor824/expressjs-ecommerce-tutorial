import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductRouter from "./routers/product-router.js";
import UserRouter from "./routers/user-router.js";
import OrderRouter from "./routers/order-router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error-handler.js";

dotenv.config();
connectDB();
const port = process.env.PORT;
if (!port) {
  throw new Error("No port");
}
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api/products", ProductRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server listening at port http://localhost:${port}`)
);
