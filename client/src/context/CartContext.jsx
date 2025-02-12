import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

  
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, { 
                ...product, 
                quantity: 1, 
                originalPrice: product.originalPrice ?? product.price, 
                price: product.price 
            }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => 
            prevItems.filter(item => item.id !== productId)
        );
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems
            .reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0)
            .toFixed(2);
    };

    const getTotalSavings = () => {
        return cartItems
            .reduce((total, item) => {
                const original = parseFloat(item.originalPrice);
                const discounted = parseFloat(item.price);
                return total + ((original - discounted) * item.quantity);
            }, 0)
            .toFixed(2);
    };

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    const getItemQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getTotalSavings, 
        getCartCount,
        isInCart,
        getItemQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
