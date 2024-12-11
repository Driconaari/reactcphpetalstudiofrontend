import React from 'react';

// Assume Bouquet type is defined
interface Bouquet {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
}

interface ShopPageProps {
    bouquets: Bouquet[]; // Array of bouquet objects
    loading: boolean;    // Loading state
}

const ShopPage: React.FC<ShopPageProps> = ({ bouquets, loading }) => {
    // Render bouquets
    const renderBouquets = () => {
        if (bouquets.length === 0) {
            return <p>No bouquets available at the moment.</p>;
        }

        return bouquets.map((bouquet) => (
            <div className="col-md-4" key={bouquet.id}>
                <div className="card">
                    <img src={bouquet.imageUrl} alt={bouquet.name} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{bouquet.name}</h5>
                        <p className="card-text">{bouquet.description}</p>
                        <p className="card-text">${bouquet.price.toFixed(2)}</p>
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="container">
            {loading ? (
                <p>Loading bouquets...</p>
            ) : (
                <div className="row">
                    {renderBouquets()}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
