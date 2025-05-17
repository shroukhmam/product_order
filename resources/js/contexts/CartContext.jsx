import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // ✅ نحاول نقرأ من localStorage أولًا عند أول تحميل
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    // ✅ كل مرة cart تتغير، نخزنها في localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };
    const incrementQuantity = (product) => {
        const exists = cart.find(item => item.id === product.id);

        if (exists) {
            setCart(prev =>
                prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            const confirmed = window.confirm(`${product.name} is not in the cart. Add it?`);
            if (confirmed) {
                setCart(prev => [...prev, { ...product, quantity: 1 }]);
            }
        }
    };



    const decrementQuantity = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };


    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, qty) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: qty } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart,incrementQuantity,decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
