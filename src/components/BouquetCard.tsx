import { useCart } from '../../contexts/CartContext';

interface Bouquet {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
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
        <div className="card">
            <img src={bouquet.imageUrl} alt={bouquet.name} />
            <div className="card-body">
                <h5>{bouquet.name}</h5>
                <p>{bouquet.description}</p>
                <p>${bouquet.price}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default BouquetCard;