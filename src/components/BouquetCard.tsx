import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

interface Bouquet {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    featured: boolean;
}

const BouquetCard: React.FC<{ bouquet: Bouquet }> = ({ bouquet }) => {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            // Simulate API call to backend
            await new Promise(resolve => setTimeout(resolve, 1000));

            addToCart({
                id: bouquet.id,
                name: bouquet.name,
                price: bouquet.price,
                quantity: 1,
            });
            toast.success('Item added to cart successfully!');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error('Failed to add item to cart. Please try again.');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="card product-card position-relative">
            {bouquet.featured && <span className="badge bg-warning position-absolute top-0 end-0 m-2">Featured</span>}
            <img src={bouquet.imageUrl} className="card-img-top" alt={bouquet.name} />
            <div className="card-body">
                <h5 className="card-title">{bouquet.name}</h5>
                <p className="card-text">{bouquet.description}</p>
                <p className="card-text text-success fw-bold">${bouquet.price.toFixed(2)}</p>
                <button
                    className="btn btn-primary w-100"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default BouquetCard;

