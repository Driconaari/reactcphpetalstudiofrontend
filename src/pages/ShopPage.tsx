import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        fetchBouquets();
        updateCartCount();
    }, []);

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

    const updateCartCount = async () => {
        try {
            const response = await fetch('http://localhost:8080/shop/cart/count', {
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

    const handleAddToCart = async (bouquetId: number) => {
        try {
            const response = await fetch('http://localhost:8080/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                },
                body: JSON.stringify({
                    bouquetId: bouquetId,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }

            await response.json();
            alert('Item added to cart successfully!');
            updateCartCount();
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart');
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">CPH Petal Studio</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart (<span className="cart-count">{cartCount}</span>)</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row">
                    {/* Sidebar for Filters */}
                    <div className="col-lg-3">
                        <div className="filter-section">
                            <h2>Filter Bouquets</h2>
                            <div className="filter-buttons">
                                <Link to="/shop?maxPrice=50" className="filter-button">Under $50</Link>
                                <Link to="/shop?minPrice=50" className="filter-button">Over $50</Link>
                            </div>
                            <h2>Color Scheme</h2>
                            <div className="filter-buttons">
                                <Link to="/shop?category=pink-red" className="filter-button">Pink/Red Nuances</Link>
                                <Link to="/shop?category=multicolor" className="filter-button">Multicolored</Link>
                            </div>
                        </div>
                    </div>

                    {/* Product Listing */}
                    <div className="col-lg-9">
                        <div className="row" id="bouquet-list">
                            {bouquets.map(bouquet => (
                                <div key={bouquet.id} className="col-md-4 mb-4">
                                    <div className="card product-card position-relative">
                                        {bouquet.featured && <span className="most-popular">Most Popular</span>}
                                        <img src={bouquet.imageUrl} className="card-img-top" alt={bouquet.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{bouquet.name}</h5>
                                            <p className="card-text">{bouquet.description}</p>
                                            <p className="card-text text-success">${bouquet.price.toFixed(2)}</p>
                                            <button
                                                className="btn btn-primary add-to-cart"
                                                onClick={() => handleAddToCart(bouquet.id)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="text-center mt-4">
                &copy; 2024 CPH Petal Studio. <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link>
            </footer>
        </>
    );
};

export default ShopPage;