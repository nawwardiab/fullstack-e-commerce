import createError from "http-errors";
import Cart from "../models/Cart.js";

// Get cart details
export const getCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        
        const cart = await Cart.findById(cartId)
            .populate('items.product');  // Changed from 'items.record' to match your schema
        
        if (!cart) {
            throw createError(404, "Cart not found");
        }

        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// Add product to cart
export const addToCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findByIdAndUpdate(
            cartId,
            { 
                $push: { 
                    items: {
                        product: productId,
                        quantity: quantity || 1
                    }
                } 
            },
            { new: true }
        ).populate('items.product');

        if (!cart) {
            throw createError(404, "Cart not found");
        }

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// Update quantity in cart
export const updateQuantityInCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const cart = await Cart.findOneAndUpdate(
            { 
                _id: cartId,
                'items.product': productId 
            },
            { 
                $set: { 
                    'items.$.quantity': quantity 
                } 
            },
            { new: true }
        ).populate('items.product');

        if (!cart) {
            throw createError(404, "Cart or product not found");
        }

        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            data: cart
        });
    } catch (error) {
        next(error);
    }
};

// Remove product from cart
export const removeCartItem = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { productId } = req.body;

        const cart = await Cart.findByIdAndUpdate(
            cartId,
            { 
                $pull: { 
                    items: { 
                        product: productId 
                    } 
                } 
            },
            { new: true }
        ).populate('items.product');

        if (!cart) {
            throw createError(404, "Cart not found");
        }

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            data: cart
        });
    } catch (error) {
        next(error);
    }
}; 