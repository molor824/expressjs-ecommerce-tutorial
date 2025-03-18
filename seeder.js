import Order from "./models/order.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

async function importData() {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const insertedUsers = await User.insertMany(users);
    const adminUser = insertedUsers.find((user) => user.isAdmin)._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    let orders = await Order.deleteMany();
    let users = await User.deleteMany();
    let products = await Product.deleteMany();

    console.log("Following datas deleted");
    console.log(orders);
    console.log(users);
    console.log(products);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
