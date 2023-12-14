import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import catalogModel from "../models/catalogSchema.js";
import OrderModel from "../models/orderModel.js";
export const createCatalog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    console.log(products);

    const existingCatalog = await catalogModel.findOne({ user: userId });

    if (existingCatalog) {
      return res.status(400).json({ error: "User already has a catalog" });
    }

    const newProducts = [];

    for (const productData of products) {
      const { name, price } = productData;

      const newProduct = new productModel({
        name,
        price,
      });

      await newProduct.save();

      newProducts.push(newProduct);
    }

    const newCatalog = new catalogModel({
      user: userId,
      products: newProducts,
    });

    await newCatalog.save();

    res
      .status(201)
      .json({ message: "Catalog created successfully", newCatalog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;

    const userCatalog = await catalogModel.findOne({ user: userId });

    if (!userCatalog) {
      return res.status(404).json({ error: "Seller's catalog not found" });
    }

    const newProducts = [];

    for (const productData of products) {
      const { name, price } = productData;

      const newProduct = new productModel({
        name,
        price,
      });

      await newProduct.save();

      newProducts.push(newProduct);
    }

    userCatalog.products.push(...newProducts);
    await userCatalog.save();

    res.status(201).json({
      message: "Products created and added to the catalog successfully",
      userCatalog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrdersReceivedBySeller = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.find({ orderedTo: userId });

    if (!orders) {
      return res.status(404).json({ message: "No orders received" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
