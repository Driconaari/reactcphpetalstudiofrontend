import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';

interface Order {
    id: number;
    date: string;
    total: number;
    status: string;
    items: {
        id: number;
        name: string;
        quantity: number;
        price: number;
    }[];
}

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Mock data - replace with actual API call in production
        const mockOrders: Order[] = [
            {
                id: 1,
                date: '2023-05-15',
                total: 89.99,
                status: 'Delivered',
                items: [
                    { id: 1, name: 'Red Rose Bouquet', quantity: 1, price: 49.99 },
                    { id: 2, name: 'Sunflower Arrangement', quantity: 1, price: 39.99 }
                ]
            },
            {
                id: 2,
                date: '2023-06-02',
                total: 69.99,
                status: 'Processing',
                items: [
                    { id: 3, name: 'Mixed Tulip Bouquet', quantity: 1, price: 69.99 }
                ]
            }
        ];
        setOrders(mockOrders);
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="mb-4">Order History</h1>
                {orders.map(order => (
                    <div key={order.id} className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Order #{order.id}</h5>
                            <span className={`badge bg-${order.status === 'Delivered' ? 'success' : 'warning'}`}>
                {order.status}
              </span>
                        </div>
                        <div className="card-body">
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                            <h6>Items:</h6>
                            <ul className="list-group">
                                {order.items.map(item => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>{item.name} (x{item.quantity})</span>
                                        <span>${item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default OrderHistoryPage;

