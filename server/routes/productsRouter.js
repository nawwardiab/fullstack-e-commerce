// Example structure for productsRouter.js
import express from "express";
import {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router
.post("/", checkToken, createProduct)
.get("/", getAllProducts)
.get("/:id", getProduct)
.put("/:id", checkToken, updateProduct)
.delete("/:id", checkToken, deleteProduct);