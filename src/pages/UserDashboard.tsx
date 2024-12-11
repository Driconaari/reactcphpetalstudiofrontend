import { useEffect, useState } from 'react';

interface UserProfile {
    username: string;
    email: string;
    createdAt: string;
}

const UserDashboard = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setProfile(data))
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    return (
        <div className="container">
            <h1>Welcome</h1>
            <div className="section bg-white shadow-md rounded">
                <h2>Your Account Information</h2>
                <p><strong>Username:</strong> {profile?.username || 'N/A'}</p>
                <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
                <p><strong>Account Created:</strong> {profile ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</p>
                <a href="/logout" className="bg-dark-pink">Logout</a>
            </div>

            <div className="section grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded">
                    <h2>Browse Bouquets</h2>
                    <p>Explore our beautiful selection of bouquets.</p>
                    <a href="/bouquets/list" className="bg-light-pink">View Bouquets</a>
                </div>
                <div className="bg-white shadow-md rounded">
                    <h2>Your Cart</h2>
                    <p>View and manage items in your cart.</p>
                    <a href="/cart" className="bg-medium-pink">Go to Cart</a>
                </div>
                <div className="bg-white shadow-md rounded">
                    <h2>Go to Shop</h2>
                    <p>Visit our main shop page to see all products.</p>
                    <a href="/shop" className="bg-dark-pink">Go to Shop</a>
                </div>
            </div>

            <div className="section bg-white shadow-md rounded">
                <h2>Account Management</h2>
                <a href="/account/edit.html" className="bg-medium-pink">Edit Profile</a>
                <a href="/account/change-password" className="bg-dark-pink">Change Password</a>
            </div>

            <footer className="text-center mt-4">
                &copy; 2024 CPH Petal Studio. <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
            </footer>
        </div>
    );
};

export default UserDashboard;