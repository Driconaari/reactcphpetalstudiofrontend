import React from 'react';
import { useCart } from '../contexts/CartContext';

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

    const handleAddToCart = () => {
        addToCart({
            id: bouquet.id,
            name: bouquet.name,
            price: bouquet.price,
            quantity: 1,
        });
    };

    return (
        <div className="card product-card position-relative">
            {bouquet.featured && <span className="most-popular">Most Popular</span>}
            <img src={bouquet.imageUrl} className="card-img-top" alt={bouquet.name} />
            <div className="card-body">
                <h5 className="card-title">{bouquet.name}</h5>
                <p className="card-text">{bouquet.description}</p>
                <p className="card-text text-success">${bouquet.price.toFixed(2)}</p>
                <button className="btn btn-primary add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default BouquetCard;

