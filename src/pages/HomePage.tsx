import  { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/shop.css';

const HomePage = () => {
    useEffect(() => {
        const token = localStorage.getItem("jwtToken"); // Retrieve token from localStorage
        axios.get("/api/protected-route", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    // Handle expired or invalid token (redirect to login page)
                    window.location.href = "/login";
                } else {
                    console.error("Error:", error);
                }
            });
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="/">CPH Petal Studio</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="hero-section text-center py-5">
                <div className="container">
                    <h1 className="display-4">Welcome to CPH Petal Studio</h1>
                    <p className="lead">Discover the beauty of flowers with our exquisite bouquets and seasonal collections.</p>
                    <a href="/shop" className="btn btn-primary btn-lg">Shop Now</a>
                </div>
            </div>

            <div className="container mt-5">
                <h2 className="text-center mb-4">Our Favorites</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card product-card">
                            <img src="https://interflora.dk/sites/default/files/styles/full/public/2024-10/DEN_SOEDE_OMTANKE_HAND_173.jpg?itok=mwjwXwsK&dpr=2&auto=webp&fit=cover&width=585&height=585&quality=50" className="card-img-top" alt="Sweet Gesture" />
                            <div className="card-body">
                                <h5 className="card-title">Sweet Gesture</h5>
                                <p className="card-text">A bouquet filled with vibrant and delicate flowers.</p>
                                <p className="card-text text-success">$49.99</p>
                                <a href="/products/1" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card product-card">
                            <img src="https://interflora.dk/sites/default/files/styles/full/public/2024-09/DEN_VENLIGE_VINTERVERSION_HAND_v_0.jpg?itok=hqgIZwlU&dpr=2&auto=webp&fit=cover&width=585&height=585&quality=50" className="card-img-top" alt="Pastel Charm" />
                            <div className="card-body">
                                <h5 className="card-title">Pastel Charm</h5>
                                <p className="card-text">Soft pastel flowers to brighten any day.</p>
                                <p className="card-text text-success">$44.99</p>
                                <a href="/products/2" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card product-card">
                            <img src="https://interflora.dk/sites/default/files/styles/full/public/2024-05/580_Den%20betaenksomme_M_H1.jpg?itok=LsVuEk9y&dpr=2&auto=webp&fit=cover&width=585&height=585&quality=50" className="card-img-top" alt="Blush Beauty" />
                            <div className="card-body">
                                <h5 className="card-title">Blush Beauty</h5>
                                <p className="card-text">A blush-toned bouquet with stunning details.</p>
                                <p className="card-text text-success">$39.99</p>
                                <a href="/products/3" className="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="text-center py-4">
                <p>&copy; 2024 CPH Petal Studio. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
            </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
};

export default HomePage;