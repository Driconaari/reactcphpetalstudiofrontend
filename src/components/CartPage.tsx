import React from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((sum, item: CartItem) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.map((item: CartItem) => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <p>Total: ${total.toFixed(2)}</p>
            <Link to="/payment">Proceed to Payment</Link>
        </div>
    );
};

export default CartPage;

