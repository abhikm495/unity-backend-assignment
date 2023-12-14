import CatalogModel from "../models/catalogSchema.js";
import userModel from "../models/userModel.js";
import OrderModel from "../models/orderModel.js";
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await userModel.find({ role: 1 });
    const listOfSellers = sellers.map((seller) => seller.name);
    res.status(200).json({
      listOfSellers,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getCatalogBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    const catalog = await CatalogModel.findOne({ user: sellerId }).populate(
      "products"
    );

    if (!catalog) {
      return res
        .status(404)
        .json({ error: "Catalog not found for the specified seller ID" });
    }

    const products = catalog.products;

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderedByUserId = req.user.id;

    const orderedToUserId = req.params.sellerId;

    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid or empty products array in the request body" });
    }

    const validUser = await userModel.findById(orderedToUserId);
    if (!validUser) {
      return res.status(404).json({ error: "Seller not found" });
    }
    const catalog = await CatalogModel.findOne({
      user: orderedToUserId,
    }).populate("products");

    if (!catalog) {
      return res.status(404).json({ error: "Seller's catalog not found" });
    }

    const validProducts = products.every((product) =>
      catalog.products.some(
        (catalogProduct) =>
          catalogProduct.name.trim().toLowerCase() ===
          product.name.trim().toLowerCase()
      )
    );

    if (!validProducts) {
      return res.status(400).json({
        error: "some on None of the product names are available in the catalog",
      });
    }

    const order = new OrderModel({
      orderedBy: orderedByUserId,
      orderedTo: orderedToUserId,
      products: products.map((product) => ({ name: product.name })),
    });

    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
