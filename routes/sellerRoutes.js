import express from "express";
import {
  createCatalog,
  createProduct,
  getOrdersReceivedBySeller,
} from "../controllers/sellerController.js";
import { isSeller, requireSignIn } from "../middleWares/authMiddleWare.js";

const sellerRoutes = express.Router();

sellerRoutes.post("/create-catalog", requireSignIn, isSeller, createCatalog);

sellerRoutes.post("/add-product", requireSignIn, isSeller, createProduct);

sellerRoutes.get("/orders", requireSignIn, isSeller, getOrdersReceivedBySeller);

export default sellerRoutes;
