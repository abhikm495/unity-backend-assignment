import express from "express";
import {
  createOrder,
  getAllSellers,
  getCatalogBySellerId,
} from "../controllers/buyerController.js";
import { isBuyer, requireSignIn } from "../middleWares/authMiddleWare.js";
const buyerRoutes = express.Router();

buyerRoutes.get("/list-of-sellers", requireSignIn, isBuyer, getAllSellers);

buyerRoutes.get(
  "/seller-catalog/:sellerId",
  requireSignIn,
  isBuyer,
  getCatalogBySellerId
);

buyerRoutes.post(
  "/create-order/:sellerId",
  requireSignIn,
  isBuyer,
  createOrder
);
export default buyerRoutes;
