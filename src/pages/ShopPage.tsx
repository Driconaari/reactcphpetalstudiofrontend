import  { useEffect, useState } from 'react';

interface Product {
    id: number;
    featured: boolean;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
}

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <a className="navbar-brand" href="#">CPH Petal Studio</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                    <li className="nav-item"><a className="nav-link" href="/logout">Logout</a></li>
                    <li className="nav-item"><a className="nav-link" href="/cart">Cart (<span className="cart-count">0</span>)</a></li>
                </ul>
            </div>
        </div>
    </nav>
);

const Sidebar = () => (
    <div className="col-lg-3">
        <div className="filter-section">
            <h2>Filter Bouquets</h2>
            <div className="filter-buttons">
                <a href="/shop?maxPrice=50" className="filter-button">Under $50</a>
                <a href="/shop?minPrice=50" className="filter-button">Over $50</a>
            </div>
            <h2>Color Scheme</h2>
            <div className="filter-buttons">
                <a href="/shop?category=pink-red" className="filter-button">Pink/Red Nuances</a>
                <a href="/shop?category=multicolor" className="filter-button">Multicolored</a>
            </div>
        </div>
    </div>
);

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/bouquets')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching bouquets:', error));
    }, []);

    return (
        <div className="col-lg-9">
            <div className="row" id="bouquet-list">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card product-card position-relative">
                            {product.featured && <span className="most-popular">Most Popular</span>}
                            <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text text-success">${product.price.toFixed(2)}</p>
                                <button className="btn btn-primary add-to-cart" data-id={product.id}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="text-center mt-4">
        &copy; 2024 CPH Petal Studio. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
    </footer>
);

const Shop = () => (
    <>
        <Navbar />
        <div className="container mt-5">
            <div className="row">
                <Sidebar />
                <ProductList />
            </div>
        </div>
        <Footer />
    </>
);

export default Shop;