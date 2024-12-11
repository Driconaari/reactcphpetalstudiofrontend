import React from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((sum, item: CartItem) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            {cart.map((item: CartItem) => (
                <div key={item.id} className="card mb-3">
                    <div className="card-body">
                        <h3 className="card-title">{item.name}</h3>
                        <p className="card-text">Price: ${item.price}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                </div>
            ))}
            <p className="h4 mt-4">Total: ${total.toFixed(2)}</p>
            <Link to="/payment" className="btn btn-primary mt-3">Proceed to Payment</Link>
        </div>
    );
};

export default CartPage;

