import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import ProductRoutes from "./routes/product-routes.js";
import cors from "cors";

dotenv.config();
connectDB();
const port = process.env.PORT;
if (!port) {
  throw new Error("No port");
}
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/products", ProductRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () =>
  console.log(`Server listening at port http://localhost:${port}`)
);
