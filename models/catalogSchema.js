import mongoose from "mongoose";
import productModel from "./productModel.js";

const catalogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  products: [
    {
      name: { type: String },
      price: { type: Number },
    },
  ],
});

const CatalogModel = mongoose.model("Catalog", catalogSchema);

export default CatalogModel;
