import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} from "../controllers/cartController.js";

const router = express.Router();

router
    .get('/:cartId', getCart)
    .post('/:cartId/add', addToCart)
    .patch('/:cartId/update', updateCartItem)
    .delete('/:cartId/remove', removeFromCart);

export default router;
