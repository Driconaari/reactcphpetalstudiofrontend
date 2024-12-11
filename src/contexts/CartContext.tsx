import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Bouquet {
    id: number;
    name: string;
    price: number;
}

interface CartContextType {
    cart: CartItem[];
    cartCount: number;
    addToCart: (item: Bouquet) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    updateCartCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (item: Bouquet) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateCartCount = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/cart/count', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart count');
            }
            const data = await response.json();
            setCartCount(data.count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    useEffect(() => {
        updateCartCount();
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

