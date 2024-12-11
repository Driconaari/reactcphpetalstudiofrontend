import { useCart } from '../contexts/CartContext';
import ProtectedRoute from '../components/ProtectedRoute'; // Adjust the path as necessary

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    const handleRemove = (id: number) => {
        removeFromCart(id);
    };

    return (
        <ProtectedRoute>
            <div className="container">
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <p>{item.name} - ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
};

export default CartPage;