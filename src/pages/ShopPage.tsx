import { fetchBouquets } from '../services/api';
import {useEffect, useState} from "react";  // Assuming the API function exists

const ShopPage = () => {
    const [bouquets, setBouquets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBouquets = async () => {
            try {
                const data = await fetchBouquets();
                setBouquets(data);
            } catch (error) {
                console.error('Error fetching bouquets:', error);
            } finally {
                setLoading(false);
            }
        };

        getBouquets();
    }, []);

    return (
        <div className="container">
            {loading ? (
                <p>Loading bouquets...</p>
            ) : (
                <div className="row">
                    {bouquets.map((bouquet) => (
                        <div className="col-md-4" key={bouquet.id}>
                            <div className="card">
                                <img src={bouquet.imageUrl} alt={bouquet.name} />
                                <div className="card-body">
                                    <h5>{bouquet.name}</h5>
                                    <p>{bouquet.description}</p>
                                    <p>${bouquet.price}</p>
                                    <button>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
