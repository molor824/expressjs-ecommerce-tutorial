import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const port = process.env.PORT;
if (!port) {
    throw new Error("No port");
}
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/api/products", (req, res) => {
    res.json(products);
});
app.get("/api/products/:productId", (req, res) => {
    const { productId } = req.params;
    const product = products.find((p) => p.id === parseInt(productId));
    if (!product) {
        res.sendStatus(404);
    } else {
        res.json(product);
    }
});

app.listen(port, () => console.log(`Server listening at port http://localhost:${port}`));
