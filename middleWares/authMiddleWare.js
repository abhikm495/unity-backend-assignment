import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.send(
      `${error.message} Please sign in by providing valid Authorization token in header `
    );
  }
};

export const isBuyer = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user.role !== 0) {
      return res.send(
        "Unauthorized Access,Only buyers have access to list of sellers,sign in as buyer"
      );
    }
    next();
  } catch (error) {
    return res.send(error.message);
  }
};

export const isSeller = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user.role !== 1) {
      return res.send(
        "Unauthorized Access,Only Sellers can create catalogs of products"
      );
    }
    next();
  } catch (error) {
    return res.send(error.message);
  }
};
