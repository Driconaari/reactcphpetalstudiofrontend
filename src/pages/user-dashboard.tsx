import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface UserProfile {
    username: string;
    email: string;
    createdAt: string;
}

const UserDashboard: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

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

        fetchProfile();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Welcome, {profile?.username}</h1>

            <div className="card mt-4">
                <div className="card-body">
                    <h2 className="card-title">Your Account Information</h2>
                    <p><strong>Username:</strong> {profile?.username || 'N/A'}</p>
                    <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
                    <p><strong>Account Created:</strong> {profile ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Browse Bouquets</h3>
                            <p className="card-text">Explore our beautiful selection of bouquets.</p>
                            <Link to="/shop" className="btn btn-primary">View Bouquets</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Your Cart</h3>
                            <p className="card-text">View and manage items in your cart.</p>
                            <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Order History</h3>
                            <p className="card-text">View your past orders and their status.</p>
                            <Link to="/order-history" className="btn btn-primary">View Orders</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Link to="/logout" className="btn btn-danger">Logout</Link>
            </div>
        </div>
    );
};

export default UserDashboard;

