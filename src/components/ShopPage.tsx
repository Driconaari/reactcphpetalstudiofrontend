import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface Bouquet {
    id: number;
    name: string;
    price: number;
}

const ShopPage: React.FC = () => {
    const [bouquets, setBouquets] = useState<Bouquet[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchBouquets = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/bouquets');
                if (!response.ok) {
                    throw new Error('Failed to fetch bouquets');
                }
                const data = await response.json();
                setBouquets(data);
            } catch (error) {
                console.error('Error fetching bouquets:', error);
            }
        };

        fetchBouquets();
    }, []);

    return (
        <div>
            <h2>Shop</h2>
            {bouquets.map((bouquet) => (
                <div key={bouquet.id}>
                    <h3>{bouquet.name}</h3>
                    <p>Price: ${bouquet.price}</p>
                    <button onClick={() => addToCart(bouquet)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ShopPage;

