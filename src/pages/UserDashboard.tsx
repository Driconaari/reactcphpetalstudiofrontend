import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

interface UserProfile {
    username: string;
    email: string;
    createdAt: string;
}

interface Order {
    id: number;
    date: string;
    total: number;
    status: string;
}

const UserDashboard: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        const fetchRecentOrders = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/user/recent-orders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch recent orders');
                }
                const data = await response.json();
                setRecentOrders(data);
            } catch (error) {
                console.error('Error fetching recent orders:', error);
            }
        };

        fetchProfile();
        fetchRecentOrders();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Welcome, {profile?.username}</h1>

            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Your Account Information</h2>
                            <p><strong>Username:</strong> {profile?.username || 'N/A'}</p>
                            <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
                            <p><strong>Account Created:</strong> {profile ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
                            <Link to="/edit-profile" className="btn btn-secondary">Edit Profile</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Recent Orders</h2>
                            {recentOrders.length > 0 ? (
                                <ul className="list-group">
                                    {recentOrders.map(order => (
                                        <li key={order.id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Order #{order.id}</strong> - {new Date(order.date).toLocaleDateString()}
                                            </div>
                                            <div>
                        <span className={`badge bg-${order.status === 'Delivered' ? 'success' : 'warning'} me-2`}>
                          {order.status}
                        </span>
                                                ${order.total.toFixed(2)}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recent orders found.</p>
                            )}
                            <Link to="/order-history" className="btn btn-secondary mt-3">View All Orders</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Browse Bouquets</h3>
                            <p className="card-text">Explore our beautiful selection of bouquets.</p>
                            <Link to="/shop" className="btn btn-primary">View Bouquets</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Your Cart</h3>
                            <p className="card-text">View and manage items in your cart.</p>
                            <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Wishlist</h3>
                            <p className="card-text">View and manage your wishlist items.</p>
                            <Link to="/wishlist" className="btn btn-primary">View Wishlist</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <LogoutButton />
            </div>
        </div>
    );
};

export default UserDashboard;

