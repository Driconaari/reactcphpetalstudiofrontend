import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BouquetCard from '../components/BouquetCard';
import Navbar from '../components/NavBar';
import { useCart } from '../contexts/CartContext';
import { isTokenValid } from '../utils/auth';

interface Bouquet {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    featured: boolean;
}

const ShopPage: React.FC = () => {
    const [bouquets, setBouquets] = useState<Bouquet[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { updateCartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isTokenValid()) {
            console.error('Invalid or expired JWT token. Redirecting to login.');
            navigate('/login');
            return;
        }

        fetchBouquets();
        updateCartCount();
    }, []);

    const fetchBouquets = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/bouquets', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('You need to be logged in to view bouquets.');
                }
                throw new Error('Failed to fetch bouquets. Please try again.');
            }

            const data = await response.json();
            setBouquets(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching bouquets:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        {/* Sidebar for Filters */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h2 className="card-title h5">Filter Bouquets</h2>
                                <div className="d-grid gap-2">
                                    <Link to="/shop?maxPrice=50" className="btn btn-outline-primary">Under $50</Link>
                                    <Link to="/shop?minPrice=50" className="btn btn-outline-primary">Over $50</Link>
                                </div>
                                <h2 className="card-title h5 mt-4">Color Scheme</h2>
                                <div className="d-grid gap-2">
                                    <Link to="/shop?category=pink-red" className="btn btn-outline-primary">Pink/Red Nuances</Link>
                                    <Link to="/shop?category=multicolor" className="btn btn-outline-primary">Multicolored</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        {bouquets.length > 0 ? (
                            <div className="row" id="bouquet-list">
                                {bouquets.map(bouquet => (
                                    <div key={bouquet.id} className="col-md-4 mb-4">
                                        <BouquetCard bouquet={bouquet} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No bouquets available at the moment.</p>
                        )}
                    </div>
                </div>
            </div>
            <footer className="text-center mt-4 py-4 bg-light">
                <div className="container">
                    <p>&copy; 2024 CPH Petal Studio. <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link></p>
                </div>
            </footer>
        </>
    );
};

export default ShopPage;