import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar.tsx';
import { useCart } from '../contexts/CartContext';

interface WishlistItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

const WishlistPage: React.FC = () => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        // Mock data - replace with actual API call in production
        const mockWishlistItems: WishlistItem[] = [
            { id: 1, name: 'Elegant Rose Bouquet', price: 59.99, imageUrl: '/placeholder.svg?height=200&width=200' },
            { id: 2, name: 'Spring Tulip Arrangement', price: 49.99, imageUrl: '/placeholder.svg?height=200&width=200' },
            { id: 3, name: 'Exotic Orchid Collection', price: 79.99, imageUrl: '/placeholder.svg?height=200&width=200' },
        ];
        setWishlistItems(mockWishlistItems);
    }, []);

    const handleAddToCart = (item: WishlistItem) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
        });
    };

    const handleRemoveFromWishlist = (id: number) => {
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4">Your Wishlist</h1>
                {wishlistItems.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <div className="row">
                        {wishlistItems.map(item => (
                            <div key={item.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={item.imageUrl} className="card-img-top" alt={item.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">${item.price.toFixed(2)}</p>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleRemoveFromWishlist(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default WishlistPage;

